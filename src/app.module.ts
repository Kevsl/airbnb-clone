import { Module } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './category/category.module';
import { RentalModule } from './rental/rental.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BookingModule } from './booking/booking.module';

import { EmailModule } from './email/email.module';
import { ImageModule } from './image/image.module';
@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    CategoryModule,
    RentalModule,
    UserModule,
    AuthModule,
    BookingModule,
    EmailModule,
    ImageModule,
  ],
})
export class AppModule {}
