import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator"

export default class UserInputUpdateDto {
  @IsString()
  @IsOptional()
  readonly firstName?: string;

  @IsString()
  @IsOptional()
  readonly lastName?: string;

  @IsDate()
  @IsNotEmpty()
  readonly birthDate?: string;

  @IsString()
  @IsOptional()
  readonly email?: string;

  @IsString()
  @IsOptional()
  readonly password?: string;
}
