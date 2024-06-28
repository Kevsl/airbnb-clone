import {
  BadRequestException,
  ImATeapotException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookingDto, updateBookingDto } from './dto';
import { User } from '@prisma/client';

@Injectable()
export class BookingService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.booking.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 30,
      select: {
        id: true,
        rental: true,
        reservationDate: true,
        quantity: true,
        total: true,
        createdAt: true,
        user: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async createBooking(dto: CreateBookingDto, user: User) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });

    const existingRental = await this.prisma.rental.findUnique({
      where: {
        id: dto.rentalId,
      },
    });

    if (!existingUser || !existingUser.id || !existingRental) {
      throw new BadRequestException('Bad request exception ');
    }

    return this.prisma.booking.create({
      data: { ...dto, userId: user.id },
    });
  }

  async updateBooking(dto: updateBookingDto, user: User, id: string) {
    const existingBooking = await this.prisma.booking.findUnique({
      where: {
        id: id,
      },
    });
    if (!existingBooking || existingBooking.userId !== user.id) {
      throw new ImATeapotException('no');
    }

    return this.prisma.booking.update({
      where: {
        id: id,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteBooking(id: string, user: User) {
    const existingBooking = await this.prisma.booking.findUniqueOrThrow({
      where: {
        id: id,
      },
    });
    if (
      !existingBooking ||
      !existingBooking.id ||
      existingBooking.userId !== user.id
    ) {
      throw new ImATeapotException('No');
    }

    return this.prisma.booking.delete({
      where: {
        id: id,
      },
    });
  }
}
