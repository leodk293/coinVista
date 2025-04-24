import React from "react";
import Nav from "../components/Nav/Nav";
import Footer from "../components/Footer/Footer";

export const metadata = {
  title: "Home | AI-IMAGE-CREATOR✨",
}

const layout = ({ children }) => {
  return (
    <>
      <Nav />
      <div className=" pt-[250px] md:pt-[100px]">{children}</div>
      <Footer />
    </>
  );
};

export default layout;
