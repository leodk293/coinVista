import React from "react";
import Image from "next/image";
import { Sparkle } from "lucide-react";
import Link from "next/link";

export default function Logo() {
  return (
    <Link className=" self-center" href={"/home"}>
      <div className=" flex flex-row gap-2">
        <p className=" text-2xl text-black font-bold self-center dark:text-white">
          AI-IMAGE-CREATOR✨
        </p>
      </div>
    </Link>
  );
}
