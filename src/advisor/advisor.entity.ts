import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Advisor {
  @PrimaryGeneratedColumn()
  id: number
}
