import Image from "next/image";

export default function Loading() {
  return (
    <Image
      src="\loading\tube-spinner.svg"
      alt="Loading"
      width="30"
      height="30"
    />
  );
}
