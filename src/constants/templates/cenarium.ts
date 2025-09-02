import { templateType } from "@/app/type";

export const cenariumTemplate: templateType = {
  feed: [
    {
      id: 1,
      src: "/overlay/cenarium/Cenarium_Feed-1080x1350_Template.png",
      styles: {
        chapeu: {
          div: {
            position: "absolute",
            top: "3%",
            left: "8%",
            zIndex: 20,
          },
          p: {
            fontFamily: "Inter, sans-serif",
            fontSize: "1.125rem",
            lineHeight: "1.75rem",
            color: "white",
            fontWeight: 900,
            textShadow: "2px 2px 10px #000, -2px -2px 10px #000, 2px -2px 10px #000, -2px 2px 10px #000",
            textTransform: 'uppercase',
          },
        },
        title: {
          div: {
            position: "absolute",
            top: "9%",
            left: "5%",
            zIndex: 20,
            width: "77%",
            borderLeft: "6px solid #5a0808",
            paddingLeft: "0.5rem",
          },
          h2: {
            fontFamily: "Inter, sans-serif",
            fontWeight: 700,
            fontSize: "24px",
            lineHeight: "28px",
            color: "white",
            textShadow: "2px 2px 10px #000, -2px -2px 10px #000, 2px -2px 10px #000, -2px 2px 10px #000",
          },
        },
      },
    },
  ],
  grupos: [
    {
      id: 2,
      src: "/overlay/cenarium/Cenarium_Grupos-1080x1080_Template.png",
      styles: {
        chapeu: {
          div: {
            position: "absolute",
            top: "3%",
            left: "8%",
            zIndex: 20,
          },
          p: {
            fontFamily: "Inter, sans-serif",
            textTransform: "uppercase",
            fontSize: "1.125rem",
            lineHeight: "1.75rem",
            color: "white",
            fontWeight: 900,
            textShadow: "2px 2px 10px #000, -2px -2px 10px #000, 2px -2px 10px #000, -2px 2px 10px #000",
          },
        },
        title: {
          div: {
            position: "absolute",
            top: "10%",
            left: "5%",
            zIndex: 20,
            width: "80%",
            borderLeft: "6px solid #5a0808",
            paddingLeft: "0.5rem",
            textAlign: "left",
          },
          h2: {
            fontFamily: "Inter, sans-serif",
            fontWeight: 700,
            fontSize: "24px",
            lineHeight: "28px",
            color: "white",
            textShadow: "2px 2px 10px #000, -2px -2px 10px #000, 2px -2px 10px #000, -2px 2px 10px #000",
          },
        },
      },
    },
  ],
  storys: [
    {
      id: 3,
      src: "/overlay/cenarium/Cenarium_Stories-1080x1920_Template.png",
      styles: {
        chapeu: {
          div: {
            position: "absolute",
            top: "73.5%",
            left: "50%",
            transform: "translateX(-50%)",
            whiteSpace: "nowrap",
            zIndex: 20,
            backgroundColor: "#5a0808",
            padding: "0 0.75rem",
            borderBottomRightRadius: "0.5rem",
            borderTopLeftRadius: "0.5rem",
          },
          p: {
            fontFamily: "Inter, sans-serif",
            fontSize: "1.125rem",
            lineHeight: "1.75rem",
            color: "white",
            fontWeight: 900,
          },
        },
        title: {
          div: {
            position: "absolute",
            top: "79%",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 20,
            width: "70%",
            textAlign: "center",
          },
          h2: {
            fontFamily: "Inter, sans-serif",
            fontWeight: 700,
            fontSize: "16px",
            lineHeight: "1.25rem",
            color: "white",
            textShadow: "2px 2px 10px #000, -2px -2px 10px #000, 2px -2px 10px #000, -2px 2px 10px #000",
          },
        },
      },
    },
  ],
  reels: [
    {
      id: 4,
      src: "/overlay/cenarium/Cenarium_Reels-Thubmnail-1080x1920_Template.png",
      styles: {
        chapeu: {
          div: {
            position: "absolute",
            top: "73.5%",
            left: "50%",
            transform: "translateX(-50%)",
            whiteSpace: "nowrap",
            zIndex: 20,
            backgroundColor: "#5a0808",
            padding: "0 0.75rem",
            borderBottomRightRadius: "0.5rem",
            borderTopLeftRadius: "0.5rem",
          },
          p: {
            fontFamily: "Inter, sans-serif",
            fontSize: "1.125rem",
            lineHeight: "1.75rem",
            color: "white",
            fontWeight: 900,
            textShadow: "2px 2px 10px #000, -2px -2px 10px #000, 2px -2px 10px #000, -2px 2px 10px #000",
          },
        },
        title: {
          div: {
            position: "absolute",
            top: "79%",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 20,
            width: "70%",
            textAlign: "center",
          },
          h2: {
            fontFamily: "Inter, sans-serif",
            fontWeight: 700,
            fontSize: "16px",
            lineHeight: "1.25rem",
            color: "white",
            textShadow: "2px 2px 10px #000, -2px -2px 10px #000, 2px -2px 10px #000, -2px 2px 10px #000",
          },
        },
      },
    },
  ],
};
