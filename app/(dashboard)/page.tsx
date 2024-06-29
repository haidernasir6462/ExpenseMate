import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return <div>Dashboard</div>;
}

// import { neon } from '@neondatabase/serverless';

// async function getData() {
//   const sql = neon(process.env.DATABASE_URL!);
//   const response = await sql`SELECT version()`;
//   return response[0].version;
// }

// export default async function Page() {
//   const data = await getData();
//   return <>{data}</>;
// }