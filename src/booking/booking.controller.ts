import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { JwtGuard } from 'src/auth/guard';
import { CreateBookingDto } from './dto/create.booking.dto';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';
import { updateBookingDto } from './dto';

@UseGuards(JwtGuard)
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get('/all')
  getAllBookings() {
    return this.bookingService.getAll();
  }

  @Post('/new')
  createBooking(@Body() dto: CreateBookingDto, @GetUser() user: User) {
    return this.bookingService.createBooking(dto, user);
  }

  @Patch('/update/:id')
  updateBooking(
    @Body() dto: updateBookingDto,
    @Param('id') id: string,
    @GetUser() user: User,
  ) {
    return this.bookingService.updateBooking(dto, user, id);
  }

  @HttpCode(204)
  @Delete('/delete/:id')
  deleteBooking(@Param(':id') id: string, @GetUser() user: User) {
    return this.bookingService.deleteBooking(id, user);
  }
}
