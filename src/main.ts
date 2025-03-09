import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import rateLimit from 'express-rate-limit';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Statik fayllar uchun konfiguratsiya
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads',
  });

  app.use(
    rateLimit({
      windowMs: 60 * 1000, // 1 daqiqa
      max: 1000, // 1 daqiqada 10 ta so‘rovdan oshsa, bloklanadi
      message: "Ko‘p so‘rov yubordingiz, iltimos biroz kuting.",
    }),
  );


  // CORS sozlamalari
  app.enableCors({
    origin: ['https://tasvirchi.butcher.uz'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
}
bootstrap();



