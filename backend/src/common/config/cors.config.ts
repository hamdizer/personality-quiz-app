import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CorsConfig {
  constructor(private config: ConfigService) {}
  getCorsOptions() {
    return {
      origin: this.config.get<string>('CORS_ORIGIN', '*'),
      methods: this.config.get<string>('CORS_METHODS', '*'),
      allowedHeaders: this.config.get<string>('CORS_ALLOWED_HEADERS', '*'),
      exposedHeaders: [
        'Content-Disposition',
        'Content-Type',
        'Content-Length',
        'ETag',
        'Last-Modified',
      ],
    };
  }
}
