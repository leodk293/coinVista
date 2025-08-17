"use client";
import React from "react";
import { LogOut } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { Button } from "./ui/button";

export default function LogoutButton() {
  const { data: session, status } = useSession();

  return (
    <div className={` flex flex-row gap-3 justify-center items-center`}>
      {session?.user?.image && (
        <div className="border border-gray-500 self-center rounded-full px-2 py-1 flex flex-row gap-2">
          <Image
            src={session?.user?.image}
            alt={session?.user?.name}
            width={32}
            height={32}
            title={session?.user?.name}
            className="self-center border border-gray-950/10 rounded-full object-cover"
          />
          <p className="text-black self-center dark:text-white">
            {session?.user?.name?.split(" ")[0]}
          </p>
        </div>
      )}

      <Button
        onClick={() => signOut()}
        className={
          "flex flex-row self-center cursor-pointer justify-center items-center gap-2"
        }
      >
        <p>Log Out</p>
        <LogOut className="w-4 h-4" />
      </Button>
    </div>
  );
}
