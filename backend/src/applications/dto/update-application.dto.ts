import { PartialType } from '@nestjs/swagger';
import { CreateApplicationDTO } from './create-application.dto';

export class UpdateApplicationDTO extends PartialType(CreateApplicationDTO) {
  constructor(partial: Partial<UpdateApplicationDTO>) {
    super();
    Object.assign(this, partial);
  }
}
