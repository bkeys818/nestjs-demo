import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CourseModule } from './course/course.module'
import { StudentModule } from './student/student.module'
import { AdvisorModule } from './advisor/advisor.module'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'wZYwaR!xfYRzT2n2HC',
      database: 'college',
      entities: [],
      // synchronize: true,
      autoLoadEntities: true,
    }),
    CourseModule,
    StudentModule,
    AdvisorModule,
    AdvisorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
