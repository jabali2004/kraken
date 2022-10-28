import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { KeyValuePair } from '../../types/key-value-pair';

export class UpdateApplicationDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @Type(() => String)
  dependsOn: string[];

  @ApiProperty({
    isArray: true,
    type: KeyValuePair,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => KeyValuePair)
  metadata: KeyValuePair[];

  constructor(partial: Partial<UpdateApplicationDTO>) {
    Object.assign(this, partial);
  }
}
