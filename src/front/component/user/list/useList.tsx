import { User } from "@/front/service/endpoint/user/types/user.type"
import { formatDate, formatDateToInput } from "@/front/utils/formateDate.util"
import { DataGrid } from "@mui/x-data-grid"
import DeleteUserButton from "../button/deleteUser"
import EditUserButton from "../button/editUser"
import style from "./userList.module.sass"

export default function UserList({ token, userData, setUserData, setUser, setShowModal }){
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
              // setUserData(null)
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
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
        className={style.gridContainer}
      />
    </div>
  )
}