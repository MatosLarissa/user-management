import { BaseError } from "./baseError"

export class CustomError extends BaseError {

  constructor(public code: number, message: string) {
    super(code, message)
  }
}