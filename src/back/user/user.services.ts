import { UserDataTokenManager } from "@/shared/utils/hashManager.util"
import UserCreationInputDto from "../../shared/types/userCreationInput.dto"
import UserInputUpdateDto from "../../shared/types/userInputUpdate.dto"
import BcryptEncrypt from "../utils/encrypt.util"
import FormatDate from "../utils/format-date.util"
import LinkGenerator from "../utils/generate-links.util"
import EmailAlreadyExistsCustomException from "./exceptions/emailAlreadyExistsCustom.exception"
import UserNotFoundCustomException from "./exceptions/userNotFoundCustom.exception"
import UserUnauthorizedCustomException from "./exceptions/userUnauthorizedCustom.exception"
import IUser from "./interfaces/user.interface"
import IUserRepository from "./interfaces/userRepository.interface"
import UserCreationDto from "./models/dto/userCreation.dto"
import UserLoginInputDto from "./models/dto/userLoginInput.dto"
import UserUpdateDto from "./models/dto/userUpdate.dto"
import ResponseAllUser from "./models/responses/responseAllUser"
import ResponseCreateUser from "./models/responses/responseCreateUser"
import ResponseUser from "./models/responses/responseUser"
import User from "./models/user"

export default class UserService {
  private readonly userRepository: IUserRepository;
  private readonly encrypt: BcryptEncrypt;
  private readonly formatDate: FormatDate;
  private readonly userDataTokenManager: UserDataTokenManager;
  private routers = [];

  constructor(
    userRepository: IUserRepository,
    encrypt: BcryptEncrypt,
    formatDate: FormatDate,
    userDataTokenManager: UserDataTokenManager,
    private readonly linkGenerator: LinkGenerator,

  ) {
    this.userRepository = userRepository
    this.encrypt = encrypt
    this.formatDate = formatDate
    this.userDataTokenManager = userDataTokenManager
    if (this.linkGenerator) {
      this.routers = this.linkGenerator.routes()
    }
  }

  async loginUser(input: UserLoginInputDto): Promise<ResponseUser> {
    console.log(`Starting login of user with email: ${input.email}`)
    const { email, password } = input
    try {
      const userExists: IUser = await this.userRepository.getUserByEmail(email)

      if (!userExists || userExists === null) {
        throw new UserNotFoundCustomException(email)
      }

      const isPasswordValid: boolean = await this.encrypt.compare(
        password,
        userExists.password
      )

      if (!isPasswordValid) {
        throw new UserUnauthorizedCustomException()
      }

      const date: Date = new Date(this.formatDate.toMySQL(new Date()))
      const loginChangeDate: UserUpdateDto = {
        id: userExists.id,
        updatedAt: date,
        lastLogin: date,
      }

      const atualUser = await this.userRepository.update(userExists, loginChangeDate)
      const token: string = this.userDataTokenManager.createUserToken(atualUser)

      console.log("Authorized login")
      return new ResponseCreateUser(userExists, token, this.routers)
    } catch (error) {
      console.log("Error login user")
      throw error
    }
  }

  async create(user: UserCreationInputDto): Promise<ResponseCreateUser> {
    console.log("Starting user creation")

    try {
      const userExists: IUser = await this.userRepository.getUserByEmail(
        user.email,
      )

      if (userExists) {
        throw new EmailAlreadyExistsCustomException(user.email)
      }

      const fullName: string = `${user.firstName} ${user.lastName}`
      const hashedPassword: string = await this.encrypt.hash(user.password)
      const date: Date = new Date(this.formatDate.toMySQL(new Date()))
      const [day, month, year] = user.birthDate.split("/")
      const birthDateNew = new Date(+year, +month - 1, +day)
      const birthDateFormated: Date = new Date(this.formatDate.toMySQL(birthDateNew))

      const newUser: UserCreationDto = ({
        name: fullName,
        birthDate: birthDateFormated,
        email: user.email,
        password: hashedPassword,
        createdAt: date,
        updatedAt: date,
        lastLogin: date,
      })

      const createdUser = await this.userRepository.create(newUser)

      if (createdUser) {
        const token: string = await this.userDataTokenManager.createUserToken(createdUser)
        return new ResponseCreateUser(createdUser, token, this.routers)
      }
    } catch (error) {
      console.log("Error creating user")
      throw error
    }
  }

  async getAllUsers(): Promise<ResponseAllUser> {
    console.log("Starting retrieval of all users")
    try {
      const users = await this.userRepository.getAllUsers()
      if (!users || users.length === 0) {
        console.log("No users found")
        return new ResponseAllUser([], this.routers, 0)
      }

      console.log(`Retrieved ${users.length} users`)
      return new ResponseAllUser(users, this.routers, users.length)
    } catch (error) {
      console.log("Error retrieving all users")
      throw error
    }
  }

  async getUserById(userId: string): Promise<ResponseUser> {
    try {
      const existingUser = await this.userRepository.getUserById(userId)
      if (!existingUser) {
        throw new UserNotFoundCustomException(userId)
      }

      const user = new User(existingUser)

      console.log(`Retrieved user with id ${userId}`)
      return new ResponseUser(user, this.routers)
    } catch (error) {
      console.log(`Error retrieving user with id: ${userId}`)
      throw error
    }
  }

  async getUserByEmail(userEmail: string): Promise<ResponseUser> {
    console.log(`Starting retrieval of user with email: ${userEmail}`)

    try {
      const existingUser = await this.userRepository.getUserByEmail(userEmail)
      if (!existingUser) {
        throw new UserNotFoundCustomException(userEmail)
      }

      const user = new User(existingUser)

      console.log(`Retrieved user with email ${userEmail}`)
      return new ResponseUser(user, this.routers)
    } catch (error) {
      console.log(`Error retrieving user with email: ${userEmail}`)
      throw error
    }
  }

  async update(token: string, userDetails: UserInputUpdateDto): Promise<ResponseUser> {
    console.log("Starting update of user")

    try {
      const tokenIsValid = await this.userDataTokenManager.getUserData(token)

      if (!tokenIsValid) {
        throw new UserUnauthorizedCustomException()
      }

      const userExists: IUser = await this.userRepository.getUserById(tokenIsValid.id)
      if (!userExists) {
        throw new UserNotFoundCustomException(tokenIsValid.id)
      }

      if (JSON.stringify(userExists) === JSON.stringify(userDetails)) {
        throw new Error("The provided data is identical to the existing data")
      }

      if (
        userDetails.email &&
      userDetails.email !== userExists.email &&
      (await this.userRepository.getUserByEmail(userDetails.email))
      ) {
        throw new EmailAlreadyExistsCustomException(userDetails.email)
      }

      let birthDateFormated: Date | null = null
      if (userDetails.birthDate) {
        birthDateFormated = new Date(userDetails.birthDate)
        const dateParts = userDetails.birthDate.split("/")
        const day = parseInt(dateParts[0], 10)
        const month = parseInt(dateParts[1], 10) - 1
        const year = parseInt(dateParts[2], 10)
        if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
          birthDateFormated = new Date(Date.UTC(year, month, day, 12, 0, 0))
        }
      }

      const newUser: UserUpdateDto = {
        id: userExists.id,
        name: userDetails.firstName || userDetails.lastName ? `${userDetails.firstName || ""} ${userDetails.lastName || ""}` : undefined,
        birthDate: birthDateFormated,
        email: userDetails.email || undefined,
        password: userDetails.password ? await this.encrypt.hash(userDetails.password) : undefined,
        updatedAt: new Date(),
        lastLogin: undefined,
      }
      const updatedUser = await this.userRepository.update(userExists, newUser)

      if (updatedUser) {
        const token: string = await this.userDataTokenManager.createUserToken(updatedUser)
        console.log(`User with id ${updatedUser.id} updated`)
        return new ResponseCreateUser(updatedUser, token, this.routers)
      }
    } catch (error) {
      throw error
    }
  }

  async checkToken(token: string): Promise<boolean> {
    console.log("Starting checkToken")
    try {
      const tokenIsValid = await this.userDataTokenManager.getUserData(token)

      if (!tokenIsValid) {
        throw new UserUnauthorizedCustomException()
      }

      const userExists: IUser =
        await this.userRepository.getUserById(tokenIsValid.id)
      if (!userExists) {
        throw new UserNotFoundCustomException(tokenIsValid.id)
      }
      return true
    } catch (error) {
      throw error
    }
  }

  async refreshToken(token: string): Promise<string> {
    console.log("Starting update of user")
    try {
      const tokenIsValid = await this.userDataTokenManager.getUserData(token)

      if (!tokenIsValid) {
        throw new UserUnauthorizedCustomException()
      }

      const userExists: IUser =
        await this.userRepository.getUserById(tokenIsValid.id)
      if (!userExists) {
        throw new UserNotFoundCustomException(tokenIsValid.id)
      }

      return await this.userDataTokenManager.createUserToken(userExists)
    } catch (error) {
      throw error
    }
  }

  async delete(token: string, userId: string): Promise<void> {
    console.log(`Starting deletion of user with id: ${userId}`)

    try {
      const tokenIsValid = await this.userDataTokenManager.getUserData(token)

      if (!tokenIsValid) {
        throw new UserUnauthorizedCustomException()
      }

      const userExists: IUser =
        await this.userRepository.getUserById(userId)

      if (!userExists) {
        throw new UserNotFoundCustomException(userId)
      }

      if (userExists.id != tokenIsValid.id) {
        throw new UserUnauthorizedCustomException(userId)
      }

      await this.userRepository.delete(userExists)
      console.log(`User with id ${userId} deleted`)
    } catch (error) {
      console.log(`Error deleting user with id: ${userId}`)
      throw error
    }
  }
}