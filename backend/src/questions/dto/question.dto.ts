import { AutoMap } from '@automapper/classes';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  Max,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { OptionDto } from './option.dto';
import { BaseDto } from 'src/common/dto/base.dto';
import { ApiProperty } from '@nestjs/swagger';

export class QuestionDto extends BaseDto {
  @AutoMap()
  @ApiProperty({
    type: String,
    description: 'The question text presented to the user',
    example: 'How do you prefer to spend your weekend?',
    minLength: 1,
  })
  @IsString()
  @IsNotEmpty()
  text: string;

  @AutoMap()
  @ApiProperty({
    type: Number,
    description:
      'Weight/importance of this question in final scoring (1-5). Higher weight means more impact on results.',
    example: 5,
    minimum: 1,
    maximum: 5,
  })
  @IsNumber()
  @Min(1)
  @Max(5)
  weight: number;

  @AutoMap()
  @ApiProperty({
    type: Number,
    description: 'Display order of the question in the quiz (1-based indexing)',
    example: 1,
    minimum: 1,
  })
  @IsNumber()
  order: number;

  @AutoMap(() => [OptionDto])
  @ApiProperty({
    type: [OptionDto],
    description: 'Available answer options for this question',
    isArray: true,
    example: [
      {
        id: 1,
        questionId: 1,
        text: 'Reading books or learning something new',
        order: 1,
        scores: { 1: 5, 2: 1, 3: 2, 4: 3 },
      },
      {
        id: 2,
        questionId: 1,
        text: 'Exploring new places or trying new activities',
        order: 2,
        scores: { 1: 1, 2: 5, 3: 1, 4: 3 },
      },
    ],
  })
  @ValidateNested({ each: true })
  @Type(() => OptionDto)
  options: OptionDto[];
}
