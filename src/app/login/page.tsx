import LoginUserForm from "@/front/component/user/form/loginUserForm"
import style from "./login.module.sass"

export default function Login() {

  return (
    <section  className={style.section}>
      <LoginUserForm />
    </section>
  )
}
