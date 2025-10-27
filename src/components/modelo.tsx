"use client";

import { ChevronRight } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { configType, selectType, stepType } from "@/app/type";

type PropsType = {
  next: stepType;
  select: selectType;
  model: configType[];
  onChangeStep: (step: stepType) => void;
  onSelectMasks?: (key: string) => Promise<void>;
  setSelect: Dispatch<SetStateAction<selectType>>;
};

export default function ModelSelect({
  next,
  model,
  select,
  setSelect,
  onChangeStep,
  // onSelectMasks,
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

      {model.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {model.map((item) => (
              <Card
                key={item.id}
                onClick={() => {
                  // onSelectMasks(item.id);
                  setSelect((cur) => ({
                    ...cur,
                    modelo: item,
                  }));
                }}
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                  select.modelo?.id === item.id
                    ? "ring-2 ring-blue-500 shadow-lg bg-blue-50"
                    : "hover:shadow-md"
                }`}
              >
                <CardContent className="flex flex-col gap-2">
                  <div className="text-center">
                    <p className="font-semibold text-gray-800">{item.title}</p>
                  </div>
                  <div
                    className={`self-center h-20 rounded-md bg-gradient-to-br from-blue-500 to-cyan-600`}
                    style={{ aspectRatio: item.width / item.height }}
                  />
                  <div className="text-center">
                    <p className="text-sm text-gray-500">{`${item.width}x${item.height}`}</p>
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
        </>
      ) : (
        <div className="w-full text-center">
          <p className="text-muted-foreground">Nenhum modelo encontrado</p>
        </div>
      )}
    </div>
  );
}
