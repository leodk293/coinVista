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
  const [retryTrigger, setRetryTrigger] = useState(0);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    const MAX_RETRIES = 3;
    const INITIAL_DELAY_MS = 500;
    const MAX_DELAY_MS = 15000;

    const delay = (ms) =>
      new Promise((resolve, reject) => {
        if (signal.aborted) {
          reject(new DOMException("Aborted", "AbortError"));
          return;
        }
        const t = setTimeout(resolve, ms);
        const onAbort = () => {
          clearTimeout(t);
          reject(new DOMException("Aborted", "AbortError"));
        };
        signal.addEventListener("abort", onAbort, { once: true });
      });

    async function fetchCryptoData(retryCount = 0) {
      setCryptoList((prev) => ({ ...prev, loading: true, error: false }));
      try {
        const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${length}&page=1&sparkline=false`;
        const response = await fetch(url, { signal });

        if (
          response.status === 429 ||
          response.status === 503 ||
          response.status === 502
        ) {
          const retryAfter = response.headers.get("Retry-After");
          const waitMs = retryAfter
            ? Math.min(parseInt(retryAfter, 10) * 1000, MAX_DELAY_MS)
            : Math.min(
                INITIAL_DELAY_MS * Math.pow(2, retryCount),
                MAX_DELAY_MS,
              );

          if (retryCount < MAX_RETRIES && !signal.aborted) {
            await delay(waitMs);
            return fetchCryptoData(retryCount + 1);
          }
          throw new Error(
            `Rate limited (${response.status}). Please try again in a moment.`,
          );
        }

        if (!response.ok) {
          throw new Error(`Failed to fetch data (${response.status})`);
        }
        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error("Invalid API response: expected an array");
        }
        if (signal.aborted) return;
        setCryptoList((prev) => ({
          ...prev,
          data,
          loading: false,
          error: false,
        }));
      } catch (error) {
        if (error.name === "AbortError") return;
        console.error("Error fetching crypto data:", error);
        if (!signal.aborted) {
          setCryptoList((prev) => ({ ...prev, error: true, loading: false }));
        }
      }
    }

    fetchCryptoData();
    return () => abortController.abort();
  }, [currency, length, retryTrigger]);

  const formatNumber = (num) => {
    const n = Number(num);
    if (num == null || Number.isNaN(n)) return "—";
    if (n >= 1e12) return (n / 1e12).toFixed(2) + "T";
    if (n >= 1e9) return (n / 1e9).toFixed(2) + "B";
    if (n >= 1e6) return (n / 1e6).toFixed(2) + "M";
    if (n >= 1e3) return (n / 1e3).toFixed(2) + "K";
    return n.toLocaleString();
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
        <header className="mb-8">
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              {length <= 50
                ? ` Top ${length} Cryptocurrencies`
                : ` More than 200 Cryptocurrencies `}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">
              Ranked by market capitalization
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full" />
          </div>
        </header>
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
              onClick={() => setRetryTrigger((t) => t + 1)}
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
                href={`/crypto-currency/${crypto.id}`}
                className="block hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors duration-200"
              >
                <div className="grid grid-cols-6 gap-4 px-6 py-4 items-center">
                  {/* Rank */}
                  <div className="flex items-center">
                    <span className="text-gray-500 dark:text-gray-400 font-medium">
                      {crypto.market_cap_rank ?? index + 1}
                    </span>
                  </div>

                  {/* Name & Symbol */}
                  <div className="col-span-2 flex items-center gap-3">
                    <div className="relative">
                      {crypto.image ? (
                        <Image
                          src={crypto.image}
                          alt={crypto.name ?? "Crypto"}
                          width={40}
                          height={40}
                          className="rounded-full ring-2 ring-gray-100 dark:ring-gray-700"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 font-medium">
                          {(crypto.symbol ?? "?").slice(0, 1)}
                        </div>
                      )}
                      {index < 3 && (
                        <div className="absolute -top-1 -right-1 bg-yellow-500 rounded-full p-1">
                          <Star className="h-3 w-3 text-white fill-current" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {crypto.name ?? "Unknown"}
                      </h3>

                      <p className="text-sm text-gray-500 dark:text-gray-400 uppercase">
                        {crypto.symbol ?? "—"}
                      </p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {symbol}{" "}
                    {crypto.current_price != null &&
                    !Number.isNaN(Number(crypto.current_price))
                      ? Number(crypto.current_price).toLocaleString("en-US", {
                          minimumFractionDigits:
                            crypto.current_price < 1 ? 6 : 2,
                          maximumFractionDigits:
                            crypto.current_price < 1 ? 6 : 2,
                        })
                      : "—"}
                  </div>

                  {/* 24h Change */}
                  <div
                    className={`flex items-center gap-2 font-semibold ${getPriceChangeColor(
                      crypto.price_change_percentage_24h ?? 0,
                    )}`}
                  >
                    <div
                      className={`p-1 rounded-full ${getPriceChangeBg(
                        crypto.price_change_percentage_24h ?? 0,
                      )}`}
                    >
                      {(crypto.price_change_percentage_24h ?? 0) > 0 ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : (crypto.price_change_percentage_24h ?? 0) < 0 ? (
                        <TrendingDown className="h-4 w-4" />
                      ) : (
                        <Minus className="h-4 w-4" />
                      )}
                    </div>
                    <span>
                      {(crypto.price_change_percentage_24h ?? 0) > 0 ? "+" : ""}
                      {crypto.price_change_percentage_24h != null
                        ? Number(crypto.price_change_percentage_24h).toFixed(2)
                        : "0.00"}
                      %
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
