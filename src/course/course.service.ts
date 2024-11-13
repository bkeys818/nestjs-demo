import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, In } from 'typeorm'
import { Course } from './course.entity'
import { CreateCourseDTO } from './course.dto'
import type { Student } from '../student/student.entity'

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private repo: Repository<Course>,
  ) {}

  getAll(ids?: number[]): Promise<Course[]> {
    return this.repo.find({
      where: ids ? { id: In(ids) } : undefined,
      relations: { students: true },
    })
  }

  async get(id: number): Promise<Course> {
    const course = await this.repo.findOne({
      where: { id },
      relations: { students: true },
    })
    if (course == null)
      throw new HttpException(
        `No course with id ${id} exist.`,
        HttpStatus.NOT_FOUND,
      )
    return course
  }

  async create(data: CreateCourseDTO) {
    const newCourse = this.repo.create(data)
    return await this.repo.save(newCourse)
  }

  async update(course: Course, updateData: CreateCourseDTO) {
    const updatedCourse = this.repo.merge(course, updateData)
    return await this.repo.save(updatedCourse)
  }

  async remove(course: Course) {
    return await this.repo.remove(course)
  }

  async addStudents(course: Course, students: Student[]) {
    course.students.push(...students)
    return await this.repo.save(course)
  }

  async removeStudents(course: Course, studentIds: number[]) {
    course.students = course.students.filter(
      (student) => !studentIds.includes(student.id),
    )
    return await this.repo.save(course)
  }
}
