"use client";
import React, { createContext, useContext, useState } from "react";

const CurrencyContext = createContext();

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState("USD");

  const value = {
    currency,
    setCurrency,
    formatPrice: (amount) => {
      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency,
      });
      return formatter.format(amount);
    },
    getCurrencySymbol: () => {
      return currency === "USD"
        ? "$"
        : currency === "EUR"
          ? "€"
          : currency === "GBP"
            ? "£"
            : currency === "JPY"
              ? "¥"
              : currency === "AUD"
                ? "A$"
                : currency === "CAD"
                  ? "C$"
                  : currency === "CHF"
                    ? "CHF"
                    : currency === "CNY"
                      ? "¥"
                      : currency === "INR"
                        ? "₹"
                        : currency === "RUB"
                          ? "₽"
                          : currency === "ZAR"
                            ? "R"
                            : ""; // Add more currencies as needed
    },
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};
