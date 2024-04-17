import JwtExpiredCustomException from "@/back/user/exceptions/jwtExpiredCustom.exception"
import UserUnauthorizedCustomException from "@/back/user/exceptions/userUnauthorizedCustom.exception"
import jwt from "jsonwebtoken"
import UserData from "./types/userData.type"

export class UserDataTokenManager {
  private readonly secret: string =  process.env.SECRET as string
  private readonly expires: string =  process.env.EXPIRES_IN as string


  public createUserToken(payload: UserData): string {
    try {
      if (!this.secret) {
        throw new Error("Secret key is not defined")
      }
      if (!payload) {
        throw new Error("Token is missing")
      }
      if (!this.expires) {
        throw new Error("Expires is not defined")
      }
      const token = jwt.sign(payload, this.secret, { expiresIn: this.expires})
      return token
    } catch (error) {
      console.error(error)
    }
  }

  public getUserData(token: string): UserData {
    try {
      if (!token) {
        throw new UserUnauthorizedCustomException()
      }
      if (!this.secret) {
        throw new Error("Secret key is not defined")
      }
      const cleanToken = token.replace(/^Bearer\s/, "")
      const data = jwt.verify(cleanToken, this.secret) as UserData

      return data
    } catch (error) {
      console.error(JSON.stringify(error))
      if (error instanceof Error && error.message === "jwt expired") {
        throw new JwtExpiredCustomException()
      }
      throw new UserUnauthorizedCustomException()
    }
  }
}
