"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import Link from "next/link";

import style from "./esqueci-minha-senha.module.scss";
import FormInput from "@/components/FormInput/FormInput";
import { useUser } from "@/hooks/useUser";

// ===================== SCHEMA =====================
const forgotSchema = z
  .object({
    email: z.string().email("E-mail inválido"),
    newPassword: z.string().min(6, "A nova senha deve ter no mínimo 6 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "As senhas não conferem",
    path: ["confirmPassword"],
  });

type ForgotPasswordFormData = z.infer<typeof forgotSchema>;

// ===================== COMPONENTE =====================
export default function EsqueciMinhaSenha() {
  const router = useRouter();
  const { forgotPassword } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      const result = await forgotPassword(data.email, { password: data.newPassword });

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success("Código enviado para o seu e-mail. Redefina a senha.");
      router.push("/validar-email?operation=2");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Erro ao redefinir senha.");
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
          <h1>Redefinir senha</h1>
        </div>

        <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={style.wrapperInputs}>
            <FormInput label="E-mail" type="email" {...register("email")} />
            {errors.email && <span className={style.error}>{errors.email.message}</span>}

            <FormInput label="Nova senha" type="password" {...register("newPassword")} />
            {errors.newPassword && (
              <span className={style.error}>{errors.newPassword.message}</span>
            )}

            <FormInput
              label="Confirmar nova senha"
              type="password"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <span className={style.error}>{errors.confirmPassword.message}</span>
            )}
          </div>

          <div className={style.wrapperActions}>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Atualizando..." : "Enviar código"}
            </button>
            <p>
              Já tem cadastro? <Link href="/login">Entrar</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
