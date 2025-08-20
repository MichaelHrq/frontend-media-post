import Image from "next/image";

type PropsType = {
  variant?: "black" | "white";
} & Omit<React.ComponentProps<typeof Image>, "src" | "alt">;

export default function Loading({
  variant = "white",
  height = 30,
  width = 30,
  ...rest
}: PropsType) {
  return (
    <Image
      src={`/loading/spinner-${variant}.svg`}
      alt="Loading"
      width={width}
      height={height}
      {...rest}
    />
  );
}