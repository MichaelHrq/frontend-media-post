import { templateType } from "@/app/type";

export const cenariumTemplate: templateType = {
  feed: [
    {
      id: 101,
      src: "/overlay/cenarium/feed/cenarium_feed_default.png",
      name: 'Padrão',
      components: [
        {
          id: "chapeu-container",
          element: "div",
          editable: false,
          className:
            "absolute top-[74.5%] left-1/2 -translate-x-1/2 whitespace-nowrap z-20 bg-[#5a0808] px-3 rounded-br-lg rounded-tl-lg",
          children: [
            {
              id: "chapeu-text",
              element: "p",
              className:
                "font-inter text-lg leading-7 text-white font-black uppercase",
              editable: true,
              children: [],
            },
          ],
        },
        {
          id: "title-container",
          element: "div",
          editable: false,
          className:
            "absolute top-[80%] left-1/2 -translate-x-1/2 z-20 w-[90%] text-center",
          children: [
            {
              id: "title-text",
              element: "h2",
              editable: true,
              className:
                "font-inter font-bold text-[22px] leading-[28px] text-white [text-shadow:2px_2px_10px_#000,-2px_-2px_10px_#000,2px_-2px_10px_#000,-2px_2px_10px_#000]",
              children: [],
            },
          ],
        },
      ],
    },
    {
      id: 102,
      src: "/overlay/cenarium/feed/cenarium_feed_especial.png",
      name: 'Especial',
      components: [
        {
          id: "chapeu-container",
          element: "div",
          editable: false,
          className:
            "absolute top-[64%] left-[5%] whitespace-nowrap z-20 bg-[#5a0808] px-3 rounded-br-lg rounded-tl-lg",
          children: [
            {
              id: "chapeu-text",
              element: "p",
              editable: true,
              className:
                "font-inter text-xl leading-7 text-white font-black uppercase",
              children: [],
            },
          ],
        },
        {
          id: "title-container",
          element: "div",
          editable: false,
          className:
            "absolute top-[70%] left-[5%] z-20 w-[93%] text-start flex flex-col gap-1.5",
          children: [
            {
              id: "title-text",
              element: "h2",
              editable: true,
              className:
                "font-inter font-bold text-[24px] leading-[29px] text-white [text-shadow:2px_2px_10px_rgb(0,0,0),-2px_-2px_10px_rgb(0,0,0),2px_-2px_10px_rgb(0,0,0),-2px_2px_10px_rgb(0,0,0)]",
              children: [],
            },
            {
              id: "description-text",
              element: "p",
              editable: true,
              className:
                "text-xs text-white font-inter font-semibold [text-shadow:2px_2px_10px_#000,-2px_-2px_10px_#000,2px_-2px_10px_#000,-2px_2px_10px_#000]",
              children: [],
            },
            {
              id: "url-text",
              element: "p",
              editable: false,
              className:
                "text-xs z-20 text-white font-inter font-bold [text-shadow:2px_2px_10px_#000,-2px_-2px_10px_#000,2px_-2px_10px_#000,-2px_2px_10px_#000] after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-20 after:h-[3px] after:bg-[#5a0808]",
              children: [],
            },
          ],
        },
      ],
    },
    {
      id: 103,
      src: "/overlay/cenarium/feed/cenarium_feed_brasilia.png",
      name: 'Brasilia',
      components: [
        {
          id: "chapeu-container",
          element: "div",
          editable: false,
          className:
            "absolute top-[74.5%] left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#5a0808] z-20 px-3 rounded-br-lg rounded-tl-lg",
          children: [
            {
              id: "chapeu-text",
              element: "p",
              className:
                "font-inter text-lg leading-7 text-white font-black uppercase",
              editable: true,
              children: [],
            },
          ],
        },
        {
          id: "title-container",
          element: "div",
          editable: false,
          className:
            "absolute top-[80%] left-1/2 -translate-x-1/2 z-20 w-[90%] text-center",
          children: [
            {
              id: "title-text",
              element: "p",
              editable: true,
              className:
                "font-inter font-bold text-[24px] leading-[24px] text-white [text-shadow:2px_2px_10px_#000,-2px_-2px_10px_#000,2px_-2px_10px_#000,-2px_2px_10px_#000]",
              children: [],
            },
          ],
        },
      ],
    },
  ],
  grupos: [
    {
      id: 201,
      src: "/overlay/cenarium/grupo/cenarium_grupo_default.png",
      name: 'Padrão',
      components: [
        {
          id: "chapeu-container",
          element: "div",
          editable: false,
          className:
            "absolute top-[74.5%] left-1/2 -translate-x-1/2 whitespace-nowrap z-20 bg-[#5a0808] px-3 rounded-br-lg rounded-tl-lg",
          children: [
            {
              id: "chapeu-text",
              element: "p",
              className:
                "font-inter text-lg leading-7 text-white font-black uppercase",
              editable: true,
              children: [],
            },
          ],
        },
        {
          id: "title-container",
          element: "div",
          editable: false,
          className:
            "absolute top-[80%] left-1/2 -translate-x-1/2 z-20 w-[90%] text-center",
          children: [
            {
              id: "title-text",
              element: "h2",
              editable: true,
              className:
                "font-inter font-bold text-[22px] leading-[28px] text-white [text-shadow:2px_2px_10px_#000,-2px_-2px_10px_#000,2px_-2px_10px_#000,-2px_2px_10px_#000]",
              children: [],
            },
          ],
        },
      ],
    },
    {
      id: 202,
      src: "/overlay/cenarium/grupo/cenarium_grupo_especial.png",
      name: 'Especial',
      components: [
        {
          id: "chapeu-container",
          element: "div",
          editable: false,
          className:
            "absolute top-[64%] left-[5%] whitespace-nowrap z-20 bg-[#5a0808] px-3 rounded-br-lg rounded-tl-lg",
          children: [
            {
              id: "chapeu-text",
              element: "p",
              editable: true,
              className:
                "font-inter text-xl leading-7 text-white font-black uppercase",
              children: [],
            },
          ],
        },
        {
          id: "title-container",
          element: "div",
          editable: false,
          className:
            "absolute top-[70%] left-[5%] z-20 w-[93%] text-start flex flex-col gap-1.5",
          children: [
            {
              id: "title-text",
              element: "h2",
              editable: true,
              className:
                "font-inter font-extrabold text-[24px] leading-[29px] text-white [text-shadow:2px_2px_10px_rgb(0,0,0),-2px_-2px_10px_rgb(0,0,0),2px_-2px_10px_rgb(0,0,0),-2px_2px_10px_rgb(0,0,0)]",
              children: [],
            },
            {
              id: "description-text",
              element: "p",
              editable: true,
              className:
                "text-xs text-white font-inter font-semibold [text-shadow:2px_2px_10px_#000,-2px_-2px_10px_#000,2px_-2px_10px_#000,-2px_2px_10px_#000]",
              children: [],
            },
            {
              id: "url-text",
              element: "p",
              editable: false,
              className:
                "text-xs text-white font-inter font-extrabold [text-shadow:2px_2px_10px_#000,-2px_-2px_10px_#000,2px_-2px_10px_#000,-2px_2px_10px_#000] after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-20 after:h-[3px] after:bg-[#5a0808]",
              children: [],
            },
          ],
        },
      ],
    },
    {
      id: 203,
      src: "/overlay/cenarium/grupo/cenarium_grupo_brasilia.png",
      name: 'Brasilia',
      components: [
        {
          id: "chapeu-container",
          element: "div",
          editable: false,
          className:
            "absolute top-[74.5%] left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#5a0808] z-20 px-3 rounded-br-lg rounded-tl-lg",
          children: [
            {
              id: "chapeu-text",
              element: "p",
              className:
                "font-inter text-[20px] leading-7 text-white font-black uppercase",
              editable: true,
              children: [],
            },
          ],
        },
        {
          id: "title-container",
          element: "div",
          editable: false,
          className:
            "absolute top-[80%] left-1/2 -translate-x-1/2 z-20 w-[90%] text-center",
          children: [
            {
              id: "title-text",
              element: "h2",
              editable: true,
              className:
                "font-inter font-extrabold text-[26px] leading-[26px] text-white [text-shadow:2px_2px_10px_#000,-2px_-2px_10px_#000,2px_-2px_10px_#000,-2px_2px_10px_#000]",
              children: [],
            },
          ],
        },
      ],
    },
  ],
  storys: [
    {
      id: 301,
      src: "/overlay/cenarium/story/cenarium_story_default.png",
      name: 'Padrão',
      components: [
        {
          id: "chapeu-container",
          element: "div",
          editable: false,
          className:
            "absolute top-[73.5%] left-1/2 -translate-x-1/2 whitespace-nowrap z-20 bg-[#5a0808] px-3 rounded-br-lg rounded-tl-lg",
          children: [
            {
              id: "chapeu-text",
              element: "p",
              className: "font-inter text-lg leading-7 text-white font-black",
              editable: true,
              children: [],
            },
          ],
        },
        {
          id: "title-container",
          element: "div",
          editable: false,
          className:
            "absolute top-[79%] left-1/2 -translate-x-1/2 z-20 w-[70%] text-center",
          children: [
            {
              id: "title-text",
              element: "h2",
              editable: true,
              className:
                "font-inter font-bold text-base leading-5 text-white [text-shadow:2px_2px_10px_#000,-2px_-2px_10px_#000,2px_-2px_10px_#000,-2px_2px_10px_#000]",
              children: [],
            },
          ],
        },
      ],
    },
    {
      id: 302,
      src: "/overlay/cenarium/story/cenarium_story_especial.png",
      name: 'Especial',
      components: [
        {
          id: "chapeu-container",
          element: "div",
          editable: false,
          className:
            "absolute top-[73.5%] left-1/2 -translate-x-1/2 whitespace-nowrap z-20 bg-[#5a0808] px-3 rounded-br-lg rounded-tl-lg",
          children: [
            {
              id: "chapeu-text",
              element: "p",
              className: "font-inter text-lg leading-7 text-white font-black",
              editable: true,
              children: [],
            },
          ],
        },
        {
          id: "title-container",
          element: "div",
          editable: false,
          className:
            "absolute top-[79%] left-1/2 -translate-x-1/2 z-20 w-[70%] text-center flex flex-col gap-1.5",
          children: [
            {
              id: "title-text",
              element: "h2",
              editable: true,
              className:
                "font-inter font-extrabold text-base leading-5 text-white [text-shadow:2px_2px_10px_#000,-2px_-2px_10px_#000,2px_-2px_10px_#000,-2px_2px_10px_#000]",
              children: [],
            },
            {
              id: "url-text",
              element: "p",
              editable: false,
              className:
                "text-[10px] text-white font-inter font-extrabold [text-shadow:2px_2px_10px_#000,-2px_-2px_10px_#000,2px_-2px_10px_#000,-2px_2px_10px_#000] after:content-[''] after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-20 after:h-[3px] after:bg-[#5a0808]",
              children: [],
            },
          ],
        },
      ],
    },
    {
      id: 303,
      src: "/overlay/cenarium/story/cenarium_story_brasilia.png",
      name: 'Brasilia',
      components: [
        {
          id: "chapeu-container",
          element: "div",
          editable: false,
          className:
            "absolute top-[73.5%] left-1/2 -translate-x-1/2 whitespace-nowrap z-20 bg-[#5a0808] px-3 rounded-br-lg rounded-tl-lg",
          children: [
            {
              id: "chapeu-text",
              element: "p",
              className: "font-inter text-lg leading-7 text-white font-black",
              editable: true,
              children: [],
            },
          ],
        },
        {
          id: "title-container",
          element: "div",
          editable: false,
          className:
            "absolute top-[79%] left-1/2 -translate-x-1/2 z-20 w-[70%] text-center",
          children: [
            {
              id: "title-text",
              element: "h2",
              editable: true,
              className:
                "font-inter font-extrabold text-base leading-5 text-white [text-shadow:2px_2px_10px_#000,-2px_-2px_10px_#000,2px_-2px_10px_#000,-2px_2px_10px_#000]",
              children: [],
            },
          ],
        },
      ],
    },
  ],
};
