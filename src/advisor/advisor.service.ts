import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Advisor } from './advisor.entity'
import { CreateAdvisorDTO } from './advisor.dto'
import type { Student } from '../student/student.entity'

@Injectable()
export class AdvisorService {
  constructor(
    @InjectRepository(Advisor)
    private repo: Repository<Advisor>,
  ) {}

  getAll(): Promise<Advisor[]> {
    return this.repo.find({
      relations: { students: true },
    })
  }

  async get(id: number): Promise<Advisor> {
    const advisor = await this.repo.findOne({
      where: { id },
      relations: { students: true },
    })
    if (advisor == null)
      throw new HttpException(
        `No advisor with id ${id} exist.`,
        HttpStatus.NOT_FOUND,
      )
    return advisor
  }

  async create(data: CreateAdvisorDTO) {
    const newAdvisor = this.repo.create(data)
    return await this.repo.save(newAdvisor)
  }

  async update(advisor: Advisor, updateData: CreateAdvisorDTO) {
    const updatedAdvisor = this.repo.merge(advisor, updateData)
    return await this.repo.save(updatedAdvisor)
  }

  async remove(advisor: Advisor) {
    return await this.repo.remove(advisor)
  }

  async addStudents(advisor: Advisor, students: Student[]) {
    advisor.students.push(...students)
    return await this.repo.save(advisor)
  }

  async removeStudents(advisor: Advisor, studentIds: number[]) {
    advisor.students = advisor.students.filter(
      (student) => !studentIds.includes(student.id),
    )
    return await this.repo.save(advisor)
  }
}
