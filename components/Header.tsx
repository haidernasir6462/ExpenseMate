import { UserButton } from "@clerk/nextjs";
import HeaderLogo from "@/components/HeaderLogo";
import Navigation from "@/components/Navigation";
export default function Header() {
  return (
    <header className="bg-gradient-to-b from-blue-600 to-blue-400 px-4 lg:px-14 py-8 pb-36">
      <div className="max-w-screen-2xl mx-auto">
        <div className="w-full flex items-center justify-between">
          <div className="hidden lg:flex itemsc-center justify-center gap-x-16">
            <HeaderLogo />
            <Navigation />
          </div>
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </header>
  );
}
