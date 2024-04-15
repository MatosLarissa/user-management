import BASE_URL from "../BASE_URL"
import { ErrorResponse } from "./types/errorResponse"
import { UserEdit } from "./types/userEdit.type"

export default async function fetchEditUser(token: string, userData: UserEdit ) {
  const apiUrl = `${BASE_URL}/user/update`
  const response = await fetch(apiUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    },
    body: JSON.stringify(userData)
  })

  if (!response.ok) {
    const errorData: ErrorResponse  = await response.json()
    throw errorData
  }

  const data = await response.json()

  return data
}