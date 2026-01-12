import { AutoMap } from '@automapper/classes';
import { PersonalityEntity } from '../../personalities/entities/personality.entity';
import { BaseEntity } from 'src/common/entities/base.entity';

export class PersonalityScoreEntity extends BaseEntity {
  @AutoMap()
  personality: PersonalityEntity;

  @AutoMap()
  score: number;

  @AutoMap()
  percentage: number;
}

export class QuizResultEntity extends BaseEntity {
  @AutoMap()
  personality: PersonalityEntity;

  @AutoMap(() => [PersonalityScoreEntity])
  scores: PersonalityScoreEntity[];
}
