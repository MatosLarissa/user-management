"use client"

import fetchUsers from "@/front/service/endpoint/user/fetchAllUsers"
import { User } from "@/front/service/endpoint/user/types/user.type"
import { useEffect, useState } from "react"
import Loading from "../../component/loading/loading"
import UsersList from "../../component/user/list/usersLists"
import { useErrorContex } from "@/front/context/erroBoundary"
import { useUserContext } from "@/front/context/useUserContext"
import { useRouter } from "next/navigation"

export default function ViewAllUsers() {
  const { setError } = useErrorContex()
  const [isLoading, setIsLoading] = useState(true)
  const [users, setUsers] = useState<User[]>([])
  const { token } = useUserContext()
  const router = useRouter()

  useEffect(() => {
    if (!token) {
      router.push("/login")
    }
  }, [token, router])

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
  }, [setError])

  useEffect(() => {
  }, [users])

  if (isLoading) return <Loading />


  return <UsersList users={users} />
}
