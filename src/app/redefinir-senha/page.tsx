"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";

import style from "./redefinir-senha.module.scss";
import FormInput from "@/components/FormInput/FormInput";
import { useUser } from "@/hooks/useUser";
import { useEffect } from "react";

// ===================== SCHEMA =====================
const resetSchema = z
  .object({
    currentPassword: z.string().min(6, "A senha atual deve ter no mínimo 6 caracteres"),
    newPassword: z.string().min(6, "A nova senha deve ter no mínimo 6 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "As senhas não conferem",
    path: ["confirmPassword"],
  });

type ResetPasswordFormData = z.infer<typeof resetSchema>;

// ===================== COMPONENTE =====================
export default function RedefinirSenha() {
  const router = useRouter();
  const { loginRequired, isLoading, resetPassword } = useUser();

  useEffect(() => {
    loginRequired();
  }, [isLoading]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      await resetPassword({
        oldPassword: data.currentPassword,
        newPassword: data.newPassword,
      });

      toast.success("Senha alterada com sucesso!");
      router.push("/login");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Erro ao alterar senha.");
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
          <h1>Alterar senha</h1>
          <p>Informe sua senha atual e defina uma nova senha segura.</p>
        </div>

        <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={style.wrapperInputs}>
            <FormInput label="Senha atual" type="password" {...register("currentPassword")} />
            {errors.currentPassword && (
              <span className={style.error}>{errors.currentPassword.message}</span>
            )}

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
              {isSubmitting ? "Atualizando..." : "Atualizar senha"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
