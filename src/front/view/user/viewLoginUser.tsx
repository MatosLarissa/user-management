"use client"

import fetchLoginUser from "@/front/service/endpoint/user/fetchLoginUser"
import { useState } from "react"
import style from "./viewLoginUser.module.sass"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useUserContext } from "@/front/context/useUserContext"
import { useErrorContex } from "@/front/context/erroBoundary"
import SucessComponent from "@/front/component/sucess/sucess"
import LoginUserForm from "@/front/component/user/form/loginUserForm"

export default function ViewLoginUser() {
  const { token, setToken, inputLoginUser, setInputLoginUser } = useUserContext()
  const { setError } = useErrorContex()
  const [isLoading, setIsLoading] = useState(false)
  const [logged, setLogged] = useState<boolean>(false)
  const router = useRouter()

  const handleInputChange = (name: string, value: string) => {
    setInputLoginUser({
      ...inputLoginUser,
      [name]: value
    })
  }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetchLoginUser(inputLoginUser.email, inputLoginUser.password)
      if(response.token){
        setToken(response.token)
        router.push("/user")
      }
    } catch (error: any) {
      if (error.statusCode === 401) {
        setError("Usuário não autorizado")
      } else if (error.statusCode === 404) {
        setError("Usuário não está cadastrado")
      } else {
        setError("Usuário não está registrado")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <div className={style.container}>
        <div className={style.content}>
          <h1>Login</h1>
          <form onSubmit={handleSubmit} className={style.form}>
            <div className={style.formFloating}>
              <LoginUserForm
                user={inputLoginUser} onChange={handleInputChange}
              />
              <Link href="/create" className={style.create}>
                Quero me cadastrar
              </Link>
              <button type="submit" disabled={isLoading}>
                {isLoading ? "Loading..." : "Login"}
              </button>
              {/* <label htmlFor="email">Email:</label>
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
              /> */}

            </div>
          </form>
        </div>

      </div>
      {logged === true ? <SucessComponent message={"Logado!"} /> : null}
    </div>
  )
}
