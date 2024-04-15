import IUserRepository from "@/back/user/interfaces/userRepository.interface"
import ResponseCreateUser from "@/back/user/models/responses/responseCreateUser"
import UserRepository from "@/back/user/user.repository"
import UserService from "@/back/user/user.services"
import DataValidator from "@/back/user/validators/dataValidator"
import Authenticator from "@/back/utils/authenticator.util"
import BcryptEncrypt from "@/back/utils/encrypt.util"
import instanceError from "@/back/utils/error-handler.util"
import FormatDate from "@/back/utils/format-date.util"
import LinkGenerator from "@/back/utils/generate-links.util"
import UserCreationInputDto from "@/shared/types/userCreationInput.dto"
import cors from "cors"
import { NextRequest, NextResponse } from "next/server"

const userRepository: IUserRepository = new UserRepository()
const dataValidator = new DataValidator()
const encrypt = new BcryptEncrypt()
const formatDate = new FormatDate()
const generateAuthToken = new Authenticator()
const linkGenerator = new LinkGenerator()
const userService = new UserService(userRepository, encrypt, formatDate, generateAuthToken, linkGenerator)

export async function POST(req: NextRequest) {
  cors()

  try {
    const body: UserCreationInputDto = await req.json()
    console.log("body", body)
    await dataValidator.inputCreateUser(body)
    const createdUser : ResponseCreateUser = await userService.create(body)
    return NextResponse.json(createdUser)
  } catch (error) {
    const errorResponse = instanceError(error)
    return NextResponse.json(errorResponse, { status: errorResponse.statusCode })
  }
}
