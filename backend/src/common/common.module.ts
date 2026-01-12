import { Global, Module } from '@nestjs/common';

import { ExceptionMessages } from './exception/exception.messages';
import { SwaggerConfig } from './config/swagger.config';
import { CorsConfig } from './config/cors.config';

@Global()
@Module({
  imports: [],
  providers: [CorsConfig, SwaggerConfig, ExceptionMessages],
  exports: [CorsConfig, SwaggerConfig, ExceptionMessages],
  controllers: [],
})
export class CommonModule {}
