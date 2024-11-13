import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common'
import { AdvisorService } from './advisor.service'
import { StudentService } from '../student/student.service'
import type { Advisor } from './advisor.entity'
import type { CreateAdvisorDTO } from './advisor.dto'

@Controller('advisor')
export class AdvisorController {
  constructor(
    private readonly advisorService: AdvisorService,
    private readonly studentService: StudentService,
  ) {}

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

  @Post(':advisorId/students')
  async addStudents(
    @Param('advisorId') advisorId: number,
    @Body() studentIds: number[],
  ): Promise<Advisor> {
    const [advisor, students] = await Promise.all([
      this.advisorService.get(advisorId),
      this.studentService.getAll(studentIds),
    ])
    return await this.advisorService.addStudents(advisor, students)
  }

  @Delete(':advisorId/students')
  async removeStudents(
    @Param('advisorId') advisorId: number,
    @Body() studentIds: number[],
  ): Promise<Advisor> {
    const advisor = await this.advisorService.get(advisorId)
    return await this.advisorService.removeStudents(advisor, studentIds)
  }
}
