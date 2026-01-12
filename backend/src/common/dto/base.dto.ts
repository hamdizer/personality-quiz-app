import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class BaseDto {
  @ApiProperty()
  @AutoMap()
  pubkey: string;
}
