import { useState } from "react"
import { EditUserButtonProps } from "./types/editUser.type"
import ErrorComponent from "../../error/error"
import style from "./editUser.module.sass"

const EditUserButton: React.FC<EditUserButtonProps> = ({ onEditClick }) => {
  const [isLoading] = useState(false)
  const [error] = useState<string | null>(null)

  return (
    <div className={style.container}>
      <button onClick={onEditClick} disabled={isLoading}>
        Editar conta
      </button>
      {error && <ErrorComponent message={error} />}
    </div>
  )
}

export default EditUserButton
