import { Module } from '@nestjs/common';
import { RentalService } from './rental.service';
import { RentalController } from './rental.controller';
import { RentalGateway } from './rental.gateway';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EmailService } from 'src/email/email.service';

@Module({
  imports: [PrismaModule],
  controllers: [RentalController],
  providers: [RentalService, RentalGateway, EmailService],
})
export class RentalModule {}
