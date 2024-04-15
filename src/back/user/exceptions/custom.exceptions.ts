import { BaseError } from "./baseError"

export class CustomError extends BaseError {

  public code: number;

  constructor(code: number, message: string) {
    super(message)
    this.code = code
  }
}
