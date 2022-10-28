import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateApplicationDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  constructor(partial: Partial<UpdateApplicationDTO>) {
    Object.assign(this, partial);
  }
}
