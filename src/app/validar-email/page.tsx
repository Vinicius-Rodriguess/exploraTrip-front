"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";

import style from "./validar-email.module.scss";
import FormInput from "@/components/FormInput/FormInput";
import { useUser } from "@/hooks/useUser";
import Link from "next/link";

// ===================== SCHEMA =====================
const otpSchema = z.object({
  code: z
    .string()
    .regex(/^\d{3}$/, "O código deve conter exatamente 3 números"),
});

type OtpFormData = z.infer<typeof otpSchema>;

// ===================== COMPONENTE =====================
export default function ValidarEmail() {
  const router = useRouter();
  const { verifyEmail, user } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
  });

  const onSubmit = async (data: OtpFormData) => {
    try {
      await verifyEmail(data.code);
      toast.success("E-mail verificado com sucesso!");
      router.push("/login");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Erro ao verificar código.");
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
          <h1>Verificação de e-mail</h1>
          <p>
            Digite o código que enviamos para o e-mail <br />
            <strong>{user?.emailVal ?? "seu e-mail cadastrado"}</strong>
          </p>
        </div>

        <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={style.wrapperInputs}>
            <FormInput label="Código" {...register("code")} />
            {errors.code && (
              <span className={style.error}>{errors.code.message}</span>
            )}
          </div>

          <div className={style.wrapperActions}>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Verificando..." : "Confirmar"}
            </button>
            <p>
              Já tem cadastro? <Link href={"/login"}>Entrar</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
