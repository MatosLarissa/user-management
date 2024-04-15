import IUserRepository from "@/back/user/interfaces/userRepository.interface"
import UserRepository from "@/back/user/user.repository"
import UserService from "@/back/user/user.services"
import DataValidator from "@/back/user/validators/dataValidator"
import Authenticator from "@/back/utils/authenticator.util"
import BcryptEncrypt from "@/back/utils/encrypt.util"
import instanceError from "@/back/utils/error-handler.util"
import FormatDate from "@/back/utils/format-date.util"
import LinkGenerator from "@/back/utils/generate-links.util"
import cors from "cors"
import { NextRequest, NextResponse } from "next/server"

const userRepository: IUserRepository = new UserRepository()
const dataValidator = new DataValidator()
const encrypt = new BcryptEncrypt()
const formatDate = new FormatDate()
const generateAuthToken = new Authenticator()
const linkGenerator = new LinkGenerator()
const userService = new UserService(userRepository, encrypt, formatDate, generateAuthToken, linkGenerator)

export async function DELETE(req: NextRequest) {
  cors()

  try {
    const token = req.headers.get("Authorization")
    const userId = req.nextUrl.searchParams.get("id")
    await dataValidator.inputDeleteUserById(userId)
    await userService.delete(token, userId)
    return NextResponse.json({ status: 200 })
  } catch (error) {
    const errorResponse = instanceError(error)
    return NextResponse.json(errorResponse, { status: errorResponse.statusCode })
  }
}