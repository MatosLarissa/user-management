import BASE_URL from "../BASE_URL"
import { ErrorResponse } from "./types/errorResponse"

export default async function fetchUsers() {
  const apiUrl = `${BASE_URL}/user/getAll`
  const response = await fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    const errorData: ErrorResponse  = await response.json()
    throw errorData
  }

  const data = await response.json()

  return data.users
}