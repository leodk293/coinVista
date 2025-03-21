"use client";
import React, { useState, useEffect } from "react";
import { Clock, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { nanoid } from "nanoid";


const PromptHistorySidebar = ({
  onSelectPrompt,
  userId,
  promptHistory,
  setPromptHistory,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchPromptHistory = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/prompt?userId=${userId}`);
        if (!response.ok) throw new Error("Failed to fetch prompt history");
        const data = await response.json();
        const filteredData = data.filter(
          (item) => item.userId === session?.user?.id
        );
        setPromptHistory(filteredData);
      } catch (error) {
        console.error("Error fetching prompt history:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchPromptHistory();
    } else {
      setIsLoading(false);
    }
  }, [userId, session?.user?.id, setPromptHistory]);

  const handleSelectPrompt = (prompt) => {
    if (onSelectPrompt) {
      onSelectPrompt(prompt);
    }
  };

  const handleDeletePrompt = async (id, userId, e) => {
    e.stopPropagation();
    try {
      const response = await fetch(`/api/prompt?id=${id}&userId=${userId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete prompt");
      setPromptHistory(promptHistory.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting prompt:", error);
    }
  };

  const handleClearAllHistory = async () => {
    try {
      const response = await fetch(
        `/api/prompt-history/clear?userId=${userId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Failed to clear history");
      setPromptHistory([]);
    } catch (error) {
      console.error("Error clearing prompt history:", error);
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`fixed top-16 ${
        isOpen ? "left-0" : "-left-80"
      } h-full transition-all duration-300 z-10`}
    >
      <button
        onClick={toggleSidebar}
        className="absolute top-4 -right-10 bg-[#653bfc] text-white p-2 rounded-r-lg shadow-md hover:bg-violet-700 transition-colors"
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>

      <div className="w-80 h-full bg-white border-r border-gray-200 shadow-lg p-4 flex flex-col">
        <div className="flex items-center mb-6 gap-2">
          <Clock size={20} className="text-[#653bfc]" />
          <h2 className="text-xl font-bold text-gray-800">Prompt History</h2>
        </div>

        {isLoading ? (
          <div className="flex-grow flex items-center justify-center">
            <div className="animate-pulse text-gray-400">
              Loading history...
            </div>
          </div>
        ) : !userId ? (
          <div className="flex-grow flex items-center justify-center">
            <p className="text-gray-500 text-center">
              Please sign in to view your prompt history.
            </p>
          </div>
        ) : promptHistory.length === 0 ? (
          <div className="flex-grow flex items-center justify-center">
            <p className="text-gray-500 text-center">
              No prompt history yet.
              <br />
              Generate images to see your history.
            </p>
          </div>
        ) : (
          <div className="flex-grow overflow-y-auto">
            {/* <ul className="space-y-3">
              {promptHistory.map((prompt) => (
                <li
                  key={nanoid(10)}
                  onClick={() => handleSelectPrompt(prompt)}
                  className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-violet-400 hover:bg-violet-50 cursor-pointer transition-all group"
                >
                  <div className="flex justify-between prompts-start">
                    <p className="text-sm text-gray-700 line-clamp-2">
                      {prompt.content}
                    </p>
                    <button
                      onClick={(e) =>
                        handleDeletePrompt(prompt._id, prompt.userId, e)
                      }
                      className="opacity-0 cursor-pointer group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all"
                    >
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
            </ul> */}
            {promptHistory && (
              <ul className="space-y-3">
                {promptHistory.map((prompt) => (
                  <li
                    key={nanoid(10)} // ✅ Utiliser l'ID unique
                    onClick={() => handleSelectPrompt(prompt)}
                    className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-violet-400 hover:bg-violet-50 cursor-pointer transition-all group"
                  >
                    <div className="flex justify-between items-start">
                      <p className="text-sm text-gray-700 break-words">
                        {prompt.content}
                        {/* ✅ Gérer le cas undefined */}
                      </p>
                      <button
                        onClick={(e) =>
                          handleDeletePrompt(prompt._id, prompt.userId, e)
                        }
                        className="opacity-0 cursor-pointer group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all"
                      >
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
        )}

        {promptHistory.length > 0 && (
          <button
            onClick={handleClearAllHistory}
            className="mt-4 py-2 text-sm text-red-500 hover:text-red-700 flex items-center gap-1 justify-center"
          >
            <Trash2 size={16} />
            Clear all history
          </button>
        )}
      </div>
    </div>
  );
};

export default PromptHistorySidebar;
