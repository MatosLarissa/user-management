import style from "./error.module.sass"

export default function ErrorComponent({ message }: { message: string }) {
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