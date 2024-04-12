import { IsNotEmpty, IsString } from "class-validator"

export default class UserLoginInputDto {
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
