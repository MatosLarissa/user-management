"use client"

import React from "react"
import style from "./editUserForm.module.sass"
import { UserEdit } from "@/front/service/endpoint/user/types/userEdit.type"

interface UserFormProps {
  user: UserEdit;
  onChange: (name: string, value: string) => void;
}

const UserForm: React.FC<UserFormProps> = ({ user, onChange }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    onChange(name, value)
  }

  return (
    <div className={style.form}>
      <input
        className={style.formControl}
        type="text"
        name="firstName"
        value={user.firstName}
        onChange={handleInputChange}
        onPaste={(e) => e.preventDefault()}
        autoComplete="off"
        placeholder="Nome"
        minLength={2}
      />
      <input
        className={style.formControl}
        type="text"
        name="lastName"
        value={user.lastName}
        onChange={handleInputChange}
        onPaste={(e) => e.preventDefault()}
        autoComplete="off"
        placeholder="Sobrenome"
        minLength={2}
      />
      <input
        className={style.formControl}
        type="date"
        name="birthDate"
        value={user.birthDate}
        onChange={handleInputChange}
        onPaste={(e) => e.preventDefault()}
        autoComplete="off"
        placeholder="Data de Nascimento"
      />
      <input
        className={style.formControl}
        type="text"
        name="email"
        value={user.email}
        onChange={handleInputChange}
        onPaste={(e) => e.preventDefault()}
        autoComplete="off"
        placeholder="Email"
      />
      <input
        className={style.formControl}
        type="password"
        name="password"
        value={user.password}
        onChange={handleInputChange}
        onPaste={(e) => e.preventDefault()}
        autoComplete="new-password"
        placeholder="Senha"
        minLength={6}
      />
    </div>
  )
}

export default UserForm
