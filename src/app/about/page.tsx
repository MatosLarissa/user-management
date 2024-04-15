import Link from "next/link"
import style from "./about.module.sass"

export default function About() {
  return (
    <section className={style.section}>
      <div className={style.content}>
        <div className={style.title}>
          <h1>Next-Level</h1>
          <h1>Revolucionando a Gestão de Usuários com Next.js</h1>
        </div>
        <div  className={style.objective}>
          <h2>🎯 Objetivo do Projeto</h2>
          <p>O cerne deste projeto é demonstrar a eficiência e versatilidade do Next.js, tanto no front-end quanto no back-end, proporcionando uma plataforma ágil e confiável para gerenciamento de usuários.</p>
        </div>
        <div className={style.functionalities}>
          <h2>✨ Funcionalidades Principais</h2>
          <p>O sistema foi meticulosamente projetado para oferecer uma experiência de usuário segura e intuitiva, com funcionalidades como:</p>
          <ul>
            <li><strong>Criação de Usuário:{" "}</strong> Um processo simplificado para dar vida ao seu perfil.</li>
            <li><strong>Login Seguro:{" "}</strong> Acesso rápido e protegido com credenciais verificadas.</li>
            <li><strong>Gerenciamento de Token:{" "}</strong> Tokens JWT que asseguram a identidade do usuário a cada sessão.</li>
            <li><strong>Controle de Acesso:{" "}</strong> Uma camada de segurança que só permite acesso a páginas autenticadas.</li>
            <li><strong>Atualização de Dados:{" "}</strong> Flexibilidade para o usuário manter suas informações sempre atualizadas.</li>
            <li><strong>Exclusão de Conta:{" "}</strong> Autonomia para remover sua conta quando desejar.</li>
            <li><strong>Visualização de Usuários:{" "}</strong> Uma visão geral dos membros da plataforma, promovendo transparência e conexão.</li>
          </ul>
        </div>
        <div className={style.description}>
          <h2>🚀 Tecnologias Empregadas</h2>
          <p>Este projeto é uma vitrine da inovação tecnológica, incorporando um arsenal de ferramentas de ponta:</p>
          <ul>
            <li><strong>Next.js 14:{" "}</strong> A escolha perfeita para uma experiência de usuário impecável com renderização híbrida.</li>
            <li><strong>React 18:{" "}</strong> A biblioteca de UI que traz interatividade e reatividade aos componentes do projeto.</li>
            <li><strong>TypeORM:{" "}</strong> O ORM que oferece uma ponte robusta entre os objetos TypeScript e o banco de dados.</li>
            <li><strong>MySQL2:{" "}</strong> O motor de banco de dados que garante armazenamento de dados seguro e eficiente.</li>
            <li><strong>JWT:{" "}</strong> A solução de autenticação que protege as rotas e recursos do usuário.</li>
            <li>E uma gama diversificada de bibliotecas auxiliares que elevam o projeto a novas alturas.</li>
          </ul>
        </div>
        <div className={style.contact}>
          <h2>Entre em contato</h2>
          <ul>
            <li>
              <strong>Email:{" "}</strong>
              <Link
                href="mailto:larissamatost@outlook.com"
                target="_blank"
              >
                larissamatost@outlook.com{" "}
              </Link>
            </li>
            <li>
              <strong>LinkedIn:{" "}</strong>
              <Link
                href="https://www.linkedin.com/in/matos-larissa/"
                target="_blank"
                rel="noopener noreferrer"
              >
                @matos-larissa{" "}
              </Link>
            </li>
            <li>
              <strong>GitHub:{" "}</strong>
              <Link
                href="https://github.com/MatosLarissa"
                target="_blank"
              >
                @MatosLarissa{" "}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
