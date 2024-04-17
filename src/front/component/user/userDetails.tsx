"use client"

import { useUserContext } from "@/front/context/useUserContext"
import { useState } from "react"
import style from "./userDetails.module.sass"
import UserList from "./list/useList"
import EditUserModal from "./modal/editUserModal"
import fetchEditUser from "@/front/service/endpoint/user/fetchEditUser"
import { UserEdit } from "@/front/service/endpoint/user/types/userEdit.type"
import { useErrorContex } from "@/front/context/erroBoundary"
import ResponseUser from "@/back/user/models/responses/responseUser"

const UserDetails: React.FC = () => {
  const { token, userData, setUserData, user, setUser, userObject } = useUserContext()
  const [showModal, setShowModal] = useState(false)

  const handleEditUser = async (editedUser: UserEdit) => {
    setUser(editedUser)
    console.log("editedUser", editedUser)
    const userData:ResponseUser = await fetchEditUser(token, editedUser)
    setUserData([userData.user])
    setShowModal(false)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  return (
    <div className={style.container}>
      <h1>Detalhes da sua conta</h1>
      {userData && (
        <div className={style.content}>
          {showModal && (
            <EditUserModal user={userObject} onSave={handleEditUser}  onClose={handleCloseModal}/>
          )}
          <UserList
            token={token}
            userData={userData}
            setUserData={setUserData}
            setUser={setUser}
            setShowModal={setShowModal}
          />
        </div>
      )}
    </div>
  )
}

export default UserDetails
