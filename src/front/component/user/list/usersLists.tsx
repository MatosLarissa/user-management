import { User } from "@/front/service/endpoint/user/types/user.type"
import { formatDate } from "@/front/utils/formateDate.util"
import { DataGrid } from "@mui/x-data-grid"
import style from "./usersLists.module.sass"

export default function UsersList({ users }: { users: User[] }) {

  const rows = users ? users.map((user: User) => ({
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
  ]

  return (
    <div className={style.container}>
      <div className={style.content}>
        <h1>Todos os usuários</h1>
        <DataGrid
          rows={rows}
          columns={columns}
          checkboxSelection
          className={style.gridContainer}
        />
      </div>
    </div>
  )
}