"use client";

import Cropping from "@/components/cropping";
import ModelSelect from "@/components/modelo";
import Preview from "@/components/preview";
import Selection from "@/components/selection";
import Template from "@/components/template";
// import { cenariumMascaras } from "@/constants/mascaras/cenarium";
import { cenariumModel } from "@/constants/modelos/cenarium";
import { emtempoModel } from "@/constants/modelos/emtempo";
import { cenariumTemplate } from "@/constants/templates/cenarium";
import { emtempoTemplate } from "@/constants/templates/emtempo";
import { useCallback, useEffect, useState } from "react";
import { fetchData } from "./action";
import {
  configType,
  // maskItemType,
  newsType,
  selectType,
  stepType,
  templateType,
} from "./type";
// import Masks from "@/components/masks";

export default function Home() {
  const [step, setStep] = useState<stepType>("model");
  const [news, setNews] = useState<newsType[]>();
  const [model, setModel] = useState<configType[]>([]);
  const [template, setTemplate] = useState<templateType>({});
  // const [masks, setMasks] = useState<maskItemType[]>();
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [select, setSelect] = useState<selectType>({
    modelo: null,
    template: null,
    news: undefined,
    mask: undefined,
  });

  const portal_noticia = process.env.NEXT_PUBLIC_PORTAL_NOTICIAS ?? "";

  // const onSelectMasks = useCallback(async (key: string) => {
  //   if (portal_noticia === "cenarium") setMasks(cenariumMascaras[key]);
  // }, []);

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
          // onSelectMasks={onSelectMasks}
        />
      )}
      {step === "template" && (
        <Template
          previus="model"
          select={select}
          next={"selection"}
          // next={masks ? "mask" : "selection"}
          template={template}
          setSelect={setSelect}
          onChangeStep={onChangeStep}
        />
      )}
      {/* {step === "mask" && masks && (
        <Masks
          masks={masks}
          next="selection"
          previus="template"
          select={select}
          template={template}
          onChangeStep={onChangeStep}
          setSelect={setSelect}
        />
      )} */}
      {step === "selection" && select.modelo && (
        <Selection
          next="crop"
          news={news}
          select={select}
          previus={"template"}
          // previus={masks ? "mask" : "template"}
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
