import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
  .setTitle('Temperature Monitor Service -  V1')
  .setDescription('API docs')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.APP_URL , 'http://localhost:3000');
    //res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Baggage, Sentry-Trace');
    next();
  });

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.API_PORT ?? 3001);
}
bootstrap();
