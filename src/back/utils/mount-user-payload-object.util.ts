import UserPayloadDto from "../user/models/dto/userPayload.dto"

export default function mountUserPayloadObject(payload: UserPayloadDto) {
  return {
    id: payload.id,
    name: payload.name,
    email: payload.email,
  }
}
