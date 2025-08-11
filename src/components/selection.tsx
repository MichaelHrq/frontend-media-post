import { newsType, selectType, stepType } from "@/app/type";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "./ui/card";

type PropsType = {
  next: stepType;
  previus: stepType;
  select: selectType;
  news: newsType[] | undefined;
  onChangeStep: (step: stepType) => void;
  setSelect: Dispatch<SetStateAction<selectType>>;
};

export default function Selection({
  news,
  previus,
  next,
  onChangeStep,
  select,
  setSelect,
}: PropsType) {
  function previusChangeStep() {
    onChangeStep(previus);
  }
  function nextChangeStep() {
    if (!select.news)
      return toast.error("Selecione uma matéria antes de avançar");
    onChangeStep(next);
  }
  return (
    <div className="px-2 py-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Selecione uma matéria
      </h2>
      <Card>
        <CardContent>
          <Select
            onValueChange={(value) =>
              setSelect((curr) => ({ ...curr, news: value }))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione uma matéria" />
            </SelectTrigger>
            <SelectContent>
              {news?.map((item) => (
                <SelectItem key={item.id} value={JSON.stringify(item)}>
                  {item.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
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
