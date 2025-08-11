"use client";

import SelecionarModelo from "@/components/modelo";
import Selection from "@/components/selection";
import TipoModeloSelecionado from "@/components/tipo-modelo";
import { useCallback, useEffect, useState } from "react";
import { fetchData } from "./action";
import { newsType, selectType, stepType } from "./type";
import Cropping from "@/components/cropping";
import Preview from "@/components/preview";

export default function Home() {
  const [step, setStep] = useState<stepType>("modelo");
  const [news, setNews] = useState<newsType[]>();
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [select, setSelect] = useState<selectType>({
    modelo: null,
    template: null,
    news: null,
  });

  const onChangeStep = useCallback((step: stepType) => {
    setStep(step);
  }, []);

  useEffect(() => {
    (async () => {
      const res = await fetchData();
      setNews(res);
    })();
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
          next="selection"
          previus="modelo"
          select={select}
          setSelect={setSelect}
          onChangeStep={onChangeStep}
        />
      )}
      {step === "selection" && select.modelo && (
        <Selection
          news={news}
          next="crop"
          previus="tipo"
          select={select}
          setSelect={setSelect}
          onChangeStep={onChangeStep}
        />
      )}
      {step === "crop" && select.modelo && (
        <Cropping
          next="preview"
          previous="selection"
          select={select}
          onChangeStep={onChangeStep}
          setCroppedImage={setCroppedImage}
        />
      )}
      {step === "preview" && select.modelo && (
        <Preview
          previous="crop"
          select={select}
          croppedImage={croppedImage!}
          onChangeStep={onChangeStep}
        />
      )}
    </main>
  );
}
