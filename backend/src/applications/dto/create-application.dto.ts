import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateApplicationDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  // @ApiProperty()
  // @IsOptional()
  // @IsArray()
  // dependsOn: string[];

  // @ApiProperty()
  // @IsOptional()
  // @IsObject()
  // metadata: { [key: string]: string };

  constructor(partial: Partial<CreateApplicationDTO>) {
    Object.assign(this, partial);
  }
}
