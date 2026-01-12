import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { PersonalityDto } from './dto/personality.dto';
import { PersonalitiesService } from './personalities.service';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('api/personalities')
@Controller('api/personalities')
export class PersonalitiesController {
  constructor(private readonly service: PersonalitiesService) {}

  @Get()
  async findAll(): Promise<PersonalityDto[]> {
    return this.service.findAll();
  }

  @Get(':id')
  async findById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<PersonalityDto> {
    return this.service.findById(id);
  }
  @Get(':pubkey')
  async findByPubkey(
    @Param('pubkey', ParseIntPipe) id: number,
  ): Promise<PersonalityDto> {
    return this.service.findByPubkey(id);
  }
}
