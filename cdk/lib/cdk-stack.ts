import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Cors, LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import {
  Function as LambdaFunction,
  Runtime,
  Code,
  FunctionProps,
} from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';

export class CartServiceStackKate extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const lambdaFunctionProps: Omit<FunctionProps, 'handler'> = {
      runtime: Runtime.NODEJS_20_X,
      code: Code.fromAsset(path.join(__dirname + '/../../dist')),
      environment: {},
    };

    const cartServiceHandler = new LambdaFunction(
      this,
      'CartServiceHandlerKate',
      {
        handler: 'main.handler',
        ...lambdaFunctionProps,
      },
    );

    const api = new RestApi(this, 'CartServiceKate', {
      restApiName: 'CartServiceKate',
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS,
        allowMethods: Cors.ALL_METHODS,
      },
    });

    const apiResource = api.root.addProxy({
      defaultIntegration: new LambdaIntegration(cartServiceHandler),
    });
  }
}
