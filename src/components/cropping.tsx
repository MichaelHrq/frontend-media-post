import { configType, newsType, selectType, stepType } from "@/app/type";
import { modelo } from "@/constants/modelo";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import Cropper, { Area, Point } from "react-easy-crop";
import { Button } from "./ui/button";
import { ChevronLeft, Scissors } from "lucide-react";

interface CroppingProps {
  next: stepType;
  previous: stepType;
  select: selectType;
  onChangeStep: (step: stepType) => void;
  setCroppedImage: Dispatch<SetStateAction<string | null>>;
}

const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });

async function getCroppedImg(
  imageSrc: string,
  pixelCrop: Area,
  config: configType
): Promise<string | null> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    console.error("Não foi possível obter o contexto 2D do canvas.");
    return null;
  }

  canvas.width = config.width;
  canvas.height = config.height;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    config.width,
    config.height
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Falha ao criar o blob da imagem."));
          return;
        }
        resolve(window.URL.createObjectURL(blob));
      },
      "image/jpeg",
      0.95
    );
  });
}

export default function Cropping({
  next,
  previous,
  select,
  setCroppedImage,
  onChangeStep,
}: CroppingProps) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

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

  const onCropComplete = useCallback(
    (_croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const applyCrop = useCallback(async () => {
    if (!croppedAreaPixels || !newsData?.image || !config) {
      console.warn("Dados necessários para o corte não estão disponíveis.");
      return;
    }
    try {
      const croppedImageUrl = await getCroppedImg(
        newsData.image,
        croppedAreaPixels,
        config
      );
      setCroppedImage(croppedImageUrl);
      onChangeStep(next);
    } catch (e) {
      console.error("Erro ao aplicar o corte:", e);
    }
  }, [newsData, croppedAreaPixels, config]);

  function previusChangeStep() {
    onChangeStep(previous);
  }

  if (!config || !newsData) {
    return (
      <div className="px-2 py-4 max-w-4xl mx-auto text-center">
        <p>Carregando dados ou dados inválidos...</p>
      </div>
    );
  }

  return (
    <div className="px-2 py-4 max-w-4xl mx-auto flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-center">
        Ajuste o corte da imagem
      </h2>

      <div className="relative w-full h-96 bg-gray-200">
        <Cropper
          image={newsData.image}
          crop={crop}
          zoom={zoom}
          aspect={config.width / config.height}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
        />
      </div>

      <div className="flex flex-col gap-4 items-center">
        <div className="w-full max-w-sm">
          <label htmlFor="zoom-slider" className="block mb-2 font-medium">
            Zoom: {zoom.toFixed(1)}x
          </label>
          <input
            id="zoom-slider"
            type="range"
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div className="mt-4 w-full flex justify-center gap-4">
          <Button
            onClick={previusChangeStep}
            className="bg-gradient-to-br from-blue-500 to-cyan-600"
          >
            <ChevronLeft /> Voltar
          </Button>
          <Button
            onClick={applyCrop}
            className="bg-gradient-to-br from-blue-500 to-cyan-600"
          >
            Cortar <Scissors />
          </Button>
        </div>
      </div>
    </div>
  );
}
