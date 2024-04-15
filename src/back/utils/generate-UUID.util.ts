import { randomBytes } from "crypto"

export default function generateUUID() {
  return randomBytes(16).toString("hex").toString()
}
