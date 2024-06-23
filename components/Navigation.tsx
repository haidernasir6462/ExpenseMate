"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useMedia } from "react-use";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useState } from "react";
import { Menu } from "lucide-react";

interface LinkItem {
  href: string;
  label: string;
}

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useMedia("(max-width: 1024px)", false);
  const onClick = (href: string) => {
    router.push(href);
    setOpen(false);
  };

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
  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <Button
            variant="outline"
            size="sm"
            className="font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition"
          >
            <Menu className="size-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="px-2">
          <nav className="flex flex-col gap-y-2 pt-6">
            {links.map((link) => (
              <Button
                key={link.href}
                className="flex w-full justify-start"
                variant={pathname === link.href ? "secondary" : "ghost"}
                onClick={() => onClick(link.href)}
              >
                {link.label}
              </Button>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    );
  }

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
