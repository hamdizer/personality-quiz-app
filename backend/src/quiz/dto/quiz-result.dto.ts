import { AutoMap } from '@automapper/classes';
import { BaseDto } from 'src/common/dto/base.dto';
import { PersonalityDto } from '../../personalities/dto/personality.dto';
import { ApiProperty } from '@nestjs/swagger';

export class PersonalityScoreDto extends BaseDto {
  @AutoMap(() => PersonalityDto)
  @ApiProperty({ type: () => PersonalityDto })
  personality: PersonalityDto;

  @AutoMap()
  @ApiProperty({
    type: Number,
    description: 'Total score for this personality',
  })
  score: number;

  @AutoMap()
  @ApiProperty({ type: Number, description: 'Percentage score (0-100)' })
  percentage: number;
}

export class QuizResultDto {
  @AutoMap(() => PersonalityDto)
  @ApiProperty({
    type: () => PersonalityDto,
    description: 'Top matching personality type',
  })
  personality: PersonalityDto;

  @AutoMap(() => [PersonalityScoreDto])
  @ApiProperty({
    type: [PersonalityScoreDto],
    description: 'Score breakdown for all personality types',
    isArray: true,
  })
  scores: PersonalityScoreDto[];
}
