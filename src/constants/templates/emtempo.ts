import { templateType } from "@/app/type";

export const emtempoTemplate: templateType = {
  feed_emtempo: [
    {
      id: 1,
      name: "Padrão",
      src: "/overlay/emtempo/feed_emtempo.png",
      components: [
        {
          id: "chapeu-container",
          element: "div",
          editable: false,
          className:
            "absolute top-[77.3%] left-[6%] z-20 flex h-[20px] w-[145px] items-center justify-center whitespace-nowrap p-0",
          children: [
            {
              id: "chapeu-text",
              element: "p",
              editable: true,
              className:
                "font-montserrat mt-0.5 text-xs font-bold uppercase text-white [text-shadow:2px_2px_4px_rgba(0,0,0,0.5)]",
              children: [],
            },
          ],
        },
        {
          id: "title-container",
          element: "div",
          editable: false,
          className: "absolute left-[6%] top-[82%] z-20 w-[92%] p-0 text-left",
          children: [
            {
              id: "title-text",
              element: "h2",
              editable: true,
              className:
                "font-montserrat text-xl font-bold leading-6 text-white [text-shadow:2px_2px_4px_rgba(0,0,0,0.5)]",
              children: [],
            },
          ],
        },
      ],
    },
  ],
};