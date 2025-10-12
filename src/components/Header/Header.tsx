"use client";
import Image from "next/image";
import Link from "next/link";
import style from "./Header.module.scss";
import { useUser } from "@/hooks/useUser";
import { FiMapPin, FiUser, FiLogOut } from "react-icons/fi";

export default function Header() {
  const { user, logout } = useUser();

  return (
    <div className={style.container}>
      <div className={style.wrapperImg}>
        <Image src="/assets/logo_exploraTrip.png" alt="Logo Explora Trip" width={143} height={70} />
      </div>
      <div className={style.wrapperContent}>
        <p>Olá, {user?.name ?? "usuário"}</p>

        <Link href="#" className={style.link}>
          <FiMapPin /> Viagens
        </Link>

        <Link href="#" className={style.link}>
          <FiUser /> Perfil
        </Link>

        <button onClick={logout}>
          <FiLogOut /> Sair
        </button>
      </div>
    </div>
  );
}
