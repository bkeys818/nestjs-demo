import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Course } from './course.entity'
import { CreateCourseDTO } from './course.dto'

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private repo: Repository<Course>,
  ) {}

  getAll(): Promise<Course[]> {
    return this.repo.find({
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
}
