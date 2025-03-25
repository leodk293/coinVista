"use client";
import React from "react";
import { MessageCircleMore } from "lucide-react";
import { useSession } from "next-auth/react";

export default function FeedbackPage() {
  const { status, data: session } = useSession();
  return (
    <main className="flex mt-[60px] flex-col gap-5 mx-auto max-w-4xl px-3 md:px-0">
      <div className=" flex flex-col gap-2">
        <h1 className=" flex flex-row gap-2 font-bold text-2xl md:text-3xl">
          <MessageCircleMore
            className=" self-center"
            size={30}
            color="#000000"
            strokeWidth={2.5}
          />
          <span className=" self-center">Feedback</span>
        </h1>
        <span className=" w-full h-[2px] bg-black" />
      </div>

      <section></section>
    </main>
  );
}
