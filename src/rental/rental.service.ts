import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { InsertRentalDto } from './dto/insert.rental.dto';
import { UpdateRentalDto } from './dto/update.rental.dto';
import { User } from '@prisma/client';
import { RentalGateway } from './rental.gateway';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class RentalService {
  constructor(
    private prisma: PrismaService,
    private rentalGateway: RentalGateway,
    private emailService: EmailService,
  ) {}

  async getAllRentals() {
    return this.prisma.rental.findMany({
      orderBy: {
        name: 'desc',
      },
      select: {
        name: true,
        description: true,
        price: true,
      },
    });
  }

  async createRental(dto: InsertRentalDto, user: User) {
    const newRental = await this.prisma.rental.create({
      data: {
        name: dto.name,
        description: dto.description,
        adress: dto.adress,
        userId: user.id,
        price: dto.price,
        categoryId: dto.categoryId,
      },
    });

    await this.emailService.sendUserListingHasBeenCreated(user, newRental);
    return newRental;
  }
  async updateRental(id: string, dto: UpdateRentalDto) {
    const existingRental = await this.prisma.rental.findUnique({
      where: {
        id: id,
      },
    });

    if (!existingRental || !existingRental) {
      throw new ForbiddenException('Unexisting id');
    }
    const updatedRental = await this.prisma.rental.update({
      where: {
        id: id,
      },
      data: {
        ...dto,
      },
    });
    const rentals = await this.getAllRentals();
    this.rentalGateway.server.emit('newRental', rentals);
    return updatedRental;
  }

  async deleteRental(id: string) {
    const existingRental = await this.prisma.rental.findUnique({
      where: {
        id: id,
      },
    });
    if (!existingRental || !existingRental.id) {
      throw new ForbiddenException("Id doesn't exist");
    } else {
      await this.prisma.rental.delete({
        where: {
          id: id,
        },
      });
      const rentals = await this.getAllRentals();
      this.rentalGateway.server.emit('newRental', rentals);
      return 'deleted';
    }
  }
}
