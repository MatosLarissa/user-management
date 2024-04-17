import style from "./create.module.sass"
import ViewCreateUser from "@/front/view/user/viewCreateUser"

export default function Create() {

  return (
    <section  className={style.section}>
      <ViewCreateUser />
    </section>
  )
}
