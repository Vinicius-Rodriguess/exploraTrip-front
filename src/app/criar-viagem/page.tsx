"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import style from "./criar-viagem.module.scss";
import Header from "@/components/Header/Header";
import FormInput from "@/components/FormInput/FormInput";
import { useTrip } from "@/hooks/useTrip";
import { useUser } from "@/hooks/useUser";

// ===================== SCHEMA DE VALIDAÇÃO =====================
const tripSchema = z.object({
  destination: z
    .string()
    .min(3, "Informe o destino da viagem")
    .max(50, "Destino muito longo"),
  startDate: z.string().nonempty("Selecione a data de início"),
  endDate: z.string().nonempty("Selecione a data de término"),
  budget: z
    .string()
    .regex(/^R\$?\s?\d{1,3}(\.\d{3})*(,\d{2})?$/, "Insira um valor válido"),
});

type TripFormData = z.infer<typeof tripSchema>;

// ===================== COMPONENTE =====================
export default function CreateTrip() {
  const [step, setStep] = useState<"info" | "budget">("info");
  const { createTrip, loading } = useTrip();
  const { user } = useUser();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm<TripFormData>({
    resolver: zodResolver(tripSchema),
    defaultValues: {
      destination: "",
      startDate: "",
      endDate: "",
      budget: "",
    },
  });

  // ===================== ADVANCE PARA ORÇAMENTO =====================
  const handleStepNext = async () => {
    // Valida somente os campos iniciais antes de avançar
    const values = getValues();
    const schema = tripSchema.pick({ destination: true, startDate: true, endDate: true });
    try {
      schema.parse(values);
      setStep("budget");
    } catch (err: any) {
      toast.error(err.errors?.[0]?.message || "Preencha todos os campos corretamente.");
    }
  };

  // ===================== SUBMIT FINAL =====================
  const onSubmit = async (data: TripFormData) => {
    try {
      if (!user?.emailVal) throw new Error("Usuário não logado");

      const budgetNumber = Number(data.budget.replace(/\D/g, "")) / 100;

      const tripPayload = {
        name: data.destination,
        startDate: new Date(data.startDate).toISOString(),
        endDate: new Date(data.endDate).toISOString(),
        userRoles: [
          {
            userEmail: user.emailVal,
            role: 1,
          },
        ],
        budget: budgetNumber,
        notes: [],
      };

      const newTrip = await createTrip(tripPayload);

      toast.success("Viagem criada com sucesso!");
      console.log("Viagem criada:", newTrip);
      setStep("info");
    } catch (err: any) {
      toast.error(err.message || "Erro ao criar viagem. Tente novamente.");
    }
  };

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    value = (Number(value) / 100).toFixed(2) + "";
    value = value.replace(".", ",");
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    setValue("budget", `R$ ${value}`);
  };

  return (
    <div className={style.container}>
      <Header />

      <div className={style.wrapperContent}>
        {step === "info" ? (
          <>
            <h1>Vamos criar uma nova viagem?</h1>

            <form className={style.form} onSubmit={(e) => e.preventDefault()}>
              <div className={style.wrapperInputs}>
                <FormInput
                  label="Para onde vamos?"
                  {...register("destination")}
                />
                {errors.destination && (
                  <span className={style.error}>{errors.destination.message}</span>
                )}

                <div className={style.datesRow}>
                  <div className={style.dateInput}>
                    <label>Data de início</label>
                    <input type="date" {...register("startDate")} />
                    {errors.startDate && (
                      <span className={style.error}>{errors.startDate.message}</span>
                    )}
                  </div>

                  <div className={style.dateInput}>
                    <label>Data de término</label>
                    <input type="date" {...register("endDate")} />
                    {errors.endDate && (
                      <span className={style.error}>{errors.endDate.message}</span>
                    )}
                  </div>
                </div>
              </div>

              <button type="button" onClick={handleStepNext} disabled={isSubmitting || loading} className={style.button}>
                {isSubmitting || loading ? "Validando..." : "Começar"}
              </button>
            </form>
          </>
        ) : (
          <>
            <h1>Qual o orçamento?</h1>

            <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
              <FormInput
                label="Insira o valor"
                {...register("budget")}
                onChange={handleBudgetChange}
              />
              {errors.budget && (
                <span className={style.error}>{errors.budget.message}</span>
              )}

              <button type="submit" disabled={isSubmitting || loading} className={style.button}>
                {isSubmitting || loading ? "Enviando..." : "Continuar"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
