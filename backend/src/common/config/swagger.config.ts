import { DocumentBuilder } from '@nestjs/swagger';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SwaggerConfig {
  constructor(private config: ConfigService) {}
  getSwaggerOptions() {
    const options = new DocumentBuilder()
      .setTitle(this.config.get<string>('APP_NAME', 'My App'))
      .setDescription(
        this.config.get<string>('APP_DESCRIPTION', 'My App Description'),
      )
      .setVersion(this.config.get<string>('APP_VERSION', '1.0'))
      .addTag(this.config.get<string>('APP_TAG', 'My App Tag'))
      .addBearerAuth()
      .build();
    return options;
  }
}
