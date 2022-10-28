import { HttpException, Injectable } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Application, Dependency, Metadata } from '@prisma/client';
import { PrismaService } from '../services/prisma/prisma.service';
import { FindAllQueryParams } from '../types/find-all-query-params';
import { CreateApplicationDTO } from './dto/create-application.dto';
import { UpdateApplicationDTO } from './dto/update-application.dto';

@ApiTags('applications')
@Injectable()
export class ApplicationsService {
  constructor(private prisma: PrismaService) {}

  public async create(
    newApplication: CreateApplicationDTO,
  ): Promise<Application> {
    try {
      const dependencies = await this.prisma.application.findMany({
        select: { id: true },
        where: {
          name: {
            in: newApplication.dependsOn,
          },
        },
      });

      return await this.prisma.application.create({
        data: {
          ...newApplication,
          createdAt: new Date(),
          updatedAt: new Date(),
          metadata: {
            createMany: {
              data: newApplication.metadata
                ? newApplication.metadata.map((x) => {
                    return {
                      name: x.key,
                      value: x.value,
                      createdAt: new Date(),
                      updatedAt: new Date(),
                    };
                  })
                : undefined,
              skipDuplicates: true,
            },
          },
          dependsOn: {
            createMany: {
              data: dependencies
                ? dependencies.map((x) => {
                    return {
                      dependencyId: x.id,
                    };
                  })
                : undefined,
              skipDuplicates: true,
            },
          },
        },
      });
    } catch (error) {
      throw new HttpException('Forbidden', 403);
      // TODO: Add error handling for name already exists
    }
  }

  public async findAll(query?: FindAllQueryParams): Promise<Application[]> {
    try {
      return await this.prisma.application.findMany({
        include: {
          metadata: true,
          dependsOn: true,
        },
        orderBy: { updatedAt: 'desc' },
        take: query?.limit ? parseInt(query.limit, 10) : undefined,
        skip: query?.skip ? parseInt(query.skip, 10) : undefined,
      });
    } catch (error) {
      throw new HttpException('Forbidden', 403);
    }
  }

  public async findOne(id: string): Promise<Application> {
    try {
      return await this.prisma.application.findUniqueOrThrow({
        where: {
          id,
        },
        include: {
          metadata: true,
          dependsOn: true,
        },
      });
    } catch (error) {
      throw new HttpException('Forbidden', 403);
    }
  }

  public async update(
    id: string,
    updatedApplication: UpdateApplicationDTO,
  ): Promise<Application> {
    try {
      return await this.prisma.application.update({
        where: { id },
        data: { ...updatedApplication, updatedAt: new Date() },
      });
    } catch (error) {
      throw new HttpException('Forbidden', 403);
      // TODO: Add error handling for name already exists
    }
  }

  public async remove(id: string): Promise<Application> {
    try {
      return await this.prisma.application.delete({ where: { id } });
    } catch (error) {
      throw new HttpException('Forbidden', 403);
    }
  }
}
