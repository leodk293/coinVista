"use client";
import React from "react";
import CryptoList from "@/components/CryptoList";
import { useCurrency } from "../../../CurrencyContext";
import { useEffect } from "react";

export default function CryptoListPage() {
  const { currency, getCurrencySymbol } = useCurrency();
  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  // Scroll to bottom
  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  return (
    <div className=" mx-auto ">
      <CryptoList
        length={250}
        currency={currency}
        symbol={getCurrencySymbol()}
      />
      {/* Fixed Scroll Buttons */}
      <button
        onClick={scrollToTop}
        style={{
          position: "fixed",
          right: "30px",
          bottom: "90px",
          zIndex: 1000,
          padding: "12px 18px",
          borderRadius: "50%",
          background: "#222",
          color: "#fff",
          border: "none",
          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          cursor: "pointer",
          fontSize: "20px"
        }}
        aria-label="Scroll to top"
      >
        ↑
      </button>
      <button
        onClick={scrollToBottom}
        style={{
          position: "fixed",
          right: "30px",
          bottom: "30px",
          zIndex: 1000,
          padding: "12px 18px",
          borderRadius: "50%",
          background: "#222",
          color: "#fff",
          border: "none",
          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          cursor: "pointer",
          fontSize: "20px"
        }}
        aria-label="Scroll to bottom"
      >
        ↓
      </button>
    </div>
  );
}
