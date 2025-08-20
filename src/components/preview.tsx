/* eslint-disable @next/next/no-img-element */
import { newsType, selectType, stepType } from "@/app/type";
import { modelo } from "@/constants/modelo";
import html2canvas from "html2canvas-pro";
import { ChevronLeft, Download } from "lucide-react";
import { useMemo, useRef } from "react";
import { Button } from "./ui/button";

interface PropsType {
  previous: stepType;
  select: selectType;
  croppedImage: string;
  onChangeStep: (step: stepType) => void;
}

export default function Preview({
  previous,
  select,
  croppedImage,
  onChangeStep,
}: PropsType) {
  const postPreviewRef = useRef<HTMLDivElement | null>(null);

  const { config, newsData } = useMemo(() => {
    if (!select.modelo || !select.news) {
      return { config: null, newsData: null };
    }
    try {
      const config = modelo[select.modelo];
      const newsData: newsType = JSON.parse(select.news);
      return { config, newsData };
    } catch (error) {
      console.error("Erro ao processar as props 'select':", error);
      return { config: null, newsData: null };
    }
  }, [select.modelo, select.news]);

  const previousChangeStep = () => {
    onChangeStep(previous);
  };

  const downloadMergedImage = async () => {
    const element = postPreviewRef.current;
    if (!element || !config) return;

    // Calcula a escala para que o canvas final tenha a largura desejada
    const scale = config.width / element.offsetWidth;

    const canvas = await html2canvas(element, {
      useCORS: true,
      scale: scale,
      // Fundo transparente para que o backgroundImage do div seja capturado
      backgroundColor: null,
    });

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/jpeg", 0.95);
    link.download = `post_${config.width}x${config.height}.jpeg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Renderiza um estado de carregamento se os dados não estiverem prontos
  if (!config || !newsData) {
    return (
      <div className="px-4 py-2 max-w-5xl mx-auto text-center">
        <p>Carregando preview...</p>
      </div>
    );
  }

  return (
    <div className="px-4 py-2 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Preview do Post</h2>

      <div className="w-full flex justify-center">
        <div
          ref={postPreviewRef}
          className="relative w-full max-w-lg rounded bg-cover bg-center overflow-hidden"
          style={{
            backgroundImage: `url(${croppedImage})`,
            aspectRatio: `${config.width} / ${config.height}`,
            // Adicione esta linha para resolver o problema de herança
            backgroundColor: "transparent",
          }}
        >
          <img
            src={select.template!}
            alt="Moldura do post"
            className="absolute top-0 left-0 z-10 w-full h-full pointer-events-none"
          />

          {newsData.chapeu && (
            <div className="absolute top-[77.3%] left-[6%] z-20 p-0 w-[156px] h-[21px] flex items-center justify-center">
              <p
                dangerouslySetInnerHTML={{
                  __html: newsData.chapeu.toUpperCase(),
                }}
                className="m-0 text-[8px] mt-[2px] sm:text-xs text-white font-bold [text-shadow:_2px_2px_4px_rgb(0_0_0_/_50%)]"
              />
            </div>
          )}

          {newsData.title && (
            <div className="absolute top-[82%] left-[2.5%] z-20 p-0 w-[95%] text-left">
              <h2
                dangerouslySetInnerHTML={{ __html: newsData.title }}
                className="font-bold text-sm sm:text-2xl text-white [text-shadow:_2px_2px_4px_rgb(0_0_0_/_50%)]"
              />
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 w-full flex justify-center gap-4">
        <Button
          onClick={previousChangeStep}
          className="bg-gradient-to-br from-blue-500 to-cyan-600"
        >
          <ChevronLeft size={18} /> Voltar
        </Button>
        <Button
          onClick={downloadMergedImage}
          className="bg-gradient-to-br from-blue-500 to-cyan-600"
        >
          Baixar Imagem <Download size={18} />
        </Button>
      </div>
    </div>
  );
}
