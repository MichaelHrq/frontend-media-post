import { templateType } from "@/app/type";

export const cenariumTemplate: templateType = {
  feed: [
    {
      id: 101,
      src: "/overlay/cenarium/feed/cenarium_feed_default.png",
      styles: {
        chapeu: {
          div: "absolute top-[74.5%] left-1/2 -translate-x-1/2 whitespace-nowrap z-20 bg-[#5a0808] px-3 rounded-br-lg rounded-tl-lg",

          p: "font-inter text-lg leading-7 text-white font-black uppercase",
        },

        title: {
          div: "absolute top-[80%] left-1/2 -translate-x-1/2 z-20 w-[90%] text-center",

          h2: "font-inter font-bold text-[22px] leading-[28px] text-white [text-shadow:2px_2px_10px_#000,-2px_-2px_10px_#000,2px_-2px_10px_#000,-2px_2px_10px_#000]",
        },
      },
    },
    {
      id: 102,
      src: "/overlay/cenarium/feed/cenarium_feed_especial.png",
      styles: {
        chapeu: {
          div: "absolute top-[64%] left-[5%] whitespace-nowrap z-20 bg-[#5a0808] px-3 rounded-br-lg rounded-tl-lg",
          p: "font-inter text-xl leading-7 text-white font-black uppercase",
        },

        title: {
          div: "absolute top-[70%] left-[5%] z-20 w-[93%] text-start flex flex-col gap-1",
          h2: "font-inter font-bold text-[24px] leading-[29px] text-white [text-shadow:2px_2px_10px_rgb(0,0,0),-2px_-2px_10px_rgb(0,0,0),2px_-2px_10px_rgb(0,0,0),-2px_2px_10px_rgb(0,0,0)]",
        },
        description: {
          p: "text-xs text-white font-inter font-semibold [text-shadow:2px_2px_10px_#000,-2px_-2px_10px_#000,2px_-2px_10px_#000,-2px_2px_10px_#000]",
        },
        url: {
          p: "text-xs absolute z-20 bottom-5 left-[5%] text-white font-inter font-bold [text-shadow:2px_2px_10px_#000,-2px_-2px_10px_#000,2px_-2px_10px_#000,-2px_2px_10px_#000] after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-20 after:h-[3px] after:bg-[#5a0808]",
        },
      },
    },
    {
      id: 103,
      src: "/overlay/cenarium/feed/cenarium_feed_brasilia.png",
      styles: {
        chapeu: {
          div: "absolute top-[74.5%] left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#5a0808] z-20 px-3 rounded-br-lg rounded-tl-lg",
          p: "font-inter text-lg leading-7 text-white font-black uppercase",
        },
        title: {
          div: "absolute top-[80%] left-1/2 -translate-x-1/2 z-20 w-[90%] text-center",
          h2: "font-inter font-bold text-[24px] leading-[24px] text-white [text-shadow:2px_2px_10px_#000,-2px_-2px_10px_#000,2px_-2px_10px_#000,-2px_2px_10px_#000]",
        },
      },
    },
  ],
  grupos: [
    {
      id: 201,
      src: "/overlay/cenarium/grupo/cenarium_grupo_default.png",
      styles: {
        chapeu: {
          div: "absolute top-[74.5%] left-1/2 -translate-x-1/2 whitespace-nowrap z-20 bg-[#5a0808] px-3 rounded-br-lg rounded-tl-lg",
          p: "font-inter text-lg leading-7 text-white font-black uppercase",
        },
        title: {
          div: "absolute top-[80%] left-1/2 -translate-x-1/2 z-20 w-[90%] text-center",
          h2: "font-inter font-bold text-[22px] leading-[28px] text-white [text-shadow:2px_2px_10px_#000,-2px_-2px_10px_#000,2px_-2px_10px_#000,-2px_2px_10px_#000]",
        },
      },
    },
    {
      id: 202,
      src: "/overlay/cenarium/grupo/cenarium_grupo_especial.png",
      styles: {
        chapeu: {
          div: "absolute top-[64%] left-[5%] whitespace-nowrap z-20 bg-[#5a0808] px-3 rounded-br-lg rounded-tl-lg",
          p: "font-inter text-xl leading-7 text-white font-black uppercase",
        },

        title: {
          div: "absolute top-[70%] left-[5%] z-20 w-[93%] text-start flex flex-col gap-1",
          h2: "font-inter font-extrabold text-[24px] leading-[29px] text-white [text-shadow:2px_2px_10px_rgb(0,0,0),-2px_-2px_10px_rgb(0,0,0),2px_-2px_10px_rgb(0,0,0),-2px_2px_10px_rgb(0,0,0)]",
        },
        description: {
          p: "text-xs text-white font-inter font-semibold [text-shadow:2px_2px_10px_#000,-2px_-2px_10px_#000,2px_-2px_10px_#000,-2px_2px_10px_#000]",
        },
        url: {
          p: "text-xs absolute z-20 bottom-5 left-[5%] text-white font-inter font-extrabold [text-shadow:2px_2px_10px_#000,-2px_-2px_10px_#000,2px_-2px_10px_#000,-2px_2px_10px_#000] after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-20 after:h-[3px] after:bg-[#5a0808]",
        },
      },
    },
    {
      id: 203,
      src: "/overlay/cenarium/grupo/cenarium_grupo_brasilia.png",
      styles: {
        chapeu: {
          div: "absolute top-[74.5%] left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#5a0808] z-20 px-3 rounded-br-lg rounded-tl-lg",
          p: "font-inter text-[20px] leading-7 text-white font-black uppercase",
        },
        title: {
          div: "absolute top-[80%] left-1/2 -translate-x-1/2 z-20 w-[90%] text-center",
          h2: "font-inter font-extrabold text-[26px] leading-[26px] text-white [text-shadow:2px_2px_10px_#000,-2px_-2px_10px_#000,2px_-2px_10px_#000,-2px_2px_10px_#000]",
        },
      },
    },
  ],
  storys: [
    {
      id: 301,
      src: "/overlay/cenarium/story/cenarium_story_default.png",
      styles: {
        chapeu: {
          div: "absolute top-[73.5%] left-1/2 -translate-x-1/2 whitespace-nowrap z-20 bg-[#5a0808] px-3 rounded-br-lg rounded-tl-lg",
          p: "font-inter text-lg leading-7 text-white font-black",
        },
        title: {
          div: "absolute top-[79%] left-1/2 -translate-x-1/2 z-20 w-[70%] text-center",
          h2: "font-inter font-bold text-base leading-5 text-white [text-shadow:2px_2px_10px_#000,-2px_-2px_10px_#000,2px_-2px_10px_#000,-2px_2px_10px_#000]",
        },
      },
    },
    {
      id: 302,
      src: "/overlay/cenarium/story/cenarium_story_especial.png",
      styles: {
        chapeu: {
          div: "absolute top-[73.5%] left-1/2 -translate-x-1/2 whitespace-nowrap z-20 bg-[#5a0808] px-3 rounded-br-lg rounded-tl-lg",
          p: "font-inter text-lg leading-7 text-white font-black",
        },
        title: {
          div: "absolute top-[79%] left-1/2 -translate-x-1/2 z-20 w-[70%] text-center",
          h2: "font-inter font-extrabold text-base leading-5 text-white [text-shadow:2px_2px_10px_#000,-2px_-2px_10px_#000,2px_-2px_10px_#000,-2px_2px_10px_#000]",
        },
        url: {
          p: "text-[10px] absolute z-20 bottom-5 left-1/2 -translate-x-1/2 text-white font-inter font-extrabold [text-shadow:2px_2px_10px_#000,-2px_-2px_10px_#000,2px_-2px_10px_#000,-2px_2px_10px_#000] after:content-[''] after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-20 after:h-[3px] after:bg-[#5a0808]",
        },
      },
    },
    {
      id: 303,
      src: "/overlay/cenarium/story/cenarium_story_brasilia.png",
      styles: {
        chapeu: {
          div: "absolute top-[73.5%] left-1/2 -translate-x-1/2 whitespace-nowrap z-20 bg-[#5a0808] px-3 rounded-br-lg rounded-tl-lg",
          p: "font-inter text-lg leading-7 text-white font-black",
        },
        title: {
          div: "absolute top-[79%] left-1/2 -translate-x-1/2 z-20 w-[70%] text-center",
          h2: "font-inter font-extrabold text-base leading-5 text-white [text-shadow:2px_2px_10px_#000,-2px_-2px_10px_#000,2px_-2px_10px_#000,-2px_2px_10px_#000]",
        },
      },
    },
  ],
};