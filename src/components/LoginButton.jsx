"use client";
import React from "react";
import { signIn } from "next-auth/react";
import googleLogo from "../../public/google-logo.png";
import { Button } from "./ui/button";
import Image from "next/image";

export default function LoginButton() {
  return (
    <Button
      onClick={() => signIn("google")}
      className={` cursor-pointer flex flex-row justify-center items-center gap-2`}
    >
      <Image
        width={30}
        height={30}
        src={googleLogo}
        className=" object-cover"
        alt="Google Logo"
      />
      <p>Log in</p>
    </Button>
  );
}
