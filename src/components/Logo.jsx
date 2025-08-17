import React from "react";
import Link from "next/link";

export default function Logo() {
  return (
    <Link className={` text-2xl font-bold dark:text-white md:text-4xl`} href={`/`}>
      <h1>CoinVista🪙</h1>
    </Link>
  );
}
