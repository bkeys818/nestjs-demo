import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AdvisorService } from './advisor.service'
import { AdvisorController } from './advisor.controller'
import { Advisor } from './advisor.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Advisor])],
  controllers: [AdvisorController],
  providers: [AdvisorService],
})
export class AdvisorModule {}
