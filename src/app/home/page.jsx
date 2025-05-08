"use client";
import React from "react";
import { useSession, signOut } from "next-auth/react";
import Loader from "../components/loader/Loader";

const Home = () => {
  const { status, data: session } = useSession();

  if (status === "loading") {
    return <Loader />;
  }

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h1>{session?.user?.name}</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 cursor-pointer rounded-md"
        onClick={() => signOut({ callbackUrl: "/signin" })}
      >
        Sign out
      </button>
    </main>
  );
};

export default Home;
