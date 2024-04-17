import IUserRepository from "@/back/user/interfaces/userRepository.interface"
import UserRepository from "@/back/user/user.repository"
import UserService from "@/back/user/user.services"
import BcryptEncrypt from "@/back/utils/encrypt.util"
import instanceError from "@/back/utils/error-handler.util"
import FormatDate from "@/back/utils/format-date.util"
import LinkGenerator from "@/back/utils/generate-links.util"
import { UserDataTokenManager } from "@/shared/utils/hashManager.util"
import cors from "cors"
import { NextResponse } from "next/server"

const userRepository: IUserRepository = new UserRepository()
const encrypt = new BcryptEncrypt()
const formatDate = new FormatDate()
const userDataTokenManager = new UserDataTokenManager()
const linkGenerator = new LinkGenerator()
const userService = new UserService(userRepository, encrypt, formatDate, userDataTokenManager, linkGenerator)

export async function GET() {
  cors()

  try {
    const allUsers = await userService.getAllUsers()
    return NextResponse.json(allUsers)
  } catch (error) {
    const errorResponse = instanceError(error)
    return NextResponse.json(errorResponse, { status: errorResponse.statusCode })
  }
}
