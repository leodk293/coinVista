import React from "react";
import Image from "next/image";
import { Sparkle } from "lucide-react";
import Link from "next/link";

export default function Logo() {
  return (
    <Link className=" self-center" href={"/"}>
      <div className=" flex flex-row gap-2">
        <p className=" text-2xl font-bold self-center">AI-IMAGE-CREATOR✨</p>
      </div>
    </Link>
  );
}
