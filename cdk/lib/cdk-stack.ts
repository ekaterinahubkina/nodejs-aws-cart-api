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
import { config } from 'dotenv';

config();

export class CartServiceStackKate extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const POSTGRES_HOST = process.env.POSTGRES_HOST ?? '';
    const POSTGRES_PORT = process.env.POSTGRES_PORT ?? '';
    const POSTGRES_USER = process.env.POSTGRES_USER ?? '';
    const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD ?? '';
    const POSTGRES_DATABASE = process.env.POSTGRES_DATABASE ?? '';

    const lambdaFunctionProps: Omit<FunctionProps, 'handler'> = {
      runtime: Runtime.NODEJS_20_X,
      code: Code.fromAsset(path.join(__dirname + '/../../dist')),
      environment: {
        POSTGRES_HOST,
        POSTGRES_PORT,
        POSTGRES_USER,
        POSTGRES_PASSWORD,
        POSTGRES_DATABASE,
      },
      timeout: cdk.Duration.seconds(10),
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

    api.root.addProxy({
      defaultIntegration: new LambdaIntegration(cartServiceHandler),
    });

    new cdk.CfnOutput(this, 'CartServiceKateUrl', {
      value: api.url,
    });
  }
}
