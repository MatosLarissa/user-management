"use client"

import React from "react"
import style from "./editUserForm.module.sass"
import { UserLogin } from "@/front/service/endpoint/user/types/userLogin.type"

interface LoginUserFormProps {
  user: UserLogin;
  onChange: (name: string, value: string) => void;
}

const LoginUserForm: React.FC<LoginUserFormProps> = ({ user, onChange }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    onChange(name, value)
  }


  return (
    <div className={style.form}>
      <label htmlFor="email">Email:</label>
      <input
        className={style.formControl}
        type="text"
        name="email"
        value={user.email}
        onChange={handleInputChange}
        onPaste={(e) => e.preventDefault()}
        autoComplete="off"
        placeholder="fulano@email.com"

      />

      <label htmlFor="password">Senha:</label>
      <input
        className={style.formControl}
        type="password"
        name="password"
        value={user.password}
        onChange={handleInputChange}
        onPaste={(e) => e.preventDefault()}
        autoComplete="off"
        placeholder="*********"
        minLength={6}
      />
    </div>
  )
}

export default LoginUserForm
