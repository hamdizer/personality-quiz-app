import { AutoMap } from '@automapper/classes';
import { Option } from '@prisma/client';
import { BaseEntity } from 'src/common/entities/base.entity';

export class OptionEntity extends BaseEntity implements Option {
  @AutoMap()
  questionId: number;

  @AutoMap()
  text: string;

  @AutoMap()
  order: number;

  @AutoMap()
  scores: Record<number, number>;

  @AutoMap()
  createdAt: Date;

  @AutoMap()
  updatedAt: Date;
}
