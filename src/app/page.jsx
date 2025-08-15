"use client";
import React from "react";
import Image from "next/image";
import googleLogo from "../../public/google-logo.png";
import { signIn, useSession } from "next-auth/react";

const Home = () => {
  const { status, data: session } = useSession();

  async function handleSignin() {
    try {
      await signIn("google");
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <button
        onClick={handleSignin}
        className="flex cursor-pointer items-center w-1/2 justify-center gap-3 rounded-md bg-white px-4 py-3 text-gray-700 shadow-md hover:shadow-lg transition-all border border-gray-300"
      >
        <Image
          src={googleLogo}
          alt="Google"
          width={20}
          height={20}
          className="object-contain"
        />
        <span className="font-medium">Sign in with Google</span>
      </button>
    </div>
  );
};

export default Home;
