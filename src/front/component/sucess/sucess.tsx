import style from "./sucess.module.sass"

export default function SucessComponent({ message }: { message: string }) {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <p>
          {message}
        </p>
      </div>
    </div>
  )
}