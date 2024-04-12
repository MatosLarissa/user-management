export default class BadRequestCustomException extends Error {
  statusCode: number;

  constructor(message?: string) {
    super(message || "BadRequestCustomException")
    this.name = "Required parameters or request body are missing or incorrectly formatted."
    this.statusCode = 400
  }
}
