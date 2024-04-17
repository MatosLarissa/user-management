"use client"

import fetchCreateUser from "@/front/service/endpoint/user/fetchCreateUser"
import UserCreationInputDto from "@/shared/types/userCreationInput.dto"
import { validateDate } from "@/shared/utils/validateDate.util"
import { validateEmail } from "@/shared/utils/validateEmail.util"
import { validatePassword } from "@/shared/utils/validatePassword.util"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import style from "./viewCreateUser.module.sass"
import { useErrorContex } from "@/front/context/erroBoundary"
import { useUserContext } from "@/front/context/useUserContext"
import Loading from "@/front/component/loading/loading"
import UserForm from "@/front/component/user/form/editUserForm"
import SucessComponent from "@/front/component/sucess/sucess"
import { formatDateBRToInput } from "@/front/utils/formateDate.util"

const ViewCreateUser: React.FC = () => {
  const { inputCreateUser, setInputCreateUser } = useUserContext()
  const { setError } = useErrorContex()
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const isValidDate = (dateString: string): boolean => {
    const date = new Date(dateString)
    return !isNaN(date.getTime())
  }

  const handleInputChange = (name: string, value: string) => {
    const newValue = name === "birthDate" && !isValidDate(value) ? "" : value
    setInputCreateUser({
      ...inputCreateUser,
      [name]: newValue,
    })
  }

  const handleSubmit = async () => {
    const userInputDto: UserCreationInputDto = {
      firstName: inputCreateUser.firstName,
      lastName: inputCreateUser.lastName,
      birthDate: formatDateBRToInput(inputCreateUser.birthDate),
      email: inputCreateUser.email,
      password: inputCreateUser.password,
    }

    if (!validateEmail(userInputDto.email)) {
      setError("Endereço de e-mail inválido.")
      return
    }

    if (!validatePassword(userInputDto.password)) {
      setError("Senha inválida: Por favor, insira uma senha com pelo menos 6 caracteres, contendo pelo menos um dígito, uma letra minúscula e uma letra maiúscula.")
      return
    }

    if (!validateDate(userInputDto.birthDate)) {
      setError("Data de nascimento inválida. Por favor, insira no formato DD/MM/YYYY.")
      return
    }

    if (!userInputDto.firstName || !userInputDto.lastName || !userInputDto.birthDate || !userInputDto.email || !userInputDto.password ) {
      setError("Todos os campos são obrigatórios.")
      return
    }

    setIsLoading(true)
    try {
      const createUser = await fetchCreateUser(userInputDto)

      if (createUser) {
        setSuccess(true)
        setTimeout(() => {
          setSuccess(false)
          router.push("/login")
        }, 2000)
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
            <UserForm user={inputCreateUser} onChange={handleInputChange} />
            <Link href="/login" className={style.login}>
              Já tenho cadastro
            </Link>
            <button type="submit">Criar</button>
          </div>
        </form>
      </div>
      {success && <SucessComponent message={"Cadastrado com sucesso!"} />}
    </div>
  )
}

export default ViewCreateUser
