import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class CreateBookingDto {
  @IsString()
  @IsNotEmpty()
  @IsDateString()
  reservationDate: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(100)
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(1000000)
  total: number;

  @IsNotEmpty()
  @IsUUID()
  rentalId: string;
}
