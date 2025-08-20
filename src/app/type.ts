import { modelo } from "@/constants/modelo";

export type stepType = "modelo" | "tipo" | "selection" | "crop" | "preview";

export type selectType = {
  modelo: keyof typeof modelo | null;
  template: string | null;
  news: string | undefined;
};

export type newsType = {
  id: number;
  title: string;
  image: string;
  chapeu: string
};

export type pixelCropType = {
  height: number;
  width: number;
  x: number;
  y: number;
};

export type configType = {
  aspect: number;
  height: number;
  overlayPath: string;
  title: string;
  width: number;
};
