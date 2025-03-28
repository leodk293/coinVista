"use client";
import React, { useState, useEffect } from "react";
import { MessageCircleMore } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Loader from "@/app/components/loader/Loader";
import { useRouter } from "next/navigation";

export default function FeedbackPage() {
  const { status, data: session } = useSession();
  const [comments, setComments] = useState({
    error: false,
    data: [],
    loading: false,
  });
  const [commentText, setCommentText] = useState("");
  const router = useRouter();

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
      //router.push("/home/feedback");
      setCommentText("");
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

      <section className=" flex flex-col gap-5">
        <h1 className=" text-2xl font-bold md:text-3xl">
          {comments.data.length} Comment{comments.data.length !== 1 ? "s" : ""}
        </h1>

        {status === "authenticated" && (
          <div className=" flex flex-row gap-3">
            {session.user?.image ? (
              <Image
                width={40}
                height={40}
                src={session.user.image}
                alt={session.user.name || "User"}
                className=" rounded-[50%]"
              />
            ) : (
              <p>Loading...</p>
            )}

            <form onSubmit={addComment} className=" w-full">
              <input
                required
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full outline-0 border-b border-b-black p-1 text-xl"
                placeholder="Leave a comment..."
              />
            </form>
          </div>
        )}

        <section className=" flex flex-col gap-5 mt-5">
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
              No comments yet, be the first
            </p>
          )}
        </section>
      </section>
    </main>
  );
}
