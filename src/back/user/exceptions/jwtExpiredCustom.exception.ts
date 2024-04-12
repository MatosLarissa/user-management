export default class JwtExpiredCustomException extends Error {
  statusCode: number;

  constructor(message?: string) {
    super(message || "JWT token expired")
    this.name = "JwtExpiredCustomException"
    this.statusCode = 401
  }
}
