import style from "./user.module.sass"
import PageUser from "@/front/view/user/pageUser"
import Link from "next/link"

export default function User() {

  return (
    <section  className={style.section}>
      <div className={style.content}>
        <PageUser />
        <div className={style.allUsers}>
          <Link href="/users" className={style.button}>
        Veja a lista de usuários
          </Link>
        </div>
      </ div>
    </section>
  )
}
