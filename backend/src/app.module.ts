import { CacheModule, CacheStore, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './services/prisma/prisma.service';
import { HealthController } from './controllers/health/health.controller';
import { TerminusModule } from '@nestjs/terminus';
import { PrismaHealthIndicator } from './controllers/health/health.indicator';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { redisStore } from 'cache-manager-redis-store';
import { ConfigModule } from '@nestjs/config';
import { RedisClientOptions } from 'redis';
import { ApplicationsModule } from './applications/applications.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      cache: true,
    }),
    TerminusModule,
    ThrottlerModule.forRoot({
      ttl: 10,
      limit: 25,
    }),
    CacheModule.register<RedisClientOptions>({
      isGlobal: true,
      store: redisStore as unknown as CacheStore,
      url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    }),
    ApplicationsModule,
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
