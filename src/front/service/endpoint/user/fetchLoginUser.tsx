import BASE_URL from "../BASE_URL"
import { ErrorResponse } from "./types/errorResponse"

export default async function fetchLoginUser(email: string, password: string) {
  const apiUrl = `${BASE_URL}/user/login`
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })

  if (!response.ok) {
    const errorData: ErrorResponse  = await response.json()
    
    throw errorData
  }

  return response.json()
}