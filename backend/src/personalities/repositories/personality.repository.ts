import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PersonalityEntity } from '../entities/personality.entity';

@Injectable()
export class PersonalityRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<PersonalityEntity[]> {
    return this.prisma.personality.findMany({
      orderBy: { id: 'asc' },
    });
  }

  async findById(id: number): Promise<PersonalityEntity | null> {
    return this.prisma.personality.findUnique({
      where: { id },
    });
  }
  async findByPubkey(pubkey: string): Promise<PersonalityEntity | null> {
    return this.prisma.personality.findUnique({
      where: { pubkey },
    });
  }
  async findByName(name: string): Promise<PersonalityEntity | null> {
    return this.prisma.personality.findUnique({
      where: { name },
    });
  }
}
