import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApiBearerAuth, DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { readFileSync } from 'fs';
import { join } from 'path';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);


  const config = new DocumentBuilder()
  .setTitle('Cytric')
  .setDescription('The API description')
  .setVersion('1.0')
  .addTag('Cytric')
  .build();
const documentFactory = () => SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, documentFactory);


const customCss = readFileSync(join(__dirname, '../src/css//swagger.css'), 'utf8');


SwaggerModule.setup('docs', app, documentFactory, {
  customCss,
  swaggerOptions: {
    persistAuthorization: true,
  },});


  app.enableCors();
  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT ?? 3005);
}
bootstrap();
