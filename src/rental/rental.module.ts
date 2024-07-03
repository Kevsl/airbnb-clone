import { Module } from '@nestjs/common';
import { RentalService } from './rental.service';
import { RentalController } from './rental.controller';
import { RentalGateway } from './rental.gateway';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [RentalController],
  providers: [RentalService, RentalGateway],
})
export class RentalModule {}
