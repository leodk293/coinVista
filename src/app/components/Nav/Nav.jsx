"use client";
import React from "react";
import { useSession, signOut } from "next-auth/react";
import Logo from "../logo/Logo";
import Link from "next/link";
import Image from "next/image";
import { LogOut } from "lucide-react";
import { Linkedin, Facebook } from "lucide-react";
import { BsTwitterX } from "react-icons/bs";

export default function Nav() {
  async function handleSignOut() {
    await signOut({
      callbackUrl: "/signin",
    });
  }
  const { status, data: session } = useSession();
  return (
    <nav className=" border border-transparent py-4 w-full bg-white shadow flex flex-wrap justify-evenly gap-10 md:gap-0">
      <Logo />

      {/* <Link className="self-center" href={"/"}>
        Contact Us
      </Link> */}
      <nav className=" self-center font-semibold text-xl flex flex-row gap-5">
        <Link
          className=" border border-transparent p-2 bg-[#0077B5] rounded-[5px]"
          href={"/"}
        >
          <Linkedin size={28} color="#ffffff" />
        </Link>
        <Link
          className=" border border-transparent p-2 bg-[#1877F2] rounded-[5px]"
          href={"/"}
        >
          <Facebook size={28} color="#ffffff" />
        </Link>
        <Link
          className=" text-white text-2xl border border-transparent p-2 bg-black rounded-[5px]"
          href={"/"}
        >
          <BsTwitterX size={28} />
        </Link>
      </nav>

      <div className=" self-center flex flex-wrap justify-center gap-3">
        <div className=" border border-gray-300 rounded-[50px] px-5 py-2 flex flex-row gap-1">
          {session?.user?.image ? (
            <Image
              width={30}
              height={30}
              src={session?.user?.image}
              alt={session?.user?.name}
              className=" self-center rounded-[50%]"
            />
          ) : (
            <p>Loading...</p>
          )}
          <p className=" self-center">{session?.user?.name}</p>
        </div>

        <button
          onClick={handleSignOut}
          className=" border border-transparent cursor-pointer rounded-[50px] px-5 py-2 bg-blue-900 text-white flex flex-row gap-2 hover:bg-blue-800"
        >
          <LogOut size={28} color="#ffffff" />
          <p className=" self-center">Signout </p>
        </button>
      </div>
    </nav>
  );
}
