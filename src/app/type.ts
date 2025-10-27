import { CSSProperties } from "react";

type CSSPropertiesWithPseudos = CSSProperties & {
  [key in `&::${string}`]?: CSSProperties;
};

export type stepType =
  | "model"
  | "template"
  | "selection"
  | "crop"
  | "mask"
  | "preview";

export type maskItemType = {
  id: number;
  src: string;
  styles: {
    [key: string]: CSSPropertiesWithPseudos;
  };
};

export type masksType = {
  [key: string]: maskItemType[];
};

export type templateItemType = {
  id: number;
  src: string;
  styles: {
    [key: string]: { [key: string]: string };
  };
};

export type templateType = {
  [key: string]: templateItemType[];
};

export type newsType = {
  id: number;
  title: string;
  image: string;
  chapeu: string;
  description: string;
  url: string;
};

export type pixelCropType = {
  height: number;
  width: number;
  x: number;
  y: number;
};

export type configType = {
  id: string;
  title: string;
  width: number;
  height: number;
};

export type selectType = {
  modelo: configType | null;
  template: templateItemType | null;
  news: string | undefined;
  mask: maskItemType | undefined
};
