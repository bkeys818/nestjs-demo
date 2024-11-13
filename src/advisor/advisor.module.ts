import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AdvisorService } from './advisor.service'
import { AdvisorController } from './advisor.controller'
import { Advisor } from './advisor.entity'
import { StudentModule } from 'src/student/student.module'

@Module({
  imports: [TypeOrmModule.forFeature([Advisor]), StudentModule],
  controllers: [AdvisorController],
  providers: [AdvisorService],
})
export class AdvisorModule {}
