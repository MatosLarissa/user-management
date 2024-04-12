import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator"

export default class UserUpdateDto {
  readonly id: string;

  @IsString()
  @IsOptional()
  readonly name?: string;

  @IsDate()
  @IsNotEmpty()
  readonly birthDate?: Date;

  @IsString()
  @IsOptional()
  readonly email?: string;

  @IsString()
  @IsOptional()
  readonly password?: string;

  @IsString()
  @IsNotEmpty()
  updatedAt: Date;

  @IsString()
  @IsOptional()
  lastLogin?: Date;
}
