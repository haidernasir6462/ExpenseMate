import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import HeaderLogo from "@/components/HeaderLogo";
import Navigation from "@/components/Navigation";
import { Loader2 } from "lucide-react";
export default function Header() {
  return (
    <header className="bg-gradient-to-b from-blue-600 to-blue-400 px-4 lg:px-14 py-8 pb-36">
      <div className="max-w-screen-2xl mx-auto">
        <div className="w-full flex items-center justify-between">
          <div className="flex itemsc-center justify-center gap-x-16">
            <HeaderLogo />
            <Navigation />
          </div>
          <ClerkLoaded>
            <UserButton afterSignOutUrl="/" />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className="animate-spin text-white" />
          </ClerkLoading>
        </div>
        <h1 className="lg:pl-8 pt-8 text-white text-xl lg:text-4xl">
          Welcome Back 
        </h1>
      </div>
    </header>
  );
}
