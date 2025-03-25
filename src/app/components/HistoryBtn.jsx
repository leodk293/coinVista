import React from "react";
import Link from "next/link";

export default function HistoryBtn() {
  return (
    <Link className="z-50 relative" href="/home//your-history">
      <button className="fixed cursor-pointer left-1 top-12 flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition-colors duration-200 font-medium md:top-25 md:left-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        Your History
      </button>
    </Link>
  );
}
