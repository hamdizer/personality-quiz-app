import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Matches } from 'class-validator';
import { BaseDto } from 'src/common/dto/base.dto';

export class PersonalityDto extends BaseDto {
  @ApiProperty()
  @AutoMap()
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty()
  @AutoMap()
  @IsString()
  @IsNotEmpty()
  description: string;
  @ApiProperty()
  @AutoMap()
  @IsString()
  @Matches(/^#[0-9A-F]{6}$/i, { message: 'Color must be a valid hex code' })
  color: string;
}
