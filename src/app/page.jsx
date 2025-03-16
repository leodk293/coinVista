'use client';
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loader from "./components/loader/Loader";

export default function Home() {
  const {status, data:session} = useSession();
  const router = useRouter();

  useEffect(() => {
    if(status === "authenticated") {
      router.push('/ai-image-creator');
    } else if(status === "unauthenticated") {
      router.push('/signin');
    }
  }, [status, router]);

  if(status === "loading") {
    return <Loader />;
  }

  // This will briefly show before redirect happens
  return (
    <div>
      {/* You can add content here or leave it empty */}
    </div>
  );
}