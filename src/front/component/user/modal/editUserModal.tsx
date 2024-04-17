"use client"

import React, { useState, useEffect } from "react"
import style from "./editUserModal.module.sass"
import { UserEdit } from "@/front/service/endpoint/user/types/userEdit.type"
import UserForm from "../form/editUserForm"
import { useUserContext } from "@/front/context/useUserContext"
import { formatDateToInput } from "@/front/utils/formateDate.util"

interface EditUserModalProps {
  user?: UserEdit;
  onSave: (user: UserEdit) => void;
  onClose: () => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({ user, onSave, onClose }) => {
  const { userObject = {} } = useUserContext()

  const [editedUser, setEditedUser] = useState<UserEdit>({
    firstName: userObject.firstName || "",
    lastName: userObject.lastName || "",
    birthDate: userObject.birthDate || "",
    email: userObject.email || "",
    password: ""
  })

  useEffect(() => {
    setEditedUser({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      birthDate: formatDateToInput(user.birthDate) || "",
      email: user.email || ""
    })
  }, [user])

  const handleInputChange = (name: string, value: string) => {
    const newValue = name === "birthDate" && !isValidDate(value) ? "" : value
    setEditedUser({
      ...editedUser,
      [name]: newValue
    })
  }

  const handleSave = () => {
    onSave(editedUser)
  }

  const isValidDate = (dateString: string): boolean => {
    const date = new Date(dateString)
    return !isNaN(date.getTime())
  }

  return (
    <div className={style.modal}>
      <div className={style.content}>
        <button onClick={onClose} className={style.closeButton}>X</button>
        <h2>Editar Conta</h2>
        <UserForm user={editedUser} onChange={handleInputChange} />
        <button onClick={handleSave} className={style.saveButton}>Salvar</button>
      </div>
    </div>
  )
}

export default EditUserModal
