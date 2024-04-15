export default class EmailAlreadyExistsCustomException extends Error {
  statusCode: number;

  constructor(email: string) {
    super(`Email: ${email} is already in use`)
    this.name = "EmailAlreadyExistsCustomException"
    this.statusCode = 409
  }
}
