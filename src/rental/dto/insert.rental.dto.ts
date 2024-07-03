import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  Max,
  IsUUID,
} from 'class-validator';
export class InsertRentalDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsUUID()
  @IsNotEmpty()
  categoryId: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(900000)
  price: number;

  @IsString()
  @IsNotEmpty()
  adress: string;
}
