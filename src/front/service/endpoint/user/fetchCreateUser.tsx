import BASE_URL from "../BASE_URL"
import { ErrorResponse } from "./types/errorResponse"
import CreateUserInputDto from "./types/userCreationInput.dto"

export default async function fetchCreateUser(userData: CreateUserInputDto ) {
  const apiUrl = `${BASE_URL}/user/create`

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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