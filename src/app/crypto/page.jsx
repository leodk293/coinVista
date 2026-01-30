"use client";
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import DetailsProps from "@/components/DetailsProp";
import Loader from "@/components/loader/Loader";

function CryptoPageContent() {
  const searchParams = useSearchParams();
  const cryptoName = searchParams.get("name");

  if (!cryptoName) {
    return (
      <div className="text-center text-red-600 dark:text-red-400 py-12">
        An error has occurred. Please try again.
      </div>
    );
  }

  return <DetailsProps cryptoId={cryptoName} />;
}

export default function SearchResultPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-[50vh]">
          <Loader />
        </div>
      }
    >
      <CryptoPageContent />
    </Suspense>
  );
}
