import { IsDate, IsNotEmpty, IsString } from "class-validator"

export default class UserCreationInputDto {
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsDate()
  @IsNotEmpty()
  readonly birthDate: string;

  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
