import Image from "next/image";
import style from "./style.module.scss";

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
            <div className={style.inputContainer}>
              <input type="text" name="user" id="user" placeholder=" " required />
              <label htmlFor="user">Usuário</label>
              <span className={style.spanBar}></span>
            </div>

            <div className={style.inputContainer}>
              <input type="password" name="password" id="password" placeholder=" " required />
              <label htmlFor="password">Senha</label>
              <span className={style.spanBar}></span>
            </div>
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
              Não possui uma conta? <a href="#">Cadastre-se</a>
            </p>
          </div>
        </form>
      </div>
    </h1>
  );
}
