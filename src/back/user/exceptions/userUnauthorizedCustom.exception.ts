export default class UserUnauthorizedCustomException extends Error {
  statusCode: number;

  constructor(message?: string) {
    super(message || "Unauthorized user")
    this.name = "UserUnauthorizedCustomException"
    this.statusCode = 401
  }
}
