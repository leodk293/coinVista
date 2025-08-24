import React from "react";
import Link from "next/link";
import { Monoton } from "next/font/google";

const monoton = Monoton({ subsets: ["latin"], weight: "400" });

export default function Logo() {
  return (
    <Link className={` text-2xl ${monoton.className} font-bold dark:text-white md:text-4xl`} href={`/`}>
      <h1>CoinVista🪙</h1>
    </Link>
  );
}
