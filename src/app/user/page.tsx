import style from "./user.module.sass"
import ViewUser from "@/front/view/user/viewUser"
import Link from "next/link"

export default function User() {

  return (
    <section  className={style.section}>
      <div className={style.content}>
        <ViewUser />
        <div className={style.allUsers}>
          <Link href="/users" className={style.button}>
        Veja a lista de usuários
          </Link>
        </div>
      </ div>
    </section>
  )
}
