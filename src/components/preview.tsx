/* eslint-disable @next/next/no-img-element */
import { configType, newsType, selectType, stepType } from "@/app/type";
import html2canvas from "html2canvas-pro";
import { ChevronLeft, Download } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { Button } from "./ui/button";
import Loading from "./loading";

interface PropsType {
  model: configType[];
  previous: stepType;
  select: selectType;
  croppedImage: string;
  onChangeStep: (step: stepType) => void;
}

export default function Preview({
  model,
  select,
  previous,
  croppedImage,
  onChangeStep,
}: PropsType) {
  const postPreviewRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(false);

  const { config, newsData } = useMemo(() => {
    if (!select.modelo || !select.news) {
      return { config: null, newsData: null };
    }
    try {
      const config = model.find((item) => item.id === select.modelo?.id)!;
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
    setLoading(true);
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
    setLoading(false);
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
          className="relative h-[600px] max rounded bg-cover bg-center overflow-hidden"
          style={{
            backgroundImage: `url(${croppedImage})`,
            aspectRatio: `${config.width} / ${config.height}`,
            backgroundColor: "transparent",
          }}
        >
          <img
            src={select.template?.src}
            alt="Moldura do post"
            className="absolute top-0 left-0 z-10 w-full h-full pointer-events-none"
          />

          {select?.template?.styles?.chapeu && (
            <div className="absolute top-[77.3%] left-[6%] text-nowrap z-20 p-0 w-[145px] h-[20px] flex items-center justify-center">
              <p
                dangerouslySetInnerHTML={{
                  __html: newsData.chapeu,
                }}
                className="font-montserrat uppercase mt-0.5 text-[10px] text-white font-bold [text-shadow:_2px_2px_4px_rgb(0_0_0_/_50%)]"
              />
            </div>
          )}

          {select?.template?.styles?.title && (
            <div className="absolute top-[82%] left-[6%] z-20 p-0 w-[92%] text-left">
              <h2
                dangerouslySetInnerHTML={{ __html: newsData.title }}
                className="font-bold font-montserrat text-[20px] leading-6 text-white [text-shadow:_2px_2px_4px_rgb(0_0_0_/_50%)]"
              />
            </div>
          )}

          {/* {select?.template?.styles?.chapeu && (
            <div className={select.template.styles.chapeu.div}>
              <p
                dangerouslySetInnerHTML={{
                  __html: newsData.chapeu,
                }}
                className={select.template.styles.chapeu.p}
              />
            </div>
          )}

          {select?.template?.styles?.title && (
            <div className={select.template.styles.title.div}>
              <h2
                dangerouslySetInnerHTML={{ __html: newsData.title }}
                className={select.template.styles.title.h2}
              />
            </div>
          )} */}
        </div>
      </div>

      <div className="mt-8 w-full flex justify-center gap-4">
        <Button
          onClick={previousChangeStep}
          disabled={loading}
          className="bg-gradient-to-br from-blue-500 to-cyan-600"
        >
          <ChevronLeft size={18} /> Voltar
        </Button>
        {!loading && (
          <Button
            onClick={downloadMergedImage}
            className="bg-gradient-to-br from-blue-500 to-cyan-600"
          >
            Baixar Imagem <Download size={18} />
          </Button>
        )}
        {loading && (
          <Button className="bg-gradient-to-br from-blue-500 to-cyan-600 w-24">
            <Loading />
          </Button>
        )}
      </div>
    </div>
  );
}
