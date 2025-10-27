// 'use server';

import { newsType } from "./type";

export const fetchData = async () => {
  const url = process.env.NEXT_PUBLIC_API_PORTAL_NOTICIAS;
  if (url) {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Erro na API! Status: ${res.status}`);
      }
      const data = await res.json();
      if (!Array.isArray(data)) {
        console.error("O dado recebido da API não é um array.", data);
        return;
      }
      const filter = data.reduce((cur, item) => {
        const imageUrl = item?._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
        const postTitle = item?.title?.rendered;
        const postId = item?.id;
        const chapeu = item?.acf?.chapeu;
        const categoria = item?._embedded?.["wp:term"]?.[0]?.[0]?.name;
        const description = item?.excerpt?.rendered;
        const url = item?.link?.split('/')?.[2]
        if (imageUrl && postTitle && postId) {
          cur.push({
            id: postId,
            title: postTitle,
            image: imageUrl,
            chapeu: chapeu?.length ? chapeu : categoria.length ? categoria : '',
            description: description,
            url: url,
          });
        } 
        return cur
      }, []);
      return filter as newsType[];
    } catch (error) {
      console.error("Falha ao buscar ou processar os dados:", error);
      return [] as newsType[];
    }
  } else {
    console.error(
      "A variável de ambiente NEXT_PUBLIC_API_PORTAL_NOTICIAS não foi definida."
    );
    return [] as newsType[];
  }
};
