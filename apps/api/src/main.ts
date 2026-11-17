import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ProblemDetailsFilter } from './common/errors/problem-details.filter';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  // Toutes les routes commencent par /api/v1 (voir docs/technical/api-conventions.md).
  app.setGlobalPrefix('api/v1');
  app.useGlobalFilters(new ProblemDetailsFilter());

  // Documentation OpenAPI : http://localhost:3001/api/docs
  const config = new DocumentBuilder()
    .setTitle('API de la plateforme associative')
    .setVersion('0.1.0')
    .build();
  SwaggerModule.setup('api/docs', app, SwaggerModule.createDocument(app, config));

  await app.listen(Number(process.env.API_PORT ?? 3001));
}

void bootstrap();
