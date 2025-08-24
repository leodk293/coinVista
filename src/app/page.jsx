"use client";
import React from "react";
import { TrendingUp } from "lucide-react";
import { useCurrency } from "../../CurrencyContext";
import CryptoList from "@/components/CryptoList";
import Link from "next/link";

const Home = () => {
  const { currency, getCurrencySymbol } = useCurrency();

  return (
    <div className=" mx-auto ">
      <section className="text-center w-full mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium mb-6">
          <TrendingUp className="h-4 w-4" />
          Real-time Market Data
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent mb-6">
          Welcome to CoinVista
        </h1>

        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Track real-time cryptocurrency prices, market trends, and insights,
          all in one beautifully designed platform.
        </p>
      </section>

      <CryptoList
        length={50}
        currency={currency}
        symbol={getCurrencySymbol()}
      />

      <Link href={`/crypto-list`}>
        <p className=" pt-5 self-center text-center text-lg m-auto font-medium underline underline-offset-8">
          Click here for more ➡️
        </p>
      </Link>
    </div>
  );
};

export default Home;
