import { IsString, IsNotEmpty, IsNumber, Min, Max } from 'class-validator';
export class UpdateRentalDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(900000)
  price: number;
}
