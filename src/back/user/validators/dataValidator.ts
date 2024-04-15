import { validateEmail } from "@/shared/utils/validateEmail.util"
import { validatePassword } from "@/shared/utils/validatePassword.util"
import UserCreationInputDto from "../../../shared/types/userCreationInput.dto"
import UserInputUpdateDto from "../../../shared/types/userInputUpdate.dto"
import BadRequestCustomException from "../exceptions/badRequestCustom.exception"
import { CustomError } from "../exceptions/custom.exceptions"
import UserUnauthorizedCustomException from "../exceptions/userUnauthorizedCustom.exception"
import UserLoginInputDto from "../models/dto/userLoginInput.dto"
import { validateDate } from "@/shared/utils/validateDate.util"

export default class DataValidator {
  constructor() {}

  async inputLogin(input: UserLoginInputDto): Promise<boolean> {
    const { email, password } = input

    if (!email) {
      throw new CustomError(422, "Please, inform a email.")
    }
    if (!password) {
      throw new CustomError(422, "Please, inform a password.")
    }
    if (validateEmail(email) === false) {
      throw new CustomError(422, "Invalid email.")
    }
    if (validatePassword(password) === false) {
      throw new CustomError(422, "Invalid password, needs at least six characters, at least one letter and one number.")
    }
    return true
  }

  async inputCreateUser(input: UserCreationInputDto): Promise<boolean> {
    const { firstName, lastName, birthDate, email, password } = input

    if (
      !firstName ||
      !lastName ||
      !birthDate ||
      !email ||
      !password
    ) {
      throw new BadRequestCustomException()
    }

    if (validateEmail(email) === false) {
      throw new CustomError(422, "Invalid email.")
    }
    if (validatePassword(password) === false) {
      throw new CustomError(422, "Invalid password, needs at least six characters, at least one letter and one number.")
    }
    if (validateDate(birthDate) === false) {
      throw new CustomError(422, "Invalid date of birth. Please enter in DD/MM/YYYY format.")
    }

    return true
  }

  async inputGetUserById(input: string): Promise<boolean> {
    if (!input) {
      throw new BadRequestCustomException()
    }
    return true
  }

  async inputGetUserByEmail(input: string): Promise<boolean> {
    if (!input) {
      throw new BadRequestCustomException()
    }
    return true
  }

  async inputDeleteUserById(input: string): Promise<boolean> {
    if (!input) {
      throw new BadRequestCustomException()
    }
    return true
  }

  async inputUpdateUser(
    token: string,
    inputId: string,
    inputData: UserInputUpdateDto,
  ): Promise<boolean> {
    const { birthDate, email, password } = inputData
    if (!token) {
      throw new UserUnauthorizedCustomException()
    }
    if (!inputId || !inputData) {
      throw new BadRequestCustomException()
    }
    if (validateEmail(email) === false) {
      throw new CustomError(422, "Invalid email.")
    }
    if (validatePassword(password) === false) {
      throw new CustomError(422, "Invalid password, needs at least six characters, at least one letter and one number.")
    }
    if (validateDate(birthDate) === false) {
      throw new CustomError(422, "Invalid date of birth. Please enter in DD/MM/YYYY format.")
    }
    return true
  }
}
