import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  Max,
  IsStrongPassword,
} from 'class-validator';
export class InsertRentalDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(900000)
  price: number;

  @IsString()
  @IsNotEmpty()
  adress: string;
}
