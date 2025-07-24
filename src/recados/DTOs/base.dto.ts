import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class BaseDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(255)
  readonly text: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  readonly from: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  readonly to: string;
}
