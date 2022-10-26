import { Logger, LogLevel, RequestMethod } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { PrismaService } from './services/prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Startup');
  const logLevel: LogLevel = process.env.LOGGER as LogLevel;

  app.useLogger([logLevel || 'debug']);

  app.setGlobalPrefix('api', {
    exclude: [{ path: 'health', method: RequestMethod.GET }],
  });

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  const config = new DocumentBuilder()
    .setTitle('Kraken')
    .setDescription('Kraken')
    .setVersion('1.0')
    .addServer('/api/')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  app.use(helmet());

  app.enableCors({
    origin: [process.env.FRONTEND_URL || '', process.env.BACKEND_URL || ''],
  });

  logger.log(
    `Enable cors origin for ${process.env.FRONTEND_URL} and ${process.env.BACKEND_URL}`,
  );

  await app.listen(process.env.PORT || 3000);

  logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
