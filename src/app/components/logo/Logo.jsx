import React from "react";
import Image from "next/image";
import logo from "./ai-image-generator.jpeg";
import { Sparkle } from "lucide-react";
import Link from "next/link";

export default function Logo() {
  return (
    <Link className=" self-center" href={"/"}>
      <div className=" flex flex-row gap-2">
        <p className=" text-2xl font-bold self-center">AI-IMAGE-CREATOR</p>
        <Sparkle
          className=" self-center"
          strokeWidth={2.5}
          size={32}
          color="#000000"
        />
        {/* <Image
        className=" self-center rounded-[50%] object-cover"
        src={logo}
        alt="AI-Image-Generator"
        width={50}
        height={50}
      /> */}
      </div>
    </Link>
  );
}
