import { Controller } from '@nestjs/common';
import { DependencyService } from './dependency.service';

@Controller('dependency')
export class DependencyController {
  constructor(private readonly dependencyService: DependencyService) {}
}
