import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { StudentService } from './student.service'
import { StudentController } from './student.controller'
import { Student } from './student.entity'
import { CourseModule } from '../course/course.module'

@Module({
  imports: [TypeOrmModule.forFeature([Student]), CourseModule],
  controllers: [StudentController],
  providers: [StudentService],
  exports: [StudentService],
})
export class StudentModule {}
