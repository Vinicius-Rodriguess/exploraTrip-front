"use client";
import Header from "@/components/Header/Header";
import style from "./home.module.scss";
import { useUser } from "@/hooks/useUser";
import Link from "next/link";

export default function Home() {
  const { user } = useUser();

  return (
    <div className={style.container}>
      <Header />
      <div className={style.wrapperContent}>
        <h1>Olá, {user?.name ?? "usuário"}</h1>
        <p>Parece que você ainda não tem nenhuma viagem :(</p>
        <div className={style.wrapperBtns}>
          <Link href={"#"} className={style.btnCreate}>
            Começar agora
          </Link>
          <Link href={"#"} className={style.btnTrips}>
            Entrar
          </Link>
        </div>
      </div>
    </div>
  );
}
