import { ApiProperty } from '@nestjs/swagger';
import { Application } from '@prisma/client';

export class ApplicationDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  createdAt: Date | null;

  @ApiProperty()
  updatedAt: Date | null;

  constructor(partial: Partial<Application>) {
    Object.assign(this, partial);
  }
}
