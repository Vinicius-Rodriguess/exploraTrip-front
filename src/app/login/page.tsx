"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";
import style from "./login.module.scss";
import FormInput from "@/components/FormInput/FormInput";

const loginSchema = z.object({
  emailVal: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
  keepConnected: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { login } = useUser();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { keepConnected: false },
  });

  const onSubmit = async (data: LoginFormData) => {
    const result = await login(data.emailVal, data.password, data.keepConnected);
    if (result.success) {
      toast.success("Login realizado com sucesso!");
      router.push("/home");
    } else {
      toast.error(result.message || "Falha ao fazer login.");
    }
  };

  return (
    <div className={style.container}>
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

        <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
          <div className={style.wrapperInputs}>
            <FormInput label="E-mail" type="email" {...register("emailVal")} />
            {errors.emailVal && <span className={style.error}>{errors.emailVal?.message}</span>}
            <FormInput label="Senha" type="password" {...register("password")} />
            {errors.password && <span className={style.error}>{errors.password?.message}</span>}
          </div>

          <div className={style.wrapperOptions}>
            <label className={style.checkboxLabel}>
              <input type="checkbox" {...register("keepConnected")} />
              <span className={style.customCheck}></span>
              Mantenha-me conectado
            </label>

            <Link href={"/esqueci-minha-senha"}>Esqueci minha senha</Link>
          </div>

          <div className={style.wrapperActions}>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Entrando..." : "Embarcar"}
            </button>
            <p>
              Não possui uma conta? <Link href={"/cadastro"}>Cadastre-se</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
