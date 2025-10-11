import Image from "next/image";
import style from "./cadastro.module.scss";
import FormInput from "@/components/FormInput/FormInput";

export default function Cadastro() {
  return (
    <h1 className={style.container}>
      <div className={style.wrapperForm}>
        <div className={style.header}>
          <Image
            src="/assets/logo_exploraTrip_simple.png"
            alt="Logo Explora Trip"
            width={173}
            height={50}
          />
          <h1>
            Crie sua conta e explore <br/> novos destinos
          </h1>
        </div>
        <form action="#" className={style.form}>
          <div className={style.wrapperInputs}>
            <FormInput label="Usuário" name="user" />
            <FormInput label="Email" name="text" type="text" />
            <FormInput label="Senha" name="password" type="password" />
            <FormInput label="Confirmar senha" name="password" type="password" />
          </div>

          <div className={style.wrapperActions}>
            <button type="submit">Cadastrar</button>
            <p>
              Já tem cadastro? <a href="#">Entrar</a>
            </p>
          </div>
        </form>
      </div>
    </h1>
  );
}
