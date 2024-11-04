import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true, //whitelist ignora qualquer outra propriedade que nao esteja no dto
    forbidNonWhitelisted:true, // barra a requisição caso é passado uma propriedade que nao esteja no dto
    transform:true //transforma o dado do parametro vindo da rota, exemplo o id vem como string e ele vai transformar em number 
  })) //validar dados
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
