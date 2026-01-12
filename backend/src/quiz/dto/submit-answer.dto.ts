import { AutoMap } from '@automapper/classes';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  ValidateNested,
  ArrayMinSize,
  IsString,
  IsUUID,
} from 'class-validator';
import { BaseDto } from 'src/common/dto/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';

export class AnswerDto extends BaseDto {
  @AutoMap()
  @ApiProperty({
    type: Number,
    description: 'ID of the question being answered',
  })
  @IsString()
  @IsUUID()
  questionId: string;

  @AutoMap()
  @ApiProperty({
    type: String,
    description: 'ID of the selected option/answer',
  })
  @IsString()
  @IsUUID()
  optionId: string;
}

export class SubmitAnswersDto {
  @AutoMap(() => [AnswerDto])
  @ApiProperty({
    type: [AnswerDto],
    description:
      'Array of user answers for all quiz questions. Must contain at least one answer.',
    isArray: true,
    minItems: 1,
    example: [
      {
        questionId: randomUUID(),
        optionId: randomUUID(),
      },
      {
        questionId: randomUUID(),
        optionId: randomUUID(),
      },
      {
        questionId: randomUUID(),
        optionId: randomUUID(),
      },
      {
        questionId: randomUUID(),
        optionId: randomUUID(),
      },
      {
        questionId: randomUUID(),
        optionId: randomUUID(),
      },
      {
        questionId: randomUUID(),
        optionId: randomUUID(),
      },
      {
        questionId: randomUUID(),
        optionId: randomUUID(),
      },
      {
        questionId: randomUUID(),
        optionId: randomUUID(),
      },
      {
        questionId: randomUUID(),
        optionId: randomUUID(),
      },
      {
        questionId: randomUUID(),
        optionId: randomUUID(),
      },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  @ArrayMinSize(1)
  answers: AnswerDto[];
}
