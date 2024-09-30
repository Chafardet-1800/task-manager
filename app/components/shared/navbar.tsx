"use client";

import { UserButton, useSession } from "@clerk/nextjs";
import Link from "next/link";
import { PiKanban } from "react-icons/pi";

const Navbar = () => {
  const { isSignedIn } = useSession();

  return (
    <div className="bg-transparent fixed top-0 flex justify-between w-[100%] mx-auto p-5">
      <Link
        href="/"
        className="flex items-center gap-1 text-2xl font-bold uppercase"
      >
        <h1>Task Manager</h1>
        <PiKanban />
      </Link>

      <div className="flex items-center gap-2">
        <UserButton />

        <span className="uppercase">Cambiar tema</span>
      </div>

      {!isSignedIn && (
        <div className="flex items-center gap-2">
          Ya tienes una cuenta? <Link href="/sign-in">Iniciar sesión</Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
