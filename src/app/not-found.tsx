"use client"

import style from "./not-found.module.sass"
import Link from "next/link"
import { useEffect } from "react"
import { FaHome } from "react-icons/fa"
import { useRouter } from "next/navigation"

export default function NotFound() {
  const router = useRouter()
  useEffect(() => {
    setTimeout(() => {
      router.push("/")
    }, 5000)
  }, [router])

  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.title}>
          <h1>👽 Ué...</h1>
          <h2>Parece que você encontrou um buraco negro!</h2>
          <p>Não se preocupe, vamos te teleportar de volta para casa.</p>
        </div>
        <div className={style.button}>
          <Link href="/">
            <FaHome /> Teleporte-se para o início
          </Link>
        </div>
      </div>
    </div>
  )
}
