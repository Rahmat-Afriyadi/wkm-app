import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Beranda() {
  const session = await getServerSession(authOptions);


  return (
    <main className="h-full min-h-screen p-5">
      <div className="text-2xl">Selamat Datang {session?.user.name}</div>
    </main>
  )
}