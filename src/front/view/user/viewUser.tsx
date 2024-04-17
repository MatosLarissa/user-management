"use client"

import Loading from "@/front/component/loading/loading"
import UserDetails from "@/front/component/user/userDetails"
import { useUserContext } from "@/front/context/useUserContext"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import style from "./viewUser.module.sass"

export default function ViewUser() {
  const { token } = useUserContext()
  const router = useRouter()

  useEffect(() => {
    if (!token) {
      router.push("/login")
    }
  }, [token, router])

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
