import { ClerkLoaded, ClerkLoading, SignIn } from "@clerk/nextjs";
import Image from "next/image";
import { Loader2 } from "lucide-react";
export default function Page() {
  return (
    <section className="h-full w-full py-12 md:py-24 lg:py-32">
      <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
        <Image
          src="/login-image.jpg"
          width={600}
          height={500}
          alt="login"
          className="mx-auto"
        />
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-center flex-col gap-2">
              <h1 className=" font-bold text-[1.2625rem] leading-6">
                Welcome Back
              </h1>
              <ClerkLoaded>
                <SignIn />
              </ClerkLoaded>
              <ClerkLoading>
                <Loader2 className="animate-spin"/>
              </ClerkLoading>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
