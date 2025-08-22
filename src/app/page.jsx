"use client";
import React from "react";
import { TrendingUp } from "lucide-react";
import { useCurrency } from "../../CurrencyContext";
import CryptoList from "@/components/CryptoList";
import Link from "next/link";

const Home = () => {
  const { currency, getCurrencySymbol } = useCurrency();
  const [trendingCrypto, setTrendingCrypto] = useState({
    error: false,
    data: [],
    loading: false,
  });

  async function fetchTrendingCrypto() {
    setTrendingCrypto((prev) => ({ ...prev, loading: true }));
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/search/trending`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch trending crypto");
      }
      const data = await response.json();
      setTrendingCrypto((prev) => ({
        ...prev,
        data: data.coins,
        loading: false,
        error: false,
      }));
    } catch (error) {
      console.error("Error fetching trending crypto:", error);
      setTrendingCrypto((prev) => ({ ...prev, error: true, loading: false }));
    }
  }

  useEffect(() => {
    fetchTrendingCrypto();
  }, []);

  return (
    <div className=" mx-auto ">
      {/* Hero Section */}
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

      <Link href={``}>
        <p className=" pt-5 self-center text-center text-lg m-auto font-medium underline underline-offset-8">
          Click here for more ➡️
        </p>
      </Link>

      {/* <section className=" flex flex-col gap-2">
        <h1 className="text-2xl font-bold">
          Top {length} cryptocurrencies by market cap
        </h1>
        <span className=" w-[15%] p-[2px] bg-black rounded-full dark:bg-white" />

        {trendingCrypto.loading ? (
          <Loader />
        ) : trendingCrypto.error ? (
          <div className="text-red-500 text-center">
            <p>Error fetching trending cryptocurrencies.</p>
          </div>
        ) : (
          <div className="bg-white/70 w-full dark:bg-gray-900/70 mt-10 backdrop-blur-md rounded-2xl border border-gray-200/50 dark:border-gray-800/50 shadow-xl overflow-hidden">
            <div className="grid grid-cols-6 gap-4 px-6 py-4 bg-gray-50/80 dark:bg-gray-800/50 border-b border-gray-200/50 dark:border-gray-700/50 font-semibold text-gray-700 dark:text-gray-300">
              <div className="flex items-center">#</div>
              <div className="flex items-center col-span-2">Cryptocurrency</div>
              <div className="flex items-center">Price</div>
              <div className="flex items-center">24h Change</div>
              <div className="flex items-center">Market Cap</div>
            </div>

            <div className="divide-y divide-gray-200/50 dark:divide-gray-700/50">
              {trendingCrypto.data.coins.map((crypto, index) => (
                <Link
                  key={crypto.id}
                  href={`/crypto/${crypto.id}`}
                  className="block hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors duration-200"
                >
                  <div className="grid grid-cols-6 gap-4 px-6 py-4 items-center">
                    
                    <div className="flex items-center">
                      <span className="text-gray-500 dark:text-gray-400 font-medium">
                        {crypto.market_cap_rank}
                      </span>
                    </div>

                    
                    <div className="col-span-2 flex items-center gap-3">
                      <div className="relative">
                        <Image
                          src={crypto.large}
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
                          {crypto.large}
                        </p>
                      </div>
                    </div>

                    
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {symbol}{" "}
                      {crypto.current_price.toLocaleString("en-US", {
                        minimumFractionDigits: crypto.current_price < 1 ? 6 : 2,
                        maximumFractionDigits: crypto.current_price < 1 ? 6 : 2,
                      })}
                    </div>

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

                    
                    <div className="font-medium text-gray-700 dark:text-gray-300">
                      {symbol} {formatNumber(crypto.market_cap)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section> */}
    </div>
  );
};

export default Home;
