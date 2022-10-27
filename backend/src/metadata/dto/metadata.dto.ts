import { ApiProperty } from '@nestjs/swagger';
import { Metadata } from '@prisma/client';

export class MetadataDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  value: string | null;

  @ApiProperty()
  applicationId: string;

  @ApiProperty()
  createdAt: Date | null;

  @ApiProperty()
  updatedAt: Date | null;

  constructor(partial: Partial<Metadata>) {
    Object.assign(this, partial);
  }
}
