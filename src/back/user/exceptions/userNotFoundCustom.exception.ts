export default class UserNotFoundCustomException extends Error {
  statusCode: number;

  constructor(id: string) {
    super(`User ${id} not found`)
    this.name = "UserNotFoundCustomException"
    this.statusCode = 404
  }
}
