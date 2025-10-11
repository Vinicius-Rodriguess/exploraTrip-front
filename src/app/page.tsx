import HomeCard from "@/components/HomeCard/HomeCard";
import styles from "./app.module.scss";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.container}>
      <Image
        src="/assets/logo_exploraTrip.png"
        alt="Logo Explora Trip"
        width={143}
        height={70}
        className={styles.img}
      />
      <div className={styles.wrapperContent}>
        <div className={styles.content}>
          <div className={styles.wrapperText}>
            <h1>Planeje sua próxima aventura!</h1>
            <p>
              Organize seus roteiros, gerencie gastos e compartilhe experiências com seus amigos.
            </p>
          </div>
          <div className={styles.wrapperBtns}>
            <Link href={"/cadastro"} className={styles.btnStartNow}>Começar agora</Link>
            <Link href={"/login"} className={styles.btnLogin}>Entrar</Link>
          </div>
        </div>
        <div className={styles.wrapperCards}>
          <HomeCard
            img="/assets/home_card1.png"
            title="Roteiros Detalhados"
            desc="Crie roteiros dia a dia com locais, horários e atividades organizadas."
          />
          <HomeCard
            img="/assets/home_card2.png"
            title="Colaboração"
            desc="Compartilhe suas viagens com amigos e planejem juntos em tempo real."
            width={76}
            height={34}
          />
          <HomeCard
            img="/assets/home_card3.png"
            title="Gestão de Gastos"
            desc="Acompanhe os custos estimados e mantenha o orçamento sob controle."
          />
        </div>
      </div>
    </div>
  );
}
