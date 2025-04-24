import React from 'react'
import { Linkedin, Facebook, Github, Youtube } from "lucide-react";
import { BsTwitterX } from "react-icons/bs";
import Link from 'next/link';

const Medias = () => {
  return (
    <nav className=" self-center font-semibold text-xl flex flex-row gap-3">
        <Link
          target="_blank"
          className=" border border-transparent p-2 bg-[#0077B5] rounded-full"
          href={"https://www.linkedin.com/in/aboubacar-traore-495736252"}
        >
          <Linkedin size={24} color="#ffffff" />
        </Link>
        <Link
          target="_blank"
          className=" border border-transparent p-2 bg-black rounded-full dark:border dark:border-white"
          href={"https://github.com/leodk293"}
        >
          <Github size={24} color="#ffffff" />
        </Link>
        <Link
          target="_blank"
          className=" border border-transparent p-2 bg-[#1877F2] rounded-full"
          href={"https://www.facebook.com/profile.php?id=100092315485742"}
        >
          <Facebook size={24} color="#ffffff" />
        </Link>
        <Link
          target="_blank"
          className=" text-white text-xl border border-transparent p-2 bg-black rounded-full dark:border dark:border-white"
          href={"https://x.com/Aboubac48530295"}
        >
          <BsTwitterX size={24} />
        </Link>
        <Link
          target="_blank"
          className=" text-white text-2xl border border-transparent p-2 bg-red-700 rounded-full"
          href={"https://www.youtube.com/@aboubacartraore5831"}
        >
          <Youtube size={24} />
        </Link>
      </nav>
  )
}

export default Medias