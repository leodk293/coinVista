"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Nav from "../components/Nav/Nav";
import Loader from "../components/loader/Loader";
import { Trash2 } from "lucide-react";
import { nanoid } from "nanoid";

export default function Page() {
  const { data: session } = useSession();
  const [promptHistory, setPromptHistory] = useState({
    error: false,
    data: [],
    loading: false,
  });
  async function fetchHistoryPrompt() {
    setPromptHistory({ error: false, data: [], loading: true });
    try {
      const response = await fetch(`/api/prompt?userId=${session?.user?.id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPromptHistory({
        error: false,
        data: data.filter((prompt) => prompt.userId === session?.user?.id),
        loading: false,
      });
    } catch (error) {
      setPromptHistory({ error: true, data: [], loading: false });
    }
  }
  useEffect(() => {
    fetchHistoryPrompt();
  }, [session?.user?.id]);
  return (
    <>
      <Nav />
      <div className="flex mt-[60px] flex-col gap-5 mx-auto max-w-4xl px-3 md:px-0">
        <h1 className=" font-bold text-2xl md:text-3xl">Your Prompt History</h1>
        {promptHistory.loading ? (
          <Loader />
        ) : promptHistory.error ? (
          <p className="text-xl font-semibold text-red-800">
            Something went wrong
          </p>
        ) : (
          <ul className=" flex flex-col gap-4">
            {promptHistory.data.map((prompt) => (
              <li
                key={prompt._id}
                className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-violet-400 hover:bg-violet-50 cursor-pointer transition-all group"
              >
                <div className="flex justify-between items-start">
                  <p className=" text-[17px] text-gray-700 break-words">
                    {prompt.content}
                  </p>
                  <button className="opacity-0 cursor-pointer group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all">
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="mt-2 flex justify-between text-xs text-gray-500">
                  <span>{prompt.model}</span>
                  <span>
                    {new Date(
                      prompt.createdAt || Date.now()
                    ).toLocaleDateString()}
                  </span>
                </div>
                <div className="mt-1 flex gap-1 flex-wrap">
                  <span className="px-2 py-1 bg-violet-100 text-violet-800 rounded text-xs">
                    {prompt.ratio}
                  </span>
                  <span className="px-2 py-1 bg-violet-100 text-violet-800 rounded text-xs">
                    {prompt.imageCount} image(s)
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
