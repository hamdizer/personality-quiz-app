import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsObject } from 'class-validator';
import { BaseDto } from 'src/common/dto/base.dto';

export class OptionDto extends BaseDto {
  @AutoMap()
  @ApiProperty({
    type: Number,
    description: 'ID of the question this option belongs to',
    example: 1,
  })
  @IsNumber()
  questionId: number;

  @AutoMap()
  @ApiProperty({
    type: String,
    description: 'Text content of the answer option',
    example: 'Reading books or learning something new',
    minLength: 1,
  })
  @IsString()
  @IsNotEmpty()
  text: string;

  @AutoMap()
  @ApiProperty({
    type: Number,
    description: 'Display order of the option (1-based)',
    example: 1,
    minimum: 1,
  })
  @IsNumber()
  order: number;

  @AutoMap()
  @ApiProperty({
    type: 'object',
    description:
      'Score mapping for each personality type (personalityId: points)',
    example: { 1: 5, 2: 1, 3: 2, 4: 3 },
    additionalProperties: {
      type: 'number',
    },
  })
  @IsObject()
  scores: Record<number, number>;
}
