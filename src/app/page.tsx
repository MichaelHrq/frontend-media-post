"use client";

import SelecionarModelo from "@/components/modelo";
import TipoModeloSelecionado from "@/components/tipo-modelo";
import { modelo } from "@/constants/modelo";
import { useCallback, useState } from "react";

export type stepType = "modelo" | "tipo" | "preview";
export type selectType = {
  modelo: keyof typeof modelo | null;
  template: number | null;
};

export default function Home() {
  const [step, setStep] = useState<stepType>("modelo");
  const [select, setSelect] = useState<selectType>({
    modelo: null,
    template: null,
  });

  const onChangeStep = useCallback((step: stepType) => {
    setStep(step);
  }, []);

  return (
    <main className="flex-col items-center justify-center">
      {step === "modelo" && (
        <SelecionarModelo
          next="tipo"
          select={select}
          setSelect={setSelect}
          onChangeStep={onChangeStep}
        />
      )}
      {step === "tipo" && select.modelo && (
        <TipoModeloSelecionado
          next="preview"
          previus="modelo"
          select={select}
          setSelect={setSelect}
          onChangeStep={onChangeStep}
        />
      )}
    </main>
  );
}
