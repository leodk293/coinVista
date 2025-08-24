"use client";
import React from "react";
import Logo from "./Logo";
import Link from "next/link";
import { useSession } from "next-auth/react";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { Skeleton } from "./ui/skeleton";
import { Moon, Sun, Search, Menu, X, ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useCurrency } from "../../CurrencyContext";
import { useState, useEffect } from "react";

export default function Header() {
  const { status, data: session } = useSession();
  const { setTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { currency, setCurrency } = useCurrency();
  const router = useRouter();

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const navLinks = [
    { href: "https://www.linkedin.com/in/aboubacar-traore-495736252", label: "LinkedIn", icon: "💼" },
    { href: "https://x.com/Aboubac48530295", label: "X/Twitter", icon: "🐦" },
    { href: "https://www.facebook.com/profile.php?id=100092315485742", label: "Facebook", icon: "📘" },
    { href: "/personalized-list", label: "Personalized List", icon: "📃" },
  ];

  const [cryptoList, setCryptoList] = useState([]);
  const [cryptoName, setCryptoName] = useState("");

  async function getCryptoList() {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false`
      );
      if (!response.ok) {
        setCryptoList([]);
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setCryptoList(data);
    } catch (error) {
      console.error("Error fetching crypto data:", error);
      setCryptoList([]);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (cryptoName.trim()) {
      router.push(`/crypto?name=${encodeURIComponent(cryptoName)}`);
      setCryptoName("");
    }
  };

  useEffect(() => {
    getCryptoList();
  }, []);

  return (
    <div className="w-full fixed top-0 left-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-gray-950/80 shadow-lg border-b border-gray-200/20 dark:border-gray-800/20">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <header className="flex items-center justify-between py-4">
          <div className="flex-shrink-0 transform hover:scale-105 transition-transform duration-200">
            <Logo />
          </div>

          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="group relative px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 font-medium overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 origin-center" />
                <span className="relative flex items-center space-x-2">
                  <span className="text-sm">{link.icon}</span>
                  <span>{link.label}</span>
                </span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-3">
            {status === "authenticated" ? (
              <div className="transform hover:scale-105 transition-transform duration-200">
                <LogoutButton />
              </div>
            ) : status === "unauthenticated" ? (
              <div className="transform hover:scale-105 transition-transform duration-200">
                <LoginButton />
              </div>
            ) : (
              <div className="flex items-center space-x-3 px-4 py-2 bg-gradient-to-r from-gray-100/50 to-gray-200/50 dark:from-gray-800/50 dark:to-gray-700/50 rounded-full border border-gray-200/30 dark:border-gray-700/30 min-w-[160px]">
                <div className="relative">
                  <Skeleton className="h-8 w-8 rounded-full bg-gray-300/50 dark:bg-gray-600/50" />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 animate-pulse" />
                </div>
                <div className="flex flex-col space-y-1 flex-1">
                  <Skeleton className="h-3 w-20 rounded bg-gray-300/50 dark:bg-gray-600/50" />
                  <Skeleton className="h-2 w-14 rounded bg-gray-300/30 dark:bg-gray-600/30" />
                </div>
              </div>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-200 dark:hover:from-gray-800 dark:hover:to-gray-700 cursor-pointer transition-all duration-300 rounded-xl group"
                >
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-500/20 to-orange-500/20 dark:from-blue-500/20 dark:to-purple-500/20 scale-0 group-hover:scale-100 transition-transform duration-300" />
                  <Sun className="relative h-5 w-5 scale-100 rotate-0 transition-all duration-500 dark:scale-0 dark:-rotate-90" />
                  <Moon className="absolute h-5 w-5 scale-0 rotate-90 transition-all duration-500 dark:scale-100 dark:rotate-0" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-36 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 shadow-xl"
              >
                <DropdownMenuItem
                  onClick={() => setTheme("light")}
                  className="cursor-pointer hover:bg-gradient-to-r hover:from-yellow-500/10 hover:to-orange-500/10 transition-all duration-200"
                >
                  <Sun className="h-4 w-4 mr-3 text-yellow-500" />
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setTheme("dark")}
                  className="cursor-pointer hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10 transition-all duration-200"
                >
                  <Moon className="h-4 w-4 mr-3 text-blue-400" />
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setTheme("system")}
                  className="cursor-pointer hover:bg-gradient-to-r hover:from-gray-500/10 hover:to-gray-600/10 transition-all duration-200"
                >
                  <span className="h-4 w-4 mr-3 flex items-center justify-center text-sm">
                    ⚙️
                  </span>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden relative hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-200 dark:hover:from-gray-800 dark:hover:to-gray-700 rounded-xl group transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 scale-0 group-hover:scale-100 transition-transform duration-300" />
              <div className="relative">
                <X
                  className={`h-5 w-5 transition-all duration-300 ${
                    isMobileMenuOpen
                      ? "scale-100 rotate-0"
                      : "scale-0 rotate-90"
                  }`}
                />
                <Menu
                  className={`absolute inset-0 h-5 w-5 transition-all duration-300 ${
                    isMobileMenuOpen
                      ? "scale-0 -rotate-90"
                      : "scale-100 rotate-0"
                  }`}
                />
              </div>
            </Button>
          </div>
        </header>

        <div className="flex flex-col md:flex-row items-center justify-between pb-6 space-y-4 md:space-y-0 md:space-x-6">
          <form
            onSubmit={handleSubmit}
            className="flex-1 max-w-2xl mx-auto md:mx-0 w-full"
          >
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none z-10">
                <Search className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-all duration-300 group-focus-within:scale-110" />
              </div>
              <input
                type="text"
                list="cryptos"
                onChange={(event) => setCryptoName(event.target.value)}
                value={cryptoName}
                placeholder="Search for cryptocurrencies..."
                className="w-full pl-14 pr-6 py-4 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-2 border-gray-200/50 dark:border-gray-700/50 rounded-2xl text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 shadow-sm hover:shadow-lg focus:shadow-xl hover:border-gray-300/70 dark:hover:border-gray-600/70"
                required
              />
              {cryptoList && cryptoList.length > 0 && (
                <datalist id="cryptos">
                  {Array.isArray(cryptoList) &&
                    cryptoList.map((crypto) => (
                      <option
                        className=" capitalize"
                        value={crypto.id}
                        key={crypto.id}
                      />
                    ))}
                </datalist>
              )}

              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          </form>

          <div className="flex items-center gap-4 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl px-4 py-2 border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Currency :
            </span>
            <div className="relative">
              <select
                onChange={handleCurrencyChange}
                value={currency}
                className="bg-white appearance-none dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg pr-8 pl-2 py-1 text-gray-900 dark:text-white font-medium cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="USD">💲 USD</option>
                <option value="EUR">💶 EUR</option>
                <option value="GBP">💷 GBP</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-500 pointer-events-none" />
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200/30 dark:border-gray-800/30 py-6 mb-4 bg-white/60 dark:bg-gray-950/60 backdrop-blur-md rounded-xl shadow-lg">
            <nav className="flex flex-col space-y-2 px-6">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="group relative text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 font-medium py-3 px-4 rounded-xl overflow-hidden"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  <span className="relative flex items-center space-x-3">
                    <span className="text-lg">{link.icon}</span>
                    <span>{link.label}</span>
                  </span>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}
