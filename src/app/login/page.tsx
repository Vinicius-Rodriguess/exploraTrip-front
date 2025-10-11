import Image from "next/image";
import style from "./login.module.scss";
import FormInput from "@/components/FormInput/FormInput";
import Link from "next/link";

export default function login() {
  return (
    <h1 className={style.container}>
      <div className={style.wrapperForm}>
        <div className={style.header}>
          <Image
            src="/assets/logo_exploraTrip.png"
            alt="Logo Explora Trip"
            width={143}
            height={70}
          />
          <h1>
            Bem-vindo de volta, <br /> pronto para a próxima viagem?
          </h1>
        </div>
        <form action="#" className={style.form}>
          <div className={style.wrapperInputs}>
            <FormInput label="Usuário" name="user" />
            <FormInput label="Senha" name="password" type="password" />
          </div>

          <div className={style.wrapperOptions}>
            <label className={style.checkboxLabel}>
              <input type="checkbox" name="keepConect" id="keepConect" />
              <span className={style.customCheck}></span>
              Mantenha-me conectado
            </label>

            <a href="#">Esqueci minha senha</a>
          </div>

          <div className={style.wrapperActions}>
            <button type="submit">Embarcar</button>
            <p>
              Não possui uma conta? <Link href={"/cadastro"}>Cadastre-se</Link>
            </p>
          </div>
        </form>
      </div>
    </h1>
  );
}
