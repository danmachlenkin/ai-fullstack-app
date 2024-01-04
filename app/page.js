import Link from "next/link";
import { currentUser } from "@clerk/nextjs";

export default async function Home() {
  let href;
  const user = await currentUser();

  {
    user ? (href = "/jurnal") : (href = "/new-user");
  }

  return (
    <div className="w-screen h-screen flex justify-center bg-black text-white items-center">
      <div className="w-full max-w-[600px] mx-auto">
        <h1 className="text-6xl mb-4">Your Jurnal App, period.</h1>
        <p className="text-2xl text-white/60 mb-4">
          The best jurnal app you'll ever need in order to document your jurnal
          thoughts and life.
        </p>
        <div>
          <Link href={href}>
            <button className="bg-blue-600 px-4 py-2 rounded-lg text-xl">
              get started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
