import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RentalService } from './rental.service';
import { InsertRentalDto } from './rental/insert.rental.dto';
import { UpdateRentalDto } from './rental/update.rental.dto';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';
@UseGuards(JwtGuard)
@Controller('rental')
export class RentalController {
  constructor(private readonly rentalService: RentalService) {}

  @Get('/all')
  getAllRentals() {
    return this.rentalService.getAllRentals();
  }

  @Post('/new')
  createRental(@Body() dto: InsertRentalDto, @GetUser() user: User) {
    return this.rentalService.createRental(dto, user);
  }

  @Patch('/update/:id')
  updateRental(@Body() dto: UpdateRentalDto, @Param('id') id: string) {
    return this.rentalService.updateRental(id, dto);
  }

  @Delete('/delete/:id')
  deleteRental(@Param('id') id: string) {
    return this.rentalService.deleteRental(id);
  }
}
