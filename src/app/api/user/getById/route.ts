import IUserRepository from "@/back/user/interfaces/userRepository.interface"
import UserRepository from "@/back/user/user.repository"
import UserService from "@/back/user/user.services"
import DataValidator from "@/back/user/validators/dataValidator"
import BcryptEncrypt from "@/back/utils/encrypt.util"
import instanceError from "@/back/utils/error-handler.util"
import FormatDate from "@/back/utils/format-date.util"
import LinkGenerator from "@/back/utils/generate-links.util"
import { UserDataTokenManager } from "@/shared/utils/hashManager.util"
import cors from "cors"
import { NextRequest, NextResponse } from "next/server"

const userRepository: IUserRepository = new UserRepository()
const dataValidator = new DataValidator()
const encrypt = new BcryptEncrypt()
const formatDate = new FormatDate()
const userDataTokenManager = new UserDataTokenManager()
const linkGenerator = new LinkGenerator()
const userService = new UserService(userRepository, encrypt, formatDate, userDataTokenManager, linkGenerator)

export async function GET(req: NextRequest) {
  cors()

  try {
    const userId = req.nextUrl.searchParams.get("id")
    await dataValidator.inputGetUserByEmail(userId)
    const user = await userService.getUserById(userId)
    return NextResponse.json(user)
  } catch (error) {
    const errorResponse = instanceError(error)
    return NextResponse.json(errorResponse, { status: errorResponse.statusCode })
  }
}
