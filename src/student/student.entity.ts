import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm'
import { Advisor } from '../advisor/advisor.entity'
import { Course } from '../course/course.entity'

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  studentName: string

  @Column()
  studentYear: string

  @Column()
  advisorId: number

  @ManyToOne(() => Advisor, (advisor) => advisor.students)
  advisor: Advisor

  @ManyToMany(() => Course, (course) => course.students)
  @JoinTable()
  courses: Course[]
}
