import BASE_URL from "../BASE_URL"
import { ErrorResponse } from "./types/errorResponse"

export default async function fetchDeleteUser(token: string, userId: string ) {
  const apiUrl = `${BASE_URL}/user/delete?id=${userId}`

  const response = await fetch(apiUrl, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    }
  })

  if (!response.ok) {
    const errorData: ErrorResponse = await response.json()

    throw errorData
  }
}