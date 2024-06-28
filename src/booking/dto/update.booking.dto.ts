import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class updateBookingDto {
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
}
