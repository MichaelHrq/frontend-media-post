export type stepType =
  | "model"
  | "template"
  | "selection"
  | "crop"
  | "mask"
  | "preview";

export type templateItemType = {
  id: number;
  src: string;
  styles: {
    chapeu: {
      div: string;
      p: string;
    } | null;
    title: {
      div: string;
      h2: string;
    };
  };
};

export type templateType = { 
  [key: string]: templateItemType[]
};

export type newsType = {
  id: number;
  title: string;
  image: string;
  chapeu: string;
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
};
