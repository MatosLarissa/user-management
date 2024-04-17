import jwt from "jsonwebtoken"
import UserData from "./types/userData.type"
import UserUnauthorizedCustomException from "@/back/user/exceptions/userUnauthorizedCustom.exception"
import JwtExpiredCustomException from "@/back/user/exceptions/jwtExpiredCustom.exception"

const secret: string =  process.env.SECRET as string
const expires: string =  process.env.EXPIRES_IN as string

export function createUserToken(payload: UserData): string {
  try {
    if (!secret) {
      throw new Error("Secret key is not defined")
    }
    if (!payload) {
      throw new Error("Token is missing")
    }
    if (!expires) {
      throw new Error("Token is missing")
    }
    const token = jwt.sign(payload, secret, { expiresIn: expires})
    return token
  } catch (error) {
    console.error(error)
  }
}

export function verifyTokenTeste(token: string): UserData{
  try {
    if (!token) {
      throw new UserUnauthorizedCustomException()
    }
    if (!secret) {
      throw new Error("Secret key is not defined")
    }
    const cleanToken = token.replace(/^Bearer\s/, "")
    const data = jwt.verify(cleanToken, secret) as UserData

    return data
  } catch (error) {
    if (error instanceof Error && error.message === "jwt expired") {
      throw new JwtExpiredCustomException()
    }
    throw new UserUnauthorizedCustomException()
  }
}