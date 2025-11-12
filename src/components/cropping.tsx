import { configType, newsType, selectType, stepType } from "@/app/type";
import { ChevronLeft, RotateCcw, Scissors, Upload } from "lucide-react";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Cropper, { Area, Point } from "react-easy-crop";
import Loading from "./loading";
import { Button } from "./ui/button";

interface CroppingProps {
  next: stepType;
  previous: stepType;
  select: selectType;
  model: configType[];
  onChangeStep: (step: stepType) => void;
  setCroppedImage: Dispatch<SetStateAction<string | null>>;
}

const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous"; // ainda deixamos por garantia
    image.onload = () => resolve(image);
    image.onerror = (error) => reject(error);
    image.src = url;
  });

export async function getCroppedImg(
  imageSrc: string,
  pixelCrop: Area,
  config: configType
): Promise<string | null> {
  const imageSourceToUse = imageSrc.startsWith("data:")
    ? imageSrc
    : `/api/image-proxy?url=${encodeURIComponent(imageSrc)}`;

  const image = await createImage(imageSourceToUse);
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
        resolve(URL.createObjectURL(blob));
      },
      "image/jpeg",
      0.95
    );
  });
}

export default function Cropping({
  next,
  model,
  select,
  previous,
  onChangeStep,
  setCroppedImage,
}: CroppingProps) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [loading, setLoading] = useState(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    if (newsData?.image && !currentImage) {
      setCurrentImage(newsData.image);
    }
  }, [newsData?.image, currentImage]);

  const onCropComplete = useCallback(
    (_croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const applyCrop = useCallback(async () => {
    setLoading(true);
    if (!croppedAreaPixels || !currentImage || !config) {
      console.warn("Dados necessários para o corte não estão disponíveis.");
      return;
    }
    try {
      const croppedImageUrl = await getCroppedImg(
        currentImage,
        croppedAreaPixels,
        config
      );
      setCroppedImage(croppedImageUrl);
      setLoading(false);
      onChangeStep(next);
    } catch (e) {
      console.error("Erro ao aplicar o corte:", e);
    }
  }, [currentImage, croppedAreaPixels, config, setCroppedImage, onChangeStep, next]);

  function previusChangeStep() {
    onChangeStep(previous);
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRevertToOriginal = () => {
    if (newsData?.image) {
      setCurrentImage(newsData.image);
    }
  };

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
          image={currentImage || ""}
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

        <div className="flex justify-center gap-2 mt-4">
          <Button
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="mr-2 h-4 w-4" /> Alterar Imagem
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
          />
          {currentImage !== newsData.image && (
            <Button
              variant="outline"
              onClick={handleRevertToOriginal}
            >
              <RotateCcw className="mr-2 h-4 w-4" /> 
              Voltar para imagem original
            </Button>
          )}
        </div>

        <div className="mt-4 w-full flex justify-center gap-4">
          <Button
            onClick={previusChangeStep}
            disabled={loading}
            className="bg-gradient-to-br from-blue-500 to-cyan-600"
          >
            <ChevronLeft /> Voltar
          </Button>
          {!loading && (
            <Button
              onClick={applyCrop}
              className="bg-gradient-to-br from-blue-500 to-cyan-600"
            >
              Cortar <Scissors />
            </Button>
          )}
          {loading && (
            <Button className="bg-gradient-to-br from-blue-500 to-cyan-600 w-24">
              <Loading />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
