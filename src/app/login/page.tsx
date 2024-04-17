import style from "./login.module.sass"
import ViewLoginUser from "@/front/view/user/viewLoginUser"

export default function Login() {

  return (
    <section  className={style.section}>
      <ViewLoginUser />
    </section>
  )
}
