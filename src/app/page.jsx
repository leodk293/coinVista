"use client";
import React from "react";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";

const Home = () => {
  const { status, data: session } = useSession();

  return (
    <div className="flex flex-col items-center">
      <p>CoinVista</p>
    </div>
  );
};

export default Home;
