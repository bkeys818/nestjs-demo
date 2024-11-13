import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common'
import { AdvisorService } from './advisor.service'
import type { Advisor } from './advisor.entity'
import type { CreateAdvisorDTO } from './advisor.dto'

@Controller('advisor')
export class AdvisorController {
  constructor(private readonly advisorService: AdvisorService) {}

  @Get()
  getAll(): Promise<Advisor[]> {
    return this.advisorService.getAll()
  }

  @Get(':id')
  get(@Param('id') id: number): Promise<Advisor> {
    return this.advisorService.get(id)
  }

  @Post()
  create(@Body() body: CreateAdvisorDTO): Promise<Advisor> {
    return this.advisorService.create(body)
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() body: CreateAdvisorDTO,
  ): Promise<Advisor> {
    const advisor = await this.advisorService.get(id)
    return await this.advisorService.update(advisor, body)
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<Advisor> {
    const advisor = await this.advisorService.get(id)
    return await this.advisorService.remove(advisor)
  }
}
