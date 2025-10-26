"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";

import style from "./cadastro.module.scss";
import FormInput from "@/components/FormInput/FormInput";
import { useUser } from "@/hooks/useUser";

// ===================== SCHEMA DE VALIDAÇÃO =====================
const cadastroSchema = z
  .object({
    name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
    emailVal: z.string().email("Email inválido"),
    password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não conferem",
    path: ["confirmPassword"],
  });

type CadastroFormData = z.infer<typeof cadastroSchema>;

// ===================== COMPONENTE =====================
export default function Cadastro() {
  const router = useRouter();
  const { register: registerUser } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CadastroFormData>({
    resolver: zodResolver(cadastroSchema),
  });


  const onSubmit = async (data: CadastroFormData) => {
    try {
      const result = await registerUser(data.name, data.emailVal, data.password);

      if (result) {
        toast.success("Cadastro realizado com sucesso!");
        router.push("/validar-email?operation=1");
      } else {
        toast.error("Erro ao realizar cadastro. Por favor, tente novamente.");
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Erro ao realizar cadastro. Por favor, tente novamente.");
    }
  };

  return (
    <div className={style.container}>
      <div className={style.wrapperForm}>
        <div className={style.header}>
          <Image
            src="/assets/logo_exploraTrip_simple.png"
            alt="Logo Explora Trip"
            width={173}
            height={50}
          />
          <h1>
            Crie sua conta e explore <br /> novos destinos
          </h1>
        </div>

        <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={style.wrapperInputs}>
            <FormInput
              label="Nome"
              {...register("name")}
            />
            {errors.name && (
              <span className={style.error}>{errors.name.message}</span>
            )}

            <FormInput
              label="Email"
              type="email"
              {...register("emailVal")}
            />
            {errors.emailVal && (
              <span className={style.error}>{errors.emailVal.message}</span>
            )}

            <FormInput
              label="Senha"
              type="password"
              {...register("password")}
            />
            {errors.password && (
              <span className={style.error}>{errors.password.message}</span>
            )}

            <FormInput
              label="Confirmar senha"
              type="password"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <span className={style.error}>
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <div className={style.wrapperActions}>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Cadastrando..." : "Cadastrar"}
            </button>
            <p>
              Já tem cadastro? <a href="/login">Entrar</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
