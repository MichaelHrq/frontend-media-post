"use client";

import { selectType, stepType } from "@/app/page";
import { modelo } from "@/constants/modelo";
import { ChevronRight } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

type PropsType = {
  next: stepType;
  select: selectType;
  onChangeStep: (step: stepType) => void;
  setSelect: Dispatch<SetStateAction<selectType>>;
};

export default function SelecionarModelo({
  next,
  select,
  onChangeStep,
  setSelect,
}: PropsType) {
  const changeStep = () => {
    if (!select.modelo)
      return toast.error("Selecione um modelo antes de avançar");
    onChangeStep(next);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Selecione um Modelo
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {Object.entries(modelo).map(([key, value]) => (
          <Card
            key={key}
            onClick={() =>
              setSelect((cur) => ({
                ...cur,
                modelo: key as keyof typeof modelo,
              }))
            }
            className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
              select.modelo === key
                ? "ring-2 ring-blue-500 shadow-lg bg-blue-50"
                : "hover:shadow-md"
            }`}
          >
            <CardContent className="flex flex-col gap-2">
              <div className="text-center">
                <p className="font-semibold text-gray-800">{value.title}</p>
              </div>
              <div
                className={`self-center h-20 rounded-md bg-gradient-to-br from-blue-500 to-cyan-600 aspect-[${value.aspect}]`}
              />
              <div className="text-center">
                <p className="text-sm text-gray-500">{`${value.width}x${value.height}`}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-4 w-full flex justify-center">
        <Button
          onClick={changeStep}
          className="bg-gradient-to-br from-blue-500 to-cyan-600"
        >
          Avançar <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
