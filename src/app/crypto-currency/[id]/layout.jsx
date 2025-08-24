import React from "react";

export async function generateMetadata({ params }, parent) {
  const id = params.id;

  const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
  const result = await res.json();

  if (result) {
    return {
      title: `${result?.name}`,
      description: `${result?.synopsis}`,
    };
  }
}

export default function layout({ children }) {
  return <>{children}</>;
}
