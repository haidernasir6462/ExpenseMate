import { SignIn } from "@clerk/nextjs";
import Image from 'next/image';
import login from '../../../../assets/login-image.jpg';

export default function Page() {
  return (
    <section className="h-full w-full py-12 md:py-24 lg:py-32">
      <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
        <Image
          src={login}
          width={600}
          height={500}
          alt="Hostel"
          className="mx-auto"
        />
        <div className="space-y-4">
          <div className="space-y-2">
            <SignIn />
          </div>
        </div>
      </div>
    </section>
  );
}
