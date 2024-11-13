import { Controller } from '@nestjs/common';
import { AdvisorService } from './advisor.service';

@Controller('advisor')
export class AdvisorController {
  constructor(private readonly advisorService: AdvisorService) {}
}
