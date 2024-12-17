import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Comprehensive CORS configuration
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  });

  // Socket.IO Adapter with additional configuration
  const httpServer = app.getHttpServer();
  app.useWebSocketAdapter(new IoAdapter(httpServer));

  await app.listen(3000);
  console.log(`Server running on: ${await app.getUrl()}`);
}
bootstrap();