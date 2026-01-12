import { AutoMap } from '@automapper/classes';
import { OptionEntity } from './option.entity';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Question } from '@prisma/client';

export class QuestionEntity extends BaseEntity implements Question {
  @AutoMap()
  text: string;

  @AutoMap()
  weight: number;

  @AutoMap()
  order: number;

  @AutoMap(() => [OptionEntity])
  options: OptionEntity[];

  @AutoMap()
  createdAt: Date;

  @AutoMap()
  updatedAt: Date;
}
