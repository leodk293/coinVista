"use client";
import React, { useState, useEffect } from "react";
import { MessageCircleMore } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Loader from "@/app/components/loader/Loader";

export default function FeedbackPage() {
  const { status, data: session } = useSession();
  const [comments, setComments] = useState({
    error: false,
    data: [],
    loading: false,
  });
  const [isFocused, setIsFocused] = useState(false);
  const [commentText, setCommentText] = useState("");

  const addComment = async (e) => {
    e.preventDefault();
    if (!session) return;

    try {
      const res = await fetch(`/api/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: commentText,
          userId: session.user.id,
          userImage: session.user.image,
          userName: session.user.name,
        }),
      });
      if (!res.ok) {
        throw new Error("Failed to add comment");
      }

      setCommentText("");
      setIsFocused(false);
      await getComments();
    } catch (error) {
      console.error(error);
      setComments((prev) => ({ ...prev, error: true }));
    }
  };

  const getComments = async () => {
    if (!session) return;

    setComments({ error: false, data: [], loading: true });
    try {
      const res = await fetch(`/api/comment?userId=${session.user.id}`);
      if (!res.ok) {
        throw new Error("Failed to get comments");
      }
      const data = await res.json();
      setComments({
        error: false,
        data: data,
        loading: false,
      });
    } catch (error) {
      console.error(error);
      setComments({ error: true, data: [], loading: false });
    }
  };

  function transformDate(target) {
    //const isoDateString = "2025-03-27T09:47:39.920Z";
    const date = new Date(target);

    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
    const formattedTime = `${date.getHours().toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`;

    const fullFormattedDate = `${formattedDate} ${formattedTime}`;
    console.log(fullFormattedDate);
    return fullFormattedDate;
  }

  useEffect(() => {
    getComments();
  }, [session]); // Added dependencies

  if (status === "loading") {
    return <Loader />;
  }

  return (
    <main className="container max-w-4xl mx-auto pt-16 px-4 md:px-6">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <MessageCircleMore size={28} className="text-gray-800" />
          <h1 className="text-2xl md:text-3xl font-bold">Feedback</h1>
        </div>
        <div className="h-1 bg-gradient-to-r from-gray-800 to-gray-300 rounded-full" />
      </div>

      <section className="space-y-8">
        <h2 className="text-xl md:text-2xl font-semibold">
          {comments.data.length} Comment{comments.data.length !== 1 ? "s" : ""}
        </h2>

        {status === "authenticated" && (
          <div className="flex items-start gap-4 bg-gray-50 p-4 rounded-lg">
            {session.user?.image ? (
              <Image
                width={40}
                height={40}
                src={session.user.image}
                alt={session.user.name || "User"}
                className="rounded-full self-center ring-2 ring-gray-200"
              />
            ) : (
              <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
            )}

            <form onSubmit={addComment} className="flex-1">
              <div className="relative w-full">
                <textarea
                  required
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  className={`w-full border outline-none font-semibold text-xl border-gray-300 rounded-lg resize-none bg-white p-3 transition-all ${
                    isFocused ? "border-blue-500" : ""
                  }`}
                  placeholder="Leave a comment..."
                  rows={isFocused ? 3 : 1}
                />

                {(isFocused || commentText.length > 0) && (
                  <div className="flex justify-end gap-2 mt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setCommentText("");
                        setIsFocused(false);
                      }}
                      className="py-2 px-4 rounded-full cursor-pointer font-medium text-sm text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={commentText.trim().length === 0}
                      className={`py-2 px-4 font-semibold cursor-pointer rounded-full text-sm transition-colors ${
                        commentText.trim().length === 0
                          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                          : "bg-blue-500 text-white hover:bg-blue-600"
                      }`}
                    >
                      Comment
                    </button>
                  </div>
                )}
              </div>
            </form>
          </div>
        )}

        <section className=" flex flex-col gap-5 mt-10">
          {comments.error ? (
            <p className="text-xl mt-5 h-[5rem] font-bold text-red-900">
              Failed to load comments
            </p>
          ) : comments.loading ? (
            <Loader />
          ) : comments.data.length > 0 ? (
            comments.data.map((comment) => (
              <div key={comment._id} className=" flex flex-col gap-2">
                <div className="flex flex-row gap-3">
                  <Image
                    width={40}
                    height={40}
                    src={comment.userImage}
                    alt={comment.userName}
                    className=" self-center rounded-[50%]"
                  />
                  <div className=" self-center flex flex-col">
                    <h2 className=" font-bold">
                      {comment.userName}{" "}
                      <span className=" italic text-gray-600 font-semibold text-[15px]">
                        - Posted : {transformDate(comment.createdAt)}
                      </span>
                    </h2>
                    <p className=" text-xl">{comment.message}</p>
                  </div>
                </div>
                <div className="w-full h-[1px] bg-gray-300 mt-2" />
              </div>
            ))
          ) : (
            <p className=" text-[17px] font-semibold md:h-[5rem]">
              No comments yet, be the first...
            </p>
          )}
        </section>
      </section>
    </main>
  );
}
