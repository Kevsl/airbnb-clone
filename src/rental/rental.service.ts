import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { InsertRentalDto } from './rental/insert.rental.dto';
import { UpdateRentalDto } from './rental/update.rental.dto';
import { User } from '@prisma/client';

@Injectable()
export class RentalService {
  constructor(private prisma: PrismaService) {}

  async getAllRentals() {
    return this.prisma.rental.findMany({
      orderBy: {
        name: 'asc',
      },
      select: {
        name: true,
        description: true,
        price: true,
      },
    });
  }

  async createRental(dto: InsertRentalDto, user: User) {
    console.log(user);
    return this.prisma.rental.create({
      data: {
        name: dto.name,
        description: dto.description,
        adress: dto.adress,
        userId: user.id,
        price: dto.price,
      },
    });
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
    return this.prisma.rental.update({
      where: {
        id: id,
      },
      data: {
        ...dto,
      },
    });
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
      return this.prisma.rental.delete({
        where: {
          id: id,
        },
      });
    }
  }
}
