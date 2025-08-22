"use client";
import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  AlertCircle,
  Star,
} from "lucide-react";
import Link from "next/link";
import Loader from "@/components/loader/Loader";
import Image from "next/image";

const CryptoList = ({ length, currency, symbol }) => {
  const [cryptoList, setCryptoList] = useState({
    error: false,
    data: [],
    loading: false,
  });


  async function fetchCryptoData() {
    setCryptoList((prev) => ({ ...prev, loading: true }));
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${length}&page=1&sparkline=false`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setCryptoList((prev) => ({
        ...prev,
        data,
        loading: false,
        error: false,
      }));
    } catch (error) {
      console.error("Error fetching crypto data:", error);
      setCryptoList((prev) => ({ ...prev, error: true, loading: false }));
    }
  }

  useEffect(() => {
    fetchCryptoData();
  }, [currency]);

  const formatNumber = (num) => {
    if (num >= 1e12) return (num / 1e12).toFixed(2) + "T";
    if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
    if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";
    if (num >= 1e3) return (num / 1e3).toFixed(2) + "K";
    return num.toLocaleString();
  };

  const getPriceChangeColor = (change) => {
    if (change > 0) return "text-emerald-600 dark:text-emerald-400";
    if (change < 0) return "text-red-600 dark:text-red-400";
    return "text-orange-600 dark:text-orange-400";
  };

  const getPriceChangeBg = (change) => {
    if (change > 0) return "bg-emerald-50 dark:bg-emerald-900/20";
    if (change < 0) return "bg-red-50 dark:bg-red-900/20";
    return "bg-orange-50 dark:bg-orange-900/20";
  };

  return (
    <div className=" w-full">
      {cryptoList.data && (
        <div className=" flex flex-col gap-2">
          <h1 className="text-2xl font-bold">
            Top {length} cryptocurrencies by market cap
          </h1>
          <span className=" w-[15%] p-[2px] bg-black rounded-full dark:bg-white" />
        </div>
      )}
      <div className="bg-white/70 w-full dark:bg-gray-900/70 mt-10 backdrop-blur-md rounded-2xl border border-gray-200/50 dark:border-gray-800/50 shadow-xl overflow-hidden">
        <div className="grid grid-cols-6 gap-4 px-6 py-4 bg-gray-50/80 dark:bg-gray-800/50 border-b border-gray-200/50 dark:border-gray-700/50 font-semibold text-gray-700 dark:text-gray-300">
          <div className="flex items-center">#</div>
          <div className="flex items-center col-span-2">Cryptocurrency</div>
          <div className="flex items-center">Price</div>
          <div className="flex items-center">24h Change</div>
          <div className="flex items-center">Market Cap</div>
        </div>

        {cryptoList.loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader />
          </div>
        ) : cryptoList.error ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-full mb-4">
              <AlertCircle className="h-12 w-12 text-red-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Unable to load data
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              There was an error fetching cryptocurrency data. Please try again.
            </p>
            <button
              onClick={fetchCryptoData}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-200/50 dark:divide-gray-700/50">
            {cryptoList.data.map((crypto, index) => (
              <Link
                key={crypto.id}
                href={`/crypto/${crypto.id}`}
                className="block hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors duration-200"
              >
                <div className="grid grid-cols-6 gap-4 px-6 py-4 items-center">
                  {/* Rank */}
                  <div className="flex items-center">
                    <span className="text-gray-500 dark:text-gray-400 font-medium">
                      {crypto.market_cap_rank}
                    </span>
                  </div>

                  {/* Name & Symbol */}
                  <div className="col-span-2 flex items-center gap-3">
                    <div className="relative">
                      <Image
                        src={crypto.image}
                        alt={crypto.name}
                        width={40}
                        height={40}
                        className="rounded-full ring-2 ring-gray-100 dark:ring-gray-700"
                      />
                      {index < 3 && (
                        <div className="absolute -top-1 -right-1 bg-yellow-500 rounded-full p-1">
                          <Star className="h-3 w-3 text-white fill-current" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {crypto.name}
                      </h3>

                      <p className="text-sm text-gray-500 dark:text-gray-400 uppercase">
                        {crypto.symbol}
                      </p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {symbol}{" "}
                    {crypto.current_price.toLocaleString("en-US", {
                      minimumFractionDigits: crypto.current_price < 1 ? 6 : 2,
                      maximumFractionDigits: crypto.current_price < 1 ? 6 : 2,
                    })}
                  </div>

                  {/* 24h Change */}
                  <div
                    className={`flex items-center gap-2 font-semibold ${getPriceChangeColor(
                      crypto.price_change_percentage_24h
                    )}`}
                  >
                    <div
                      className={`p-1 rounded-full ${getPriceChangeBg(
                        crypto.price_change_percentage_24h
                      )}`}
                    >
                      {crypto.price_change_percentage_24h > 0 ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : crypto.price_change_percentage_24h < 0 ? (
                        <TrendingDown className="h-4 w-4" />
                      ) : (
                        <Minus className="h-4 w-4" />
                      )}
                    </div>
                    <span>
                      {crypto.price_change_percentage_24h > 0 ? "+" : ""}
                      {crypto.price_change_percentage_24h.toFixed(2)}%
                    </span>
                  </div>

                  {/* Market Cap */}
                  <div className="font-medium text-gray-700 dark:text-gray-300">
                    {symbol} {formatNumber(crypto.market_cap)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CryptoList;
