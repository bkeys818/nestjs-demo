import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { Student } from '../student/student.entity'

@Entity()
export class Advisor {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  advisorName: string

  @Column()
  department: string

  @OneToMany(() => Student, (student) => student.advisorId)
  students: Student[]
}
