/* eslint-disable @next/next/no-img-element */
import {
  componentsType,
  configType,
  newsType,
  selectType,
  stepType,
} from "@/app/type";
import { Button } from "@/components/ui/button";
import { track } from "@vercel/analytics/react";
import html2canvas from "html2canvas-pro";
import { ChevronLeft, Download } from "lucide-react";
import { createElement, useEffect, useMemo, useRef, useState } from "react";
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
  // const maskPreviewRef = useRef<HTMLDivElement | null>(null);

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
  const [description, setDescription] = useState(newsData?.description ?? "");
  const [url, setUrl] = useState(newsData?.url ?? "");

  useEffect(() => {
    if (newsData?.title) {
      setTitle(newsData.title);
    }
    if (newsData?.chapeu) {
      setChapeu(newsData.chapeu);
    }
    if (newsData?.description) {
      setDescription(newsData.description);
    }
    if (newsData?.url) {
      setUrl(newsData.url);
    }
  }, [newsData?.title, newsData?.chapeu, newsData?.description, newsData?.url]);

  const previousChangeStep = () => {
    onChangeStep(previous);
  };

  const downloadMergedImage = async () => {
    setLoading(true);
    track("Download Image", {
      portal: process.env.NEXT_PUBLIC_PORTAL_NOTICIAS ?? "",
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

  const contentMap: { [key: string]: { value: string; setter: (value: string) => void } } = {
    chapeu: { value: chapeu, setter: setChapeu },
    title: { value: title, setter: setTitle },
    description: { value: description, setter: setDescription },
    url: { value: url, setter: setUrl },
  };

  const renderComponent = (component: componentsType): React.ReactElement => {
    const { element, editable, className, children, id } = component;
    const contentKey = Object.keys(contentMap).find((key) => id.includes(key));

    const props: React.HTMLAttributes<HTMLElement> & { key: string } = {
      key: id,
      className: className,
    };

    const hasChildren = children && children.length > 0;

    if (contentKey && contentMap[contentKey] && !hasChildren) {
      const { value, setter } = contentMap[contentKey];
      props.dangerouslySetInnerHTML = { __html: value };

      if (editable) {
        props.contentEditable = true;
        props.suppressContentEditableWarning = true;
        props.onBlur = (e: React.FocusEvent<HTMLElement>) => {
          setter(e.currentTarget.innerHTML);
        };
      }
    }

    return createElement(
      element,
      props,
      hasChildren ? children.map(renderComponent) : null
    );
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

      <div className="w-full flex justify-center">
        <div
          ref={postPreviewRef}
          id="post-preview"
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
          {select.template?.components?.map(renderComponent)}
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
      <div></div>
    </div>
  );
}
