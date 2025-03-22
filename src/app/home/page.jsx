"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import imagesExamples from "../generated_images_example";
import { nanoid } from "nanoid";
import { ArrowRight, Sparkles } from "lucide-react";

const HomePage = () => {
  return (
    <main className="container mx-auto max-w-5xl py-12 px-4">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center mb-16">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Express Your Imagination
          </h1>
        </div>
        <p className="text-lg md:text-xl max-w-2xl mb-8 text-gray-700 dark:text-gray-300">
          Create stunning, unique visuals that bring your wildest ideas to life
          with our AI image generator.
        </p>
        <Link
          href="/home/ai-image-creator"
          className="flex flex-row text-xl items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-full font-medium transition-all hover:opacity-90 hover:scale-105"
        >
          <span className=" self-center">Start Creating</span>
          <ArrowRight className=" self-center" size={30} />
        </Link>
      </section>

      {/* Gallery Section */}
      <section className="mt-12">
        <div className="flex items-center justify-center gap-3 mb-10">
          <Sparkles className="text-yellow-500" size={24} />
          <h2 className="text-3xl font-bold text-center">Gallery Showcase</h2>
          <Sparkles className="text-yellow-500" size={24} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {imagesExamples.map((image, index) => (
            <Link key={nanoid(10)} href={`/image/${index}`}>
              <div className="group relative cursor-pointer overflow-hidden rounded-xl shadow-lg transition-all hover:shadow-xl">
                <div className="aspect-square overflow-hidden">
                  <Image
                    src={image.src}
                    alt={`AI Generated Example ${index + 1}`}
                    width={400}
                    height={400}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                  <p className="text-white font-medium p-4">{image.prompt}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/home/ai-image-creator"
            className="flex items-center gap-2 text-lg font-medium text-purple-600 dark:text-purple-400 hover:underline"
          >
            <span>Create your own</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
