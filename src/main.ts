import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // main.ts에서 AppModule을 생성해줌
  // 그럼 AppModule에 등록된 컨트롤러랑 서비스를 가져옴
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
