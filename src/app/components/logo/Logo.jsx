import React from "react";
import Image from "next/image";
import logo from "./ai-image-generator.jpeg";

export default function Logo() {
  return (
    <div className=" flex flex-row gap-2">
      <p className=" text-2xl font-bold self-center">AI-IMAGE-CREATOR</p>
      {/* <Image
        className=" self-center rounded-[50%] object-cover"
        src={logo}
        alt="AI-Image-Generator"
        width={50}
        height={50}
      /> */}
    </div>
  );
}
