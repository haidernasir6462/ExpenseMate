import Image from "next/image";
import Link from "next/link";

export default function HeaderLogo() {
  return (
    <Link href="/" className="flex items-center justify-center gap-x-4">
      <Image src="/logo.svg" alt="logo"  width={28} height={28} className="text-white"/>
      <h1 className="text-white text-2xl font-semibold">ExpenseMate</h1>
    </Link>
  );
}
