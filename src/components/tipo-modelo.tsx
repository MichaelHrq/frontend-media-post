import { selectType, stepType } from "@/app/page";
import { modelo } from "@/constants/modelo";
import { template } from "@/constants/template";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { toast } from "sonner";

type PropsType = {
  next: stepType;
  previus: stepType;
  select: selectType;
  onChangeStep: (step: stepType) => void;
  setSelect: Dispatch<SetStateAction<selectType>>;
};

export default function TipoModeloselect({
  next,
  select,
  previus,
  setSelect,
  onChangeStep,
}: PropsType) {
  function previusChangeStep() {
    onChangeStep(previus);
  }
  function nextChangeStep() {
    if (!select.template)
      return toast.error("Selecione um template antes de avançar");
    onChangeStep(next);
  }

  const model = modelo[select.modelo!];

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Selecione um template
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {template.map((item) => (
          <Card
            key={item.key}
            onClick={() =>
              setSelect((cur) => ({
                ...cur,
                template: item.key,
              }))
            }
            className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
              select.template === item.key
                ? "ring-2 ring-blue-500 shadow-lg bg-blue-50"
                : "hover:shadow-md"
            }`}
          >
            <CardContent className="flex justify-center">
              <div
                className={`p-2 border-2 h-60 aspect-[${model.aspect}] flex flex-col justify-between`}
              >
                <div
                  className={`text-${item.logoPosition} w-full text-blue-500`}
                >
                  Logo
                </div>
                <div className="w-full">
                  <div className="h-4 w-full mb-1 rounded-xs bg-gradient-to-br from-blue-500 to-cyan-600"></div>
                  <div className="h-4 w-2/3 rounded-xs  bg-gradient-to-br from-blue-500 to-cyan-600"></div>
                </div>
              </div>
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
