import { ApiProperty } from '@nestjs/swagger';
import { Dependency } from '@prisma/client';

export class DependencyDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  applicationId: string;

  @ApiProperty()
  dependencyId: string;

  // @ApiProperty()
  // createdAt: Date | null;

  // @ApiProperty()
  // updatedAt: Date | null;

  constructor(partial: Partial<Dependency>) {
    Object.assign(this, partial);
  }
}
