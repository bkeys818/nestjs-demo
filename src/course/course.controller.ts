import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common'
import { CourseService } from './course.service'
import type { Course } from './course.entity'
import type { CreateCourseDTO } from './course.dto'

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  getAll(): Promise<Course[]> {
    return this.courseService.getAll()
  }

  @Get(':id')
  get(@Param('id') id: number): Promise<Course> {
    return this.courseService.get(id)
  }

  @Post()
  create(@Body() body: CreateCourseDTO): Promise<Course> {
    return this.courseService.create(body)
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() body: CreateCourseDTO,
  ): Promise<Course> {
    const course = await this.courseService.get(id)
    return await this.courseService.update(course, body)
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<Course> {
    const course = await this.courseService.get(id)
    return await this.courseService.remove(course)
  }
}
