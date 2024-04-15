"use client"

import fetchLoginUser from "@/front/service/endpoint/user/fetchLoginUser"
import { ErrorResponse } from "@/front/service/endpoint/user/types/errorResponse"
import { useEffect, useState } from "react"
import ErrorComponent from "../../error/error"
import style from "./loginUserForm.module.sass"
import Link from "next/link"
import SucessComponent from "../../sucess/sucess"
import { useRouter } from "next/navigation"
import { useUserContext } from "@/front/context/useUserContext"

export default function LoginUserForm() {
  const { token, setToken } = useUserContext()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<ErrorResponse[]>()
  const [messageError, setMessageError] = useState<string>("")
  const [logged, setLogged] = useState<boolean>(false)
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetchLoginUser(email, password)
      if(response.token){
        setToken(response.token)
        setLogged(true)
      }

      localStorage.setItem("userToken", response.token)
    } catch (error: any) {
      setError(error)
      if (error.statusCode === 401) {
        setMessageError("Usuário não autorizado")
      } else if (error.statusCode === 404) {
        setMessageError("Usuário não está cadastrado")
      } else {
        setMessageError("Usuário não está registrado")
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    let timeout: NodeJS.Timeout
    if (token) {
      timeout = setTimeout(() => {
        setLogged(false)
        router.push("/user")
      }, 2000)
    }
    return () => clearTimeout(timeout)
  }, [router, token])

  useEffect(() => {
    let timeout: NodeJS.Timeout
    if (error) {
      timeout = setTimeout(() => {
        setError(null)
        setMessageError("")
      }, 2000)
    }
    return () => clearTimeout(timeout)
  }, [error])

  return (
    <div>
      <div className={style.container}>
        <div className={style.content}>
          <h1>Login</h1>
          <form onSubmit={handleSubmit} className={style.form}>
            <div className={style.formFloating}>
              <label htmlFor="email">Email:</label>
              <input
                className={style.formControl}
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="fulano@email.com"
                required
              />
              <label htmlFor="password">Senha:</label>
              <input
                className={style.formControl}
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="*********"
                required
              />
              <Link href="/create" className={style.create}>
                Quero me cadastrar
              </Link>
              <button type="submit" disabled={isLoading}>
                {isLoading ? "Loading..." : "Login"}
              </button>
            </div>
          </form>
        </div>

      </div>
      {error && <ErrorComponent message={messageError} />}
      {logged === true ? <SucessComponent message={"Logado!"} /> : null}
    </div>
  )
}
