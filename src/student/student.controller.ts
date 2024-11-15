import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common'
import { StudentService } from './student.service'
import { CourseService } from '../course/course.service'
import type { Student } from './student.entity'
import type { CreateStudentDTO } from './student.dto'

@Controller('student')
export class StudentController {
  constructor(
    private readonly studentService: StudentService,
    private readonly courseService: CourseService,
  ) {}

  @Get()
  getAll(): Promise<Student[]> {
    return this.studentService.getAll()
  }

  @Get(':id')
  get(@Param('id') id: number): Promise<Student> {
    return this.studentService.get(id)
  }

  @Post()
  create(@Body() body: CreateStudentDTO): Promise<Student> {
    return this.studentService.create(body)
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() body: CreateStudentDTO,
  ): Promise<Student> {
    const student = await this.studentService.get(id)
    return await this.studentService.update(student, body)
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<Student> {
    const student = await this.studentService.get(id)
    return await this.studentService.remove(student)
  }

  @Post(':studentId/courses')
  async addCourses(
    @Param('studentId') studentId: number,
    @Body() courseIds: number[],
  ): Promise<Student> {
    const [student, courses] = await Promise.all([
      this.studentService.get(studentId),
      this.courseService.getAll(courseIds),
    ])
    return await this.studentService.addCourses(student, courses)
  }

  @Delete(':studentId/courses')
  async removeCourses(
    @Param('studentId') studentId: number,
    @Body() courseIds: number[],
  ): Promise<Student> {
    const student = await this.studentService.get(studentId)
    return await this.studentService.removeCourses(student, courseIds)
  }
}
