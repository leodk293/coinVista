"use client";
import React from "react";
import { useState, useEffect } from "react";
import Loader from "@/components/loader/Loader";
import Image from "next/image";
import Link from "next/link";
import { nanoid } from "nanoid";
import { useCurrency } from "../../CurrencyContext";
import Chart from "react-google-charts";
import { useTheme } from "next-themes";
import { useSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";

export default function DetailsProps({ cryptoId }) {
  const { theme } = useTheme();
  const { data: session, status } = useSession();

  const [cryptoDetails, setCryptoDetails] = useState({
    error: false,
    data: null,
    loading: false,
  });
  const [historicalChartData, setHistoricalChartData] = useState([]);
  const [days, setDays] = useState(15);
  const [isAddingToList, setIsAddingToList] = useState(false);
  const { currency, getCurrencySymbol } = useCurrency();

  async function fetchCryptoDetails() {
    setCryptoDetails((prev) => ({ ...prev, loading: true }));
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${cryptoId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch crypto details");
      }
      const data = await response.json();
      setCryptoDetails((prev) => ({
        ...prev,
        data,
        loading: false,
        error: false,
      }));
    } catch (error) {
      console.error("Error fetching crypto details:", error);
      setCryptoDetails((prev) => ({ ...prev, error: true, loading: false }));
    }
  }

  async function fetchHistoricalChartData() {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${cryptoId}/market_chart?vs_currency=${currency}&days=${days}&interval=daily`
      );
      if (!response.ok) {
        setHistoricalChartData([]);
        throw new Error("Failed to fetch historical chart data");
      }
      const data = await response.json();
      setHistoricalChartData(data.prices);
    } catch (error) {
      console.error("Error fetching historical chart data:", error);
      setHistoricalChartData([]);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    fetchHistoricalChartData();
  }

  async function addToList() {
    if (status === "unauthenticated") {
      toast.warning("You need to login first to add this crypto", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    if (!cryptoDetails.data) {
      toast.error("Crypto details not loaded yet", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
      return;
    }

    setIsAddingToList(true);

    try {
      const response = await fetch("/api/cryptos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session?.user?.id,
          userName: session?.user?.name,
          market_cap_rank: cryptoDetails.data?.market_cap_rank,
          image: cryptoDetails.data?.image?.large,
          name: cryptoDetails.data?.name,
          symbol: cryptoDetails.data?.symbol,
          current_price: cryptoDetails.data?.market_data?.current_price?.usd,
          market_cap: cryptoDetails.data?.market_data?.market_cap?.usd,
          price_change_percentage_24h:
            cryptoDetails.data?.market_data?.price_change_percentage_24h,
        }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || `Server error: ${response.statusText}`);
      }

      if (result.success) {
        toast.success(
          result.message ||
            `${cryptoDetails.data?.name} successfully added to list`,
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          }
        );
      } else {
        throw new Error(result.error || "Unknown error occurred");
      }
    } catch (error) {
      console.error("Error adding to list:", error);

      // Show specific error message
      let errorMessage = error.message;

      // Handle specific error cases
      if (errorMessage.includes("already exists")) {
        errorMessage = `${cryptoDetails.data?.name} is already in your list`;
      } else if (errorMessage.includes("All fields are required")) {
        errorMessage = "Missing required information. Please try again.";
      } else if (errorMessage.includes("User not found")) {
        errorMessage = "User session expired. Please log in again.";
      }

      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } finally {
      setIsAddingToList(false);
    }
  }

  useEffect(() => {
    fetchCryptoDetails();
  }, [cryptoId]);

  useEffect(() => {
    fetchHistoricalChartData();
  }, [cryptoId, currency, days]);

  if (cryptoDetails.loading) {
    return <Loader />;
  }

  if (cryptoDetails.error || !cryptoId) {
    return (
      <div className="text-center text-red-600 dark:text-red-400">
        An error has occurred. Please try again.
      </div>
    );
  }

  if (cryptoDetails.data && cryptoId) {
    return (
      cryptoDetails.data && (
        <div className="mx-auto flex flex-col">
          <section className=" flex flex-col gap-2">
            <Image
              src={cryptoDetails.data?.image?.large}
              alt={cryptoDetails.data?.name || "Cryptocurrency"}
              width={64}
              height={64}
              className=" object-cover self-center md:self-start"
            />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white self-center md:self-start">
              {cryptoDetails.data?.name} (
              {cryptoDetails.data?.symbol?.toUpperCase()})
            </h1>

            <div className=" flex flex-wrap gap-2">
              {cryptoDetails.data?.links?.whitepaper && (
                <Link
                  target="_blank"
                  href={cryptoDetails.data.links.whitepaper}
                  rel="noopener noreferrer"
                >
                  <button className="bg-blue-500 mt-1 cursor-pointer text-white px-4 font-medium py-2 rounded hover:bg-blue-600 duration-200">
                    Download PDF
                  </button>
                </Link>
              )}
              <button
                onClick={addToList}
                disabled={isAddingToList || status === "loading"}
                className={`mt-1 cursor-pointer px-4 font-medium py-2 rounded duration-200 ${
                  isAddingToList || status === "loading"
                    ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed opacity-70"
                    : "bg-gray-200 dark:bg-gray-600/50 hover:bg-gray-300 dark:hover:bg-gray-500"
                }`}
              >
                {isAddingToList ? "Adding..." : "Add to List"}
              </button>
            </div>

            <p className=" mt-5 text-[16px] leading-8 md:text-lg">
              {cryptoDetails.data?.description?.en}
            </p>

            <div className=" mt-5 flex flex-wrap gap-10">
              {cryptoDetails.data?.links?.homepage?.[0] && (
                <p>
                  Official website :{" "}
                  <Link
                    target="_blank"
                    href={cryptoDetails.data.links.homepage[0]}
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {cryptoDetails.data.links.homepage[0]}
                  </Link>
                </p>
              )}

              {cryptoDetails.data?.links?.subreddit_url && (
                <p>
                  Reddit :{" "}
                  <Link
                    target="_blank"
                    href={cryptoDetails.data.links.subreddit_url}
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {cryptoDetails.data.links.subreddit_url}
                  </Link>
                </p>
              )}

              {cryptoDetails.data?.links?.official_forum_url?.length > 0 && (
                <div className=" flex flex-col">
                  <p>Forum : </p>
                  <ul>
                    {cryptoDetails.data.links.official_forum_url.map(
                      (forumUrl) =>
                        forumUrl && (
                          <li className=" list-disc" key={nanoid(10)}>
                            <Link
                              target="_blank"
                              href={forumUrl}
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline"
                            >
                              {forumUrl}
                            </Link>
                          </li>
                        )
                    )}
                  </ul>
                </div>
              )}

              {cryptoDetails.data?.links?.repos_url?.github?.length > 0 && (
                <div className=" flex flex-col">
                  <p>Github repos : </p>
                  <ul>
                    {cryptoDetails.data.links.repos_url.github.map(
                      (githubUrl) =>
                        githubUrl && (
                          <li className=" list-disc" key={nanoid(10)}>
                            <Link
                              target="_blank"
                              href={githubUrl}
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline"
                            >
                              {githubUrl}
                            </Link>
                          </li>
                        )
                    )}
                  </ul>
                </div>
              )}

              {cryptoDetails.data?.links?.repos_url?.bitbucket?.length > 0 && (
                <div className=" flex flex-col">
                  <p>Bitbucket repos : </p>
                  <ul>
                    {cryptoDetails.data.links.repos_url.bitbucket.map(
                      (bitbucketUrl) =>
                        bitbucketUrl && (
                          <li className=" list-disc" key={nanoid(10)}>
                            <Link
                              target="_blank"
                              href={bitbucketUrl}
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline"
                            >
                              {bitbucketUrl}
                            </Link>
                          </li>
                        )
                    )}
                  </ul>
                </div>
              )}
            </div>
          </section>

          <section className="mt-5">
            <div className=" flex flex-col gap-2 w-full">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Historical Price Chart
              </h2>
              <div className=" flex flex-row gap-4">
                <p className=" self-center text-lg">
                  Days Count :{" "}
                  <select
                    className=" cursor-pointer p-2 border border-black bg-white rounded-lg dark:border-gray-700 dark:bg-black"
                    onChange={(event) => setDays(Number(event.target.value))}
                    value={days}
                  >
                    <option value="15">15</option>
                    <option value="30">30</option>
                    <option value="45">45</option>
                    <option value="60">60</option>
                  </select>
                </p>

                <form onSubmit={handleSubmit} className="flex items-center">
                  <input
                    onChange={(event) => setDays(Number(event.target.value))}
                    value={days}
                    className=" p-2 border border-black rounded-lg text-lg outline-0 dark:border-gray-700"
                    type="number"
                    placeholder="Enter days count"
                    min="1"
                    max="365"
                  />
                </form>
              </div>
            </div>
            {historicalChartData && historicalChartData.length > 0 ? (
              <div className="mt-10 ">
                <Chart
                  chartType="LineChart"
                  width="100%"
                  height="400px"
                  data={[
                    ["Date", `Price (${getCurrencySymbol(currency)})`],
                    ...historicalChartData.map(([timestamp, price]) => [
                      new Date(timestamp).toLocaleDateString(),
                      price,
                    ]),
                  ]}
                  options={{
                    legend: {
                      position: "bottom",
                      textStyle: {
                        color:
                          theme === "dark"
                            ? "white"
                            : theme === "light"
                              ? "black"
                              : "gray",
                      },
                    },
                    hAxis: {
                      title: "Date",
                      titleTextStyle: {
                        color:
                          theme === "dark"
                            ? "white"
                            : theme === "light"
                              ? "black"
                              : "gray",
                      },
                      textStyle: {
                        color:
                          theme === "dark"
                            ? "white"
                            : theme === "light"
                              ? "black"
                              : "gray",
                      },
                    },
                    vAxis: {
                      title: `Price (${getCurrencySymbol(currency)})`,
                      titleTextStyle: {
                        color:
                          theme === "dark"
                            ? "white"
                            : theme === "light"
                              ? "black"
                              : "gray",
                      },
                      textStyle: {
                        color:
                          theme === "dark"
                            ? "white"
                            : theme === "light"
                              ? "black"
                              : "gray",
                      },
                    },
                    colors: ["#4285F4"],
                    backgroundColor: "transparent",
                  }}
                />
              </div>
            ) : (
              <p className="mt-5 text-lg text-red-500">
                Error fetching historical data.
              </p>
            )}
          </section>
        </div>
      )
    );
  }
}
