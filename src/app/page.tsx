"use client";

import ModelSelect from "@/components/modelo";
import Selection from "@/components/selection";
import Template from "@/components/template";
import { useCallback, useEffect, useState } from "react";
import { fetchData } from "./action";
import Cropping from "@/components/cropping";
import Preview from "@/components/preview";
import { emtempoModel } from "@/constants/modelos/emtempo";
import { cenariumModel } from "@/constants/modelos/cenarium";
import { emtempoTemplate } from "@/constants/templates/emtempo";
import {
  configType,
  newsType,
  selectType,
  stepType,
  templateType,
} from "./type";
import { cenariumTemplate } from "@/constants/templates/cenarium";

export default function Home() {
  const [step, setStep] = useState<stepType>("model");
  const [news, setNews] = useState<newsType[]>();
  const [model, setModel] = useState<configType[]>([]);
  const [template, setTemplate] = useState<templateType>({});
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [select, setSelect] = useState<selectType>({
    modelo: null,
    template: null,
    news: undefined,
  });

  const portal_noticia = process.env.NEXT_PUBLIC_PORTAL_NOTICIAS ?? "";

  const onChangeStep = useCallback((step: stepType) => {
    setStep(step);
  }, []);

  const handleSelectModel = () => {
    switch (portal_noticia) {
      case "emtempo":
        setModel(emtempoModel);
        setTemplate(emtempoTemplate);
        break;
      case "cenarium":
        setModel(cenariumModel);
        setTemplate(cenariumTemplate);
        break;
      default:
        setModel([]);
        break;
    }
  };

  useEffect(() => {
    (async () => {
      handleSelectModel();
      const res = await fetchData();
      setNews(res);
    })();
  }, []);

  return (
    <main className="flex-col items-center justify-center">
      {step === "model" && (
        <ModelSelect
          model={model}
          next="template"
          select={select}
          setSelect={setSelect}
          onChangeStep={onChangeStep}
        />
      )}
      {step === "template" && (
        <Template
          previus="model"
          select={select}
          next="selection"
          template={template}
          setSelect={setSelect}
          onChangeStep={onChangeStep}
        />
      )}
      {step === "selection" && select.modelo && (
        <Selection
          next="crop"
          news={news}
          select={select}
          previus="template"
          setSelect={setSelect}
          onChangeStep={onChangeStep}
        />
      )}
      {step === "crop" && select.modelo && (
        <Cropping
          model={model}
          next="preview"
          select={select}
          previous="selection"
          onChangeStep={onChangeStep}
          setCroppedImage={setCroppedImage}
        />
      )}
      {step === "preview" && select.modelo && (
        <Preview
          model={model}
          previous="crop"
          select={select}
          croppedImage={croppedImage!}
          onChangeStep={onChangeStep}
        />
      )}
    </main>
  );
}
