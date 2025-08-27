import { templateType } from "@/app/type";

export const emtempoTemplate: templateType = {
  feed_emtempo: [
    {
      id: 1,
      src: "/overlay/emtempo/feed_emtempo.png",
      styles: {
        chapeu: {
          div: {
            position: "absolute",
            top: "77.3%",
            left: "6%",
            whiteSpace: "nowrap",
            zIndex: 20,
            padding: "0px",
            width: "145px",
            height: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
          p: {
            fontFamily: "Montserrat, sans-serif",
            textTransform: "uppercase",
            marginTop: "0.125rem", // mt-0.5
            fontSize: "12px",
            color: "white",
            fontWeight: 700, // font-bold
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
          },
        },
        title: {
          div: {
            position: "absolute",
            top: "82%",
            left: "6%",
            zIndex: 20,
            padding: "0px",
            width: "92%",
            textAlign: "left",
          },
          h2: {
            fontWeight: 700, // font-bold
            fontFamily: "Montserrat, sans-serif",
            fontSize: "20px",
            lineHeight: "1.5rem", // leading-6
            color: "white",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
          },
        },
      },
    },
  ],
};