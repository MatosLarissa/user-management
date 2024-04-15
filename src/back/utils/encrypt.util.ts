import * as bcrypt from "bcryptjs"

export default class BcryptEncrypt {
  async hash(plainText: string): Promise<string> {
    const rounds = Number(process.env.BCRYPT_COST)
    const salt = await bcrypt.genSalt(rounds)
    return bcrypt.hash(plainText, salt)
  }

  async compare(plainText: string, cipherText: string): Promise<boolean> {
    return bcrypt.compare(plainText, cipherText)
  }
}
