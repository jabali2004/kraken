import { ApiProperty } from '@nestjs/swagger';
import { Application } from '@prisma/client';
import { DependencyDTO } from '../../dependency/dto/dependency.dto';
import { MetadataDTO } from '../../metadata/dto/metadata.dto';
import { KeyValuePair } from '../../types/key-value-pair';
import { ApplicationDTO } from './application.dto';

export class MinimalApplicationDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  dependsOn: string[];

  @ApiProperty({
    isArray: true,
    type: KeyValuePair,
  })
  metadata: KeyValuePair[];

  @ApiProperty()
  createdAt: Date | null;

  @ApiProperty()
  updatedAt: Date | null;

  constructor(data: ApplicationDTO) {
    Object.assign(this, data);

    if (data.dependsOn) {
      this.dependsOn = data.dependsOn.map((x) => {
        if (x['application']['name']) {
          return x['application']['name'];
        }
      });
    }

    if (data.metadata) {
      this.metadata = data.metadata.map((x) => {
        return { key: x.name, value: x.value };
      });
    }
  }
}
