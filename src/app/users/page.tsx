import AllUsers from "@/front/component/user/list/allUsers"
import Link from "next/link"
import style from "./users.module.sass"

export default function Users() {

  return (
    <section  className={style.section}>
      <div className={style.content}>
        <AllUsers />
        <div className={style.allUsers}>
          <Link href="/user" className={style.button}>
            Edite a sua conta!
          </Link>
        </div>
      </ div>
    </section>
  )
}
