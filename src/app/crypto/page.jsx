"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import DetailsProps from "@/components/DetailsProp";

export default function SearchResultPage() {
  const searchParams = useSearchParams();
  const cryptoName = searchParams.get("name");

  if (!cryptoName) {
    <div className="text-center text-red-600 dark:text-red-400">
      An error has occurred. Please try again.
    </div>;
  }

  return (
    <>
      <DetailsProps cryptoId={cryptoName} />
    </>
  );
}
