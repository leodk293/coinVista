"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useCurrency } from "../../../CurrencyContext";
import Image from "next/image";
import Loader from "@/components/loader/Loader";
import Link from "next/link";
import { Star, TrendingUp, TrendingDown, Minus } from "lucide-react";

export default function PersonalizedListPage() {
  const [personalizedList, setPersonalizedList] = useState({
    error: false,
    data: [],
    loading: false,
  });
  const { data: session, status } = useSession();
  const { currency, getCurrencySymbol } = useCurrency();

  // Hardcoded conversion rates for demo
  const conversionRates = {
    usd: 1,
    eur: 0.92,
    gbp: 0.78,
  };

  // Convert value based on selected currency
  const convertValue = (value) => {
    const rate = conversionRates[currency.toLowerCase()] || 1;
    return value * rate;
  };

  async function fetchPersonalizedList() {
    setPersonalizedList((prev) => ({ ...prev, loading: true }));
    try {
      if (status === "authenticated" && session?.user?.id) {
        const response = await fetch(`/api/cryptos?userId=${session.user.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch personalized list");
        }
        const data = await response.json();
        setPersonalizedList({
          data: data.data,
          loading: false,
          error: false,
        });
      } else {
        setPersonalizedList({
          data: [],
          loading: false,
          error: false,
        });
      }
    } catch (error) {
      console.error("Error fetching personalized list:", error);
      setPersonalizedList({ error: true, data: [], loading: false });
    }
  }

  async function handleDeleteCrypto(id) {
    try {
      const response = await fetch(
        `/api/cryptos?id=${id}&userId=${session?.user?.id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error("Failed to delete cryptocurrency");

      // Refresh list after deletion
      fetchPersonalizedList();
    } catch (error) {
      console.error("Error deleting cryptocurrency:", error);
    }
  }

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

  useEffect(() => {
    fetchPersonalizedList();
  }, [status, session]);

  return (
    <div className="w-full">
      <header className="mb-8">
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Your Personalized List
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full" />
        </div>
      </header>

      {personalizedList.loading && <Loader />}
      {personalizedList.error && (
        <p className="text-red-500 text-lg">Failed to load your list.</p>
      )}
      {!personalizedList.loading && personalizedList.data.length === 0 && (
        <p className="text-gray-500 text-lg">
          No cryptocurrencies in your list yet,{" "}
          <Link href={"/crypto-list"}></Link>
        </p>
      )}

      <div className="space-y-4">
        {personalizedList.data.map((crypto) => (
          <Link
            href={`/crypto-currency/${crypto.name.toLowerCase()}`}
            key={crypto._id}
          >
            <div className="flex items-center justify-between p-4 rounded-xl shadow-md bg-white dark:bg-gray-800 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors duration-200">
              <div className="flex items-center gap-4">
                <Image
                  width={40}
                  height={40}
                  src={crypto.image}
                  alt={crypto.name}
                  className="w-10 h-10"
                />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {crypto.name} ({crypto.symbol})
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Rank: {crypto.market_cap_rank}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900 dark:text-white">
                  {getCurrencySymbol(currency)}
                  {convertValue(Number(crypto.current_price)).toLocaleString()}
                </p>
                <p className="text-[15px] text-gray-600 dark:text-gray-400">
                  Market Cap: {getCurrencySymbol(currency)}
                  {convertValue(Number(crypto.market_cap)).toLocaleString()}
                </p>
                <p
                  className={`text-sm ${
                    parseFloat(crypto.price_change_percentage_24h) >= 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {parseFloat(crypto.price_change_percentage_24h).toFixed(2)}%
                </p>
              </div>
              <button
                onClick={() => handleDeleteCrypto(crypto._id)}
                className="px-3 py-1 text-[15px] font-medium rounded-lg bg-red-500 hover:bg-red-600 text-white"
              >
                Delete
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
