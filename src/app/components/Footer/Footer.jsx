import React from "react";
import Logo from "../logo/Logo";
import Link from "next/link";

export default function Footer() {
  const date = new Date();
  const currentYear = date.getFullYear();
  return (
    <footer className=" mt-[150px] flex flex-col gap-5 border-t border-t-gray-200 shadow py-10 px-5">
      <div className="flex flex-wrap justify-start gap-[80px] md:justify-evenly md:gap-0">
        <div className=" flex flex-col gap-3">
          <div className=" self-start">
            <Logo />
          </div>
          <p className=" text-gray-600 font-semibold">
            Express your imaginations and creativity by generating some amazing
            images
          </p>
        </div>

        <div className=" flex flex-col gap-3">
          <h3 className=" text-xl font-bold">Support</h3>
          <ul className=" text-gray-600 font-semibold flex flex-col gap-1">
            <li>
              <Link href={"/home/contact"}>Contact Us</Link>
            </li>
            <li>
              <Link href={"/FAQ"}>FAQ</Link>
            </li>
            <li>
              <Link href={"/terms-of-use-and-privacy-policy"}>
                Terms of Use and Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        <div className=" flex flex-col gap-3">
          <h3 className=" text-xl font-bold">Connect with us</h3>
          <ul className=" text-gray-600 font-semibold flex flex-col gap-1">
            <li>
              <Link
                className=" hover:underline"
                target="_blank"
                href={"https://github.com/leodk293"}
              >
                Github
              </Link>
            </li>
            <li>
              <Link
                className=" hover:underline"
                target="_blank"
                href={"https://www.linkedin.com/in/aboubacar-traore-495736252"}
              >
                Linkedin
              </Link>
            </li>
            <li>
              <Link
                className=" hover:underline"
                target="_blank"
                href={"https://x.com/Aboubac48530295"}
              >
                X
              </Link>
            </li>
            <li>
              <Link
                className=" hover:underline"
                target="_blank"
                href={"https://www.facebook.com/profile.php?id=100092315485742"}
              >
                Facebook
              </Link>
            </li>
            <li>
              <Link
                className=" hover:underline"
                target="_blank"
                href={"https://www.youtube.com/@aboubacartraore5831"}
              >
                Youtube
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <span className=" w-[95%] self-center h-[1px] bg-gray-400" />
      <p className=" font-bold italic text-center">
        © {currentYear} AI-IMAGE-CREATOR. All rights reserved.
      </p>
    </footer>
  );
}
