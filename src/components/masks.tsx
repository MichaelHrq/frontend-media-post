/* eslint-disable @next/next/no-img-element */

import { maskItemType, selectType, stepType, templateType } from "@/app/type";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

type PropsType = {
  next: stepType;
  previus: stepType;
  select: selectType;
  masks: maskItemType[]
  template: templateType
  onChangeStep: (step: stepType) => void;
  setSelect: Dispatch<SetStateAction<selectType>>;
};

export default function Masks({
  next,
  masks,
  select,
  previus,
  setSelect,
  onChangeStep,
}: PropsType) {
  function previusChangeStep() {
    onChangeStep(previus);
  }
  function nextChangeStep() {
    if (!select.mask)
      return toast.error("Selecione uma máscara antes de avançar");
    onChangeStep(next);
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Selecione uma máscara
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {masks.map((item) => (
          <Card
            key={item.id}
            onClick={() =>
              setSelect((cur) => ({
                ...cur,
                mask: item,
              }))
            }
            className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
              select.mask?.id === item.id
                ? "ring-2 ring-blue-500 shadow-lg bg-blue-50"
                : "hover:shadow-md"
            }`}
          >
            <CardContent className="flex justify-center">
              <img
                src={item.src}
                alt="Template"
                className="w-full h-56 object-contain"
              />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-4 w-full flex justify-center gap-4">
        <Button
          onClick={previusChangeStep}
          className="bg-gradient-to-br from-blue-500 to-cyan-600"
        >
          <ChevronLeft /> Voltar
        </Button>
        <Button
          onClick={nextChangeStep}
          className="bg-gradient-to-br from-blue-500 to-cyan-600"
        >
          Avançar <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
