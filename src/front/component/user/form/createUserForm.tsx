"use client"

import fetchCreateUser from "@/front/service/endpoint/user/fetchCreateUser"
import UserCreationInputDto from "@/shared/types/userCreationInput.dto"
import { validateDate } from "@/shared/utils/validateDate.util"
import { validateEmail } from "@/shared/utils/validateEmail.util"
import { validatePassword } from "@/shared/utils/validatePassword.util"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Loading from "../../loading/loading"
import SucessComponent from "../../sucess/sucess"
import style from "./createUserForm.module.sass"
import { useErrorContex } from "@/front/context/erroBoundary"

export default function CreateUserForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { setError } = useErrorContex()
  const [success, setSuccess] = useState<boolean>(false)
  const router = useRouter()

  const handleBirthDateChange = (event) => {
    const inputDate = event.target.value
    if (inputDate.length > 10) {
      event.target.value = inputDate.slice(0, 10)
    }
  }


  const handleSubmit = async (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)
    const formValues: { [key: string]: string } = {}
    for (const [key, value] of formData.entries()) {
      formValues[key] = value.toString()
    }

    const birthDate: Date = new Date(formValues.birthDate)
    const year = birthDate.getUTCFullYear()
    const month = String(birthDate.getUTCMonth() + 1).padStart(2, "0")
    const day = String(birthDate.getUTCDate()).padStart(2, "0")
    const formattedBirthDate = `${day}/${month}/${year}`

    const userInputDto: UserCreationInputDto = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      birthDate: formattedBirthDate,
      email: formValues.email,
      password: formValues.password,
    }

    if (!validateEmail(userInputDto.email)) {
      setError("Endereço de e-mail inválido.")
      return
    }

    if (!validatePassword(userInputDto.password)) {
      setError("Senha inválida. A senha deve ter pelo menos seis caracteres, incluindo letras e números.")
      return
    }

    if (!validateDate(formattedBirthDate)) {
      setError("Data de nascimento inválida. Por favor, insira no formato DD/MM/YYYY.")
      return
    }

    if (!userInputDto.firstName || !userInputDto.lastName || !userInputDto.birthDate) {
      setError("Todos os campos são obrigatórios.")
      return
    }

    setIsLoading(true)
    try {
      const createUser = await fetchCreateUser(userInputDto)

      if (createUser) {
        setSuccess(true)

        let timeout: NodeJS.Timeout
        timeout = setTimeout(() => {
          setSuccess(false)
          router.push("/login")
        }, 2000)
        return () => clearTimeout(timeout)
      }
    } catch (error: any) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) return <Loading />

  return (
    <div className={style.container}>
      <div className={style.content}>
        <h1>Criar conta</h1>
        <form onSubmit={handleSubmit} className={style.form}>
          <div className={style.formFloating}>
            {success && <div>Usuário criado com sucesso!</div>}
            <label htmlFor="firstName">Primeiro Nome:</label>
            <input className={style.formControl} type="text" id="firstName" name="firstName" placeholder="Fulano" minLength={2} required />
            <label htmlFor="lastName">Último Nome:</label>
            <input className={style.formControl} type="text" id="lastName" name="lastName" placeholder="Detal" minLength={2} required />
            <label htmlFor="birthDate">Aniversário:</label>
            <input className={style.formControl} type="date" id="birthDate" name="birthDate" onChange={handleBirthDateChange} required />
            <label htmlFor="email">Email:</label>
            <input className={style.formControl} type="email" id="email" name="email" required />
            <label htmlFor="password">Senha:</label>
            <input className={style.formControl} type="password" id="password" name="password" minLength={6} required />
            <Link href="/login" className={style.login}>
                  Já tenho cadastro
            </Link>
            <button type="submit">Criar</button>
          </div>
        </form>
      </div>
      {success === true ? <SucessComponent message={"Cadastrado com sucesso!"} /> : null}
    </div>
  )
}
