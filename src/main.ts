// import helmet from 'helmet';
// import { NestFactory } from '@nestjs/core';
// import serverlessExpress from '@codegenie/serverless-express';
// import { Callback, Context, Handler } from 'aws-lambda';
// import { AppModule } from './app.module';

// let server: Handler;

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

//   app.enableCors({
//     origin: (req, callback) => callback(null, true),
//   });

//   app.use(helmet());

//   await app.init();

//   const expressApp = app.getHttpAdapter().getInstance();

//   return serverlessExpress({ app: expressApp });
// }

// export const handler: Handler = async (
//   event: any,
//   context: Context,
//   callback: Callback,
// ) => {
//   server = server ?? (await bootstrap());
//   return server(event, context, callback);
// };

import { NestFactory } from '@nestjs/core';

import helmet from 'helmet';

import { AppModule } from './app.module';

const port = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: (req, callback) => callback(null, true),
  });
  app.use(helmet());

  await app.listen(port);
}
bootstrap().then(() => {
  console.log('App is running on %s port', port);
});
