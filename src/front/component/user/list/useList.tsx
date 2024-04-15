import { useUserContext } from "@/front/context/useUserContext"
import fetchCheckToken from "@/front/service/endpoint/user/fetchCheckToken"
import fetchEditUser from "@/front/service/endpoint/user/fetchEditUser"
import { User } from "@/front/service/endpoint/user/types/user.type"
import { UserEdit } from "@/front/service/endpoint/user/types/userEdit.type"
import { formatDate } from "@/front/utils/formateDate.util"
import { DataGrid } from "@mui/x-data-grid"
import { useState } from "react"
import DeleteUserButton from "../button/deleteUser"
import EditUserButton from "../button/editUser"
import EditUserModal from "../modal/editUserModal"
import style from "./userList.module.sass"

export default function UserList(){
  const { token, userData, setUserData, user, setUser } = useUserContext()
  const [showModal, setShowModal] = useState(false)

  const handleEditUser = async (editedUser: UserEdit) => {
    setUser(editedUser)
    await fetchEditUser(token, editedUser)
    setShowModal(false)
    fetchUserData(token)
  }
  const handleCloseModal = () => {
    setShowModal(false)
  }

  const fetchUserData = async (token: string) => {
    try {
      const validUser = await fetchCheckToken(token)
      if (validUser) {
        setUserData(validUser)
      } else {
        setUserData([])
      }
    } catch (error) {
      console.error("Error fetching user data:", error)
    }
  }

  const rows = userData ? userData.map((user: User) => ({
    id: user.id,
    name: user.name,
    birthDate: formatDate(user.birthDate),
    email: user.email,
    creteDate: formatDate(user.createdAt),
    lastLogin: formatDate(user.lastLogin),
    updatedAt: formatDate(user.updatedAt),
  })) : []

  const columns = [
    { field: "name", headerName: "Nome", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "birthDate", headerName: "Nascimento", flex: 1 },
    { field: "creteDate", headerName: "Criação", flex: 1 },
    { field: "lastLogin", headerName: "Último  Login", flex: 1 },
    { field: "updatedAt", headerName: "Último  Update", flex: 1 },
    {
      field: "",
      headerName: "",
      flex: 1,
      renderCell: (params: any) => (
        <>
          <DeleteUserButton
            token={token}
            userId={params.row.id}
            onDeleteSuccess={() => {
              setUserData(null)
            }}
          />
          <EditUserButton
            token={token}
            userId={params.row.id}
            onEditSuccess={() => {
              setUserData(null)
            }}
            onEditClick={() => {
              setUser(userData.find(user => user.id === params.row.id))
              setShowModal(true)
            }}
          />
        </>
      ),
    },
  ]

  return (
    <div className={style.container}>
      {showModal && (
        <EditUserModal user={user} onSave={handleEditUser}  onClose={handleCloseModal}/>
      )}
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
        className={style.gridContainer}
      />
    </div>
  )
}
