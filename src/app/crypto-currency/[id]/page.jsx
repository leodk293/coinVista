"use client";
import React from "react";
import { use } from "react";
import DetailsProps from "@/components/DetailsProp";

export default function CryptoIdPage({ params }) {
  const resolvedParams = use(params);
  const cryptoId = resolvedParams.id;

  if (!cryptoId) {
    <div className="text-center text-red-600 dark:text-red-400">
      An error has occurred. Please try again.
    </div>;
  }
  return (
    <>
      <DetailsProps cryptoId={cryptoId} />
    </>
  );
}
