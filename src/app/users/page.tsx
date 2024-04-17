import Link from "next/link"
import style from "./users.module.sass"
import ViewAllUsers from "@/front/view/user/viewAllUsers"

export default function Users() {

  return (
    <section  className={style.section}>
      <div className={style.content}>
        <ViewAllUsers />
        <div className={style.allUsers}>
          <Link href="/user" className={style.button}>
            Edite a sua conta!
          </Link>
        </div>
      </ div>
    </section>
  )
}
