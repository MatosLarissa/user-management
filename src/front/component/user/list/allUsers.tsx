"use client"

import fetchUsers from "@/front/service/endpoint/user/fetchAllUsers"
import { User } from "@/front/service/endpoint/user/types/user.type"
import { useEffect, useState } from "react"
import ErrorComponent from "../../error/error"
import Loading from "../../loading/loading"
import UsersList from "./usersLists"

export default function AllUsers() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    async function fetchAndSetUsers() {
      try {
        const fetchedUsers = await fetchUsers()
        setUsers(fetchedUsers)
      } catch (error: any) {
        setError(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchAndSetUsers()
  }, [])

  useEffect(() => {
  }, [users])

  if (isLoading) return <Loading />

  if (error) return <ErrorComponent message={error} />

  return <UsersList users={users} />
}
