import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Student } from './student.entity'
import { CreateStudentDTO } from './student.dto'

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private repo: Repository<Student>,
  ) {}

  getAll(): Promise<Student[]> {
    return this.repo.find({
      relations: { advisor: true, courses: true },
    })
  }

  async get(id: number): Promise<Student> {
    const student = await this.repo.findOne({
      where: { id },
      relations: { advisor: true, courses: true },
    })
    if (student == null)
      throw new HttpException(
        `No student with id ${id} exist.`,
        HttpStatus.NOT_FOUND,
      )
    return student
  }

  async create(data: CreateStudentDTO) {
    const newStudent = this.repo.create(data)
    return await this.repo.save(newStudent)
  }

  async update(student: Student, updateData: CreateStudentDTO) {
    const updatedStudent = this.repo.merge(student, updateData)
    return await this.repo.save(updatedStudent)
  }

  async remove(student: Student) {
    return await this.repo.remove(student)
  }
}
