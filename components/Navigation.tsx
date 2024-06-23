"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

interface LinkItem {
  href: string;
  label: string;
}

export default function Navigation() {
  const pathname = usePathname();
  const links: LinkItem[] = [
    {
      href: "/",
      label: "Dashboard",
    },
    {
      href: "/transactions",
      label: "Transactions",
    },
    {
      href: "/accounts",
      label: "Accounts",
    },
    {
      href: "/categories",
      label: "Categories",
    },
    {
      href: "/setting",
      label: "Setting",
    },
  ];

  return (
    <div className="flex items-center justify-center gap-x-4">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`text-white text-md ${
            pathname === link.href ? "text-white" : "text-white"
          }`}
        >
          <Button
            className={`w-full lg:w-auto justify-between font-normal hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white
          focus:bg-white/30 transition ${
            pathname === link.href ? "bg-white/10" : "bg-transparent"
          }`}
          >
            {link.label}
          </Button>
        </Link>
      ))}
    </div>
  );
}
