/* eslint-disable @next/next/no-img-element */
import { configType, newsType, selectType, stepType } from "@/app/type";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { track } from "@vercel/analytics/react";
import html2canvas from "html2canvas-pro";
import { ChevronLeft, CircleAlert, Download } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
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
  const maskPreviewRef = useRef<HTMLDivElement | null>(null);

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

  const [title, setTitle] = useState(newsData?.title ?? "");
  const [chapeu, setChapeu] = useState(newsData?.chapeu ?? "");

  useEffect(() => {
    if (newsData?.title) {
      setTitle(newsData.title);
    }
    if (newsData?.chapeu) {
      setChapeu(newsData.chapeu);
    }
  }, [newsData?.title, newsData?.chapeu]);

  const previousChangeStep = () => {
    onChangeStep(previous);
  };

  const downloadMergedImage = async () => {
    setLoading(true);
    track("Download Image", {
      portal: process.env.NEXT_PUBLIC_PORTAL_NOTICIAS ?? '',
      modelo: config?.id ?? "desconhecido",
      titulo: newsData?.title ?? "desconhecido",
    });
    const element = postPreviewRef.current; // Assumindo que sempre queremos baixar o "post"
    if (!element || !config) return;
    const scale = config.width / element.offsetWidth;
    const canvas = await html2canvas(element, {
      useCORS: true,
      scale: scale,
      backgroundColor: null,
    });
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/jpeg", 1.0);
    link.download = `post_${config.id}.jpeg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setLoading(false);
  };

  const adjustFontSize = (
    element: HTMLParagraphElement | null,
    fontSizeValue: string | number | undefined
  ) => {
    if (!element || !fontSizeValue) return;

    let fontSize: number;

    if (typeof fontSizeValue === "string") {
      const parsedValue = parseFloat(fontSizeValue);
      if (fontSizeValue.endsWith("rem")) {
        // Assumindo que a fonte base do root é 16px para conversão de rem para px
        fontSize = parsedValue * 16;
      } else {
        fontSize = parsedValue;
      }
    } else {
      fontSize = fontSizeValue;
    }

    if (isNaN(fontSize)) return;

    element.style.fontSize = `${fontSize}px`; // Define o tamanho inicial

    // Enquanto o texto for maior que o contêiner, diminui o tamanho da fonte
    while (
      element.offsetWidth > (element.parentNode as HTMLElement)!.offsetWidth &&
      fontSize > 6
    ) {
      fontSize -= 0.5; // Reduz o tamanho da fonte
      element.style.fontSize = `${fontSize}px`; // Aplica o novo tamanho
    }

    // Se o texto ainda for maior que o contêiner após as reduções, esconde o texto
    if (
      element.offsetWidth > (element.parentNode as HTMLElement)!.offsetWidth
    ) {
      element.style.display = "none"; // Esconde o elemento se o texto ainda for muito grande
    }
  };

  if (!config || !newsData) {
    return (
      <div className="px-4 py-2 max-w-5xl mx-auto text-center">
        <p>Carregando preview...</p>
      </div>
    );
  }

  return (
    <div className="px-4 py-2 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Preview</h2>

      <Tabs defaultValue="post" className="items-center">
        <TabsList>
          {select.mask && (
            <>
              <TabsTrigger value="post">Post</TabsTrigger>
              <TabsTrigger value="mascara">Máscara</TabsTrigger>
            </>
          )}
        </TabsList>
        <TabsContent value="post" className="w-full md:w-xl">
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
                <div style={select.template.styles.chapeu.div}>
                  <p
                    contentEditable
                    suppressContentEditableWarning={true}
                    onBlur={(e) => setChapeu(e.currentTarget.innerHTML)}
                    dangerouslySetInnerHTML={{
                      __html: chapeu,
                    }}
                    ref={(element) =>
                      adjustFontSize(
                        element,
                        select.template?.styles.chapeu?.p.fontSize
                      )
                    }
                    style={select.template.styles.chapeu.p}
                  />
                </div>
              )}
              {select?.template?.styles?.title && (
                <div
                  style={select.template.styles.title.div}
                  className="cursor-pointer"
                >
                  <h2
                    contentEditable
                    suppressContentEditableWarning={true}
                    onBlur={(e) => setTitle(e.currentTarget.innerHTML)}
                    dangerouslySetInnerHTML={{ __html: title }}
                    style={select.template.styles.title.h2}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="mt-8 w-full flex justify-center bg-blue-100 rounded py-2 flex-row gap-2">
            <CircleAlert
              size={18}
              className="text-blue-400 text-sm font-bold"
            />
            <p className="text-blue-400 text-sm font-bold">
              Clique no título ou chapéu da matéria para editá-los
            </p>
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
        </TabsContent>
        <TabsContent value="mascara">
          <div className="w-full flex justify-center">
            <div
              ref={maskPreviewRef}
              className="relative h-[600px] max rounded bg-cover bg-center overflow-hidden border"
              style={{
                // backgroundImage: `url(${croppedImage})`,
                aspectRatio: `${config.width} / ${config.height}`,
                backgroundColor: "transparent",
              }}
            >
              <img
                src={select.mask?.src}
                alt="Moldura do post"
                className="absolute top-0 left-0 z-10 w-full h-full pointer-events-none"
              />

              {select?.template?.styles?.title && (
                <div
                  className="absolute bottom-[76%] left-[4%] z-20 w-[75%] pl-4 
             after:h-[90%] after:w-[3px] after:content-[''] after:absolute after:top-1/2 after:translate-y-[-50%] after:left-1.5 after:bg-white before:h-full before:w-[16px] before:content-[''] before:absolute before:top-0 before:left-0 before:bg-neutral-950"
                >
                  <h2
                    contentEditable
                    suppressContentEditableWarning={true}
                    onBlur={(e) => setTitle(e.currentTarget.innerHTML)}
                    dangerouslySetInnerHTML={{ __html: title }}
                    className="font-bold font-montserrat text-[16px] leading-2 text-white bg-neutral-950 py-1 pr-1 inline box-decoration-clone"
                  />
                </div>
              )}
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
        </TabsContent>
      </Tabs>
      <div></div>
    </div>
  );
}
