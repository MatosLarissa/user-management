import { useState } from "react"
import { DeleteUserButtonProps } from "./types/deleteUser.type"
import fetchDeleteUser from "@/front/service/endpoint/user/fetchDeleteUser"
import ErrorComponent from "../../error/error"
import style from "./deleteUser.module.sass"
import { useUserContext } from "@/front/context/useUserContext"
import { useRouter } from "next/navigation"

const DeleteUserButton: React.FC<DeleteUserButtonProps> = ({ userId, onDeleteSuccess }) => {
  const router = useRouter()
  const { token, clearToken } = useUserContext()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDeleteUser = async () => {
    setIsLoading(true)
    setError(null)

    try {
      await fetchDeleteUser(token, userId)
      onDeleteSuccess()
      clearToken()
      router.push("/login")
    } catch (error: any) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={style.container}>
      <button onClick={handleDeleteUser} disabled={isLoading}>
        {isLoading ? "Excluindo..." : "Excluir conta"}
      </button>
      {error && <ErrorComponent message={error} />}
    </div>
  )
}

export default DeleteUserButton