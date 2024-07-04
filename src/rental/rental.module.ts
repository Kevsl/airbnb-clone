import { Module } from '@nestjs/common';
import { RentalService } from './rental.service';
import { RentalController } from './rental.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EmailService } from 'src/email/email.service';
import { RentalGateway } from './rental.gateway';

@Module({
  imports: [PrismaModule],
  controllers: [RentalController],
  providers: [RentalService, EmailService, RentalGateway],
})
export class RentalModule {}
