import jwt from "jsonwebtoken"
import JwtExpiredCustomException from "../user/exceptions/jwtExpiredCustom.exception"
import UserUnauthorizedCustomException from "../user/exceptions/userUnauthorizedCustom.exception"
import AuthenticatorDto from "../user/models/dto/authenticator.dto"

export default class Authenticator {
  async createToken(payload: AuthenticatorDto): Promise<string> {
    try {
      return jwt.sign(payload, process.env.SECRET)
    } catch (error) {
      console.error(error)
    }
  }

  async getTokenData(token: string): Promise<AuthenticatorDto> {
    try {
      if (!token) {
        throw new UserUnauthorizedCustomException()
      }
      const cleanToken = token.replace(/^Bearer\s/, "")
      const data = jwt.verify(cleanToken, process.env.SECRET)

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
