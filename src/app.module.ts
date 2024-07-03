import { Module } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './category/category.module';
import { RentalModule } from './rental/rental.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BookingModule } from './booking/booking.module';
import { ImageModule } from './image/image.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { EmailModule } from './email/email.module';
@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    CategoryModule,
    RentalModule,
    UserModule,
    AuthModule,
    BookingModule,
    ImageModule,
    EmailModule,
  ],
})
export class AppModule {}
