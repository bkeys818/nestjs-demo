import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm'
import { Student } from '../student/student.entity'

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  courseName: string

  @ManyToMany(() => Student, (student) => student.courses)
  students: Student[]
}
