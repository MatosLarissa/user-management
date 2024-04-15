import BadRequestCustomException from "../user/exceptions/badRequestCustom.exception"
import EmailAlreadyExistsCustomException from "../user/exceptions/emailAlreadyExistsCustom.exception"
import JwtExpiredCustomException from "../user/exceptions/jwtExpiredCustom.exception"
import UserNotFoundCustomException from "../user/exceptions/userNotFoundCustom.exception"
import UserUnauthorizedCustomException from "../user/exceptions/userUnauthorizedCustom.exception"

export default function instanceError(error) {
  if (error instanceof BadRequestCustomException) {
    return {
      statusCode: 400,
      message: error.message,
    }
  }

  if (error instanceof UserNotFoundCustomException) {
    return {
      statusCode: 404,
      message: error.message,
    }
  }

  if (error instanceof EmailAlreadyExistsCustomException) {
    return {
      statusCode: 409,
      message: error.message,
    }
  }

  if (error instanceof UserUnauthorizedCustomException) {
    return {
      statusCode: 401,
      message: error.message,
    }
  }

  if (error instanceof JwtExpiredCustomException) {
    return {
      statusCode: 401,
      message: error.message,
    }
  }

  return {
    statusCode: 500,
    message: "Internal Server Error",
  }
}
