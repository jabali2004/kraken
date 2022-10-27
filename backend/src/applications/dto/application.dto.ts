import { ApiProperty } from '@nestjs/swagger';
import { Application } from '@prisma/client';
import { DependencyDTO } from '../../dependency/dto/dependency.dto';
import { MetadataDTO } from '../../metadata/dto/metadata.dto';

export class ApplicationDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  metadata: MetadataDTO[];

  @ApiProperty()
  dependsOn: DependencyDTO[];

  @ApiProperty()
  createdAt: Date | null;

  @ApiProperty()
  updatedAt: Date | null;

  constructor(partial: Partial<Application>) {
    Object.assign(this, partial);
  }
}
