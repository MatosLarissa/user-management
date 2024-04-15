import { ErrorProvider } from "@/front/context/erroBoundary"
import { UserProvider } from "@/front/context/useUserContext"
import "@/front/styles/globals.sass"
import type { Metadata } from "next"
import { Playfair_Display } from "next/font/google"
import Header from "../front/component/header/header"

const PlayfairDisplay = Playfair_Display({
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "User Management",
  description: "Este é um sistema de gerenciamento de usuários desenvolvido com Next.js 14. Ele permite o cadastro, listagem e atualização de usuários. O sistema é composto por uma interface de usuário (front-end), uma API (back-end) e um banco de dados. Ele é flexível e pode ser implementado com várias tecnologias e linguagens, conforme a escolha do desenvolvedor. Este sistema é ideal para avaliações técnicas e processos seletivos na área de desenvolvimento de software.",
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={PlayfairDisplay.className}>
        <UserProvider>
          <Header />
          <ErrorProvider>
            {children}
          </ErrorProvider>
        </UserProvider>
      </body>
    </html>
  )
}
