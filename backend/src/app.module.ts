import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './services/prisma/prisma.service';
import { HealthController } from './controllers/health/health.controller';
import { TerminusModule } from '@nestjs/terminus';
import { PrismaHealthIndicator } from './indicators/health.indicator';
@Module({
  imports: [TerminusModule],
  controllers: [AppController, HealthController],
  providers: [AppService, PrismaService, PrismaHealthIndicator],
})
export class AppModule {}
