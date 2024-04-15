"use client"

import Loading from "@/front/component/loading/loading"
import UserDetails from "@/front/component/user/userDetails"
import { useUserContext } from "@/front/context/useUserContext"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import style from "./pageUser.module.sass"

const PageUser = () => {
  const { token } = useUserContext()
  const router = useRouter()
  const [isTokenReady, setTokenReady] = useState<boolean>(false)

  useEffect(() => {
    setTimeout(() => {
      if (token === undefined || token === null) {
        setTokenReady(false)
      }
      setTokenReady(true)
    }, 30000)
  }, [token])

  useEffect(() => {
    if (isTokenReady) {
      if (!token) {
        router.push("/login")
      }
    }
  }, [isTokenReady, token, router])

  return (
    <div className={style.container}>
      {token ? (
        <UserDetails />
      ) : (
        <Loading />
      )}
    </div>
  )
}

export default PageUser
