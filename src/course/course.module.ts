import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CourseService } from './course.service'
import { CourseController } from './course.controller'
import { Course } from './course.entity'
import { StudentModule } from '../student/student.module'

@Module({
  imports: [TypeOrmModule.forFeature([Course]), StudentModule],
  controllers: [CourseController],
  providers: [CourseService],
  exports: [CourseService],
})
export class CourseModule {}
