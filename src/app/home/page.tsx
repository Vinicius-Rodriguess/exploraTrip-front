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
          <Link href={"/criar-viagem"} className={style.btnCreate}>
            Criar nova viagem
          </Link>
          <Link href={"#"} className={style.btnTrips}>
            Minhas viagens
          </Link>
        </div>
      </div>
    </div>
  );
}
