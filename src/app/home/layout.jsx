import React from "react";
import Nav from "../components/Nav/Nav";
import Footer from "../components/Footer/Footer";

const layout = ({ children }) => {
  return (
    <>
      <Nav />
      <div>{children}</div>
      <Footer />
    </>
  );
};

export default layout;
