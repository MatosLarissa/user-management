import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator"

export default class UserPayloadDto {
  @IsString()
  @IsNotEmpty()
  readonly id: string;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsDate()
  @IsNotEmpty()
  readonly birthDate: Date;

  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsOptional()
  readonly password?: string;

  @IsString()
  @IsOptional()
  readonly updatedAt?: string;

  @IsString()
  @IsOptional()
  readonly createdAt: string;

  @IsString()
  @IsOptional()
  readonly lastLogin: string;
}
