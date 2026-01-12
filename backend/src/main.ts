import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsConfig } from './common/config/cors.config';
import * as bodyParser from 'body-parser';
import { SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { SwaggerConfig } from './common/config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(app.get(CorsConfig).getCorsOptions());
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  const configService = app.get<ConfigService>(ConfigService);
  if (configService.get('NODE_ENV') === 'development') {
    const swaggerConfig = app.get(SwaggerConfig).getSwaggerOptions();
    const document = SwaggerModule.createDocument(app, swaggerConfig);

    SwaggerModule.setup('api', app, document);
  }

  app.enableShutdownHooks();
  await app.listen(+configService.get('BACKEND_PORT'));
}
bootstrap();
