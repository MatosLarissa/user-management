"use client"

import style from "./page.module.sass"
import Link from "next/link"

export default function Home() {

  return (
    <main className={style.main}>
      <section className={style.section}>
        <div>
          <Link href="/login" className={style.button}>
            Já sou cadastrad@
          </Link>
        </div>
        <div>
          <Link href="/create" className={style.button}>
            Quero me cadastrar
          </Link>
        </div>
      </section>
    </main>
  )
}
