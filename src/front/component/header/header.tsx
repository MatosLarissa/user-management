"use client"

import { usePathname } from "next/navigation"
import style from "./header.module.sass"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useUserContext } from "@/front/context/useUserContext"

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const {clearToken, token } = useUserContext()
  // const token = localStorage.getItem("userToken")

  // if(token){
  //   setToken(token)
  // }

  function logout (){
    clearToken()
    router.push("/login")
  }

  return (
    <header className={style.header}>
      <div className={style.containerLogo}>
        <Link href="/" className={style.logo}>User Management</Link>
      </div>
      <nav>
        <ul className={style.navList}>
          <li className={style.navItem}>
            <Link href="/"  className={pathname === "/" ? style.linkNoHover : style.link}>
                            Home
            </Link>
          </li>
          {token ? (
            <li className={style.navItem}>
              <div onClick={logout} className={style.link}>
                  logout
              </div>
            </li>
          ) : (
            ""
          )}
          <li className={style.navItem}>
            <Link href="/about" className={pathname === "/about" ? style.linkNoHover : style.link}>
                            About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
