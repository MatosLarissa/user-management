import CreateUserForm from "@/front/component/user/form/createUserForm"
import style from "./create.module.sass"

export default function Create() {

  return (
    <section  className={style.section}>
      <CreateUserForm />
    </section>
  )
}
