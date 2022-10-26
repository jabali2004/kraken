import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './services/prisma/prisma.service';
import { HealthController } from './controllers/health/health.controller';
import { TerminusModule } from '@nestjs/terminus';
import { PrismaHealthIndicator } from './indicators/health.indicator';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
@Module({
  imports: [
    TerminusModule,
    ThrottlerModule.forRoot({
      ttl: 10,
      limit: 25,
    }),
  ],
  controllers: [AppController, HealthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    AppService,
    PrismaService,
    PrismaHealthIndicator,
  ],
})
export class AppModule {}
