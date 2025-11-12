import Link from "next/link";

export default function Footer() {
  return (
    <footer className="text-xs text-muted-foreground min-h-16 flex items-center justify-center">
      <p>
        © {new Date().getFullYear()} | Um produto{" "}
        <Link
          className="underline hover:text-yellow-500 duration-300 transition-all ease-in-out"
          href="https://clickmulti.com.br/"
          target="_blank"
        >
          Click Multiplataforma
        </Link>
      </p>
    </footer>
  );
}
