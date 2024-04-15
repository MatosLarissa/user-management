"use client"

import { useState, useEffect } from "react"
import fetchCheckToken from "@/front/service/endpoint/user/fetchCheckToken"
import Loading from "../loading/loading"
import ErrorComponent from "../error/error"
import style from "./userDetails.module.sass"
import UserList from "./list/useList"
import { useUserContext } from "@/front/context/useUserContext"

const UserDetails: React.FC = () => {
  const { token, userData, setUserData } = useUserContext()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)

  useEffect(() => {
    async function fetchUserData() {
      setIsLoading(true)

      try {
        const validUser = await fetchCheckToken(token)
        setSuccess(true)
        if(validUser){
          setUserData(validUser)
        }
      } catch (error: any) {
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [setUserData, token])

  useEffect(() => {
    fetchCheckToken(token).then(setUserData)
  }, [setUserData, token])


  if (isLoading) return <Loading />

  if (error) return <ErrorComponent message={error} />

  return (
    <div className={style.container}>
      <h1>Detalhes da sua conta</h1>
      {userData && (
        <div className={style.content}>
          <UserList />
        </div>
      )}
    </div>
  )
}

export default UserDetails
