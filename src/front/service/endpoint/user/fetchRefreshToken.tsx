import BASE_URL from "../BASE_URL"
import { ErrorResponse } from "./types/errorResponse"

export default async function fetchRefreshToken(token: string ) {
  const apiUrl = `${BASE_URL}/user/refreshToken?token=${token}`

  const response = await fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })

  if (!response.ok) {
    const errorData: ErrorResponse  = await response.json()
    
    throw errorData
  }

  return response.json()
}