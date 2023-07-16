import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception';
import { transformInterceptor } from './common/interceptor/interceptor';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalInterceptors(new transformInterceptor());

    app.enableCors();

    /**
     * 生成swagger文档
     */
    const config = new DocumentBuilder()
        // .addBearerAuth()
        .setTitle('DEMO Nest API')
        .setDescription('第一个nestjs API项目')
        .setVersion('3.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document);

    await app.listen(3000);
}
bootstrap();
