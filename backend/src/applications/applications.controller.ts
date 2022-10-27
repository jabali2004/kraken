import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Application } from '@prisma/client';
import { classToPlain, instanceToPlain, plainToClass } from 'class-transformer';
import { ApplicationsService } from './applications.service';
import { ApplicationDTO } from './dto/application.dto';
import { CreateApplicationDTO } from './dto/create-application.dto';
import { UpdateApplicationDTO } from './dto/update-application.dto';

@ApiTags('applications')
@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @ApiOkResponse({ type: ApplicationDTO })
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  public async create(
    @Body() createApplicationDto: CreateApplicationDTO,
  ): Promise<any> {
    const application = await this.applicationsService.create(
      createApplicationDto,
    );

    return new ApplicationDTO(application);
  }

  @ApiOkResponse({ type: ApplicationDTO, isArray: true })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  public async findAll(): Promise<Application[]> {
    const applications = await this.applicationsService.findAll();
    return applications.map((x) => new ApplicationDTO(x));
  }

  @ApiOkResponse({ type: ApplicationDTO })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<ApplicationDTO> {
    const application = await this.applicationsService.findOne(id);
    return new ApplicationDTO(application);
  }

  @ApiOkResponse({ type: ApplicationDTO })
  @UseInterceptors(ClassSerializerInterceptor)
  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() updateApplicationDto: UpdateApplicationDTO,
  ): Promise<ApplicationDTO> {
    const application = await this.applicationsService.update(
      id,
      updateApplicationDto,
    );
    return new ApplicationDTO(application);
  }

  @ApiOkResponse({ type: ApplicationDTO })
  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':id')
  public async remove(@Param('id') id: string): Promise<ApplicationDTO> {
    const removedApplication = await this.applicationsService.remove(id);
    return new ApplicationDTO(removedApplication);
  }
}
