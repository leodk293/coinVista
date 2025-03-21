"use client";
import React from "react";
import Nav from "../components/Nav/Nav";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Images, Download } from "lucide-react";
import models from "./models";
import { PencilRuler, X, Sparkles } from "lucide-react";
import { nanoid } from "nanoid";
import HistoryBtn from "../components/HistoryBtn";
import examplePrompts from "./prompt";

export default function Page() {
  const { data: session } = useSession();

  const [imageCount, setImageCount] = useState("1");
  const [model, setModel] = useState("");
  const [ratio, setRatio] = useState("");
  const [prompt, setPrompt] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tabImage, setTabImage] = useState([]);

  // Map aspect ratios to their numeric values
  const ratioMapping = {
    "Square (1:1)": { width: 512, height: 512 },
    "Landscape (16:9)": { width: 576, height: 320 },
    "Portrait (9:16)": { width: 320, height: 576 }
  };

  function generateRandomPrompt() {
    const randomIndex = Math.floor(Math.random() * examplePrompts.length);
    setPrompt(examplePrompts[randomIndex]);
  }

  async function generateImage(prompt, generatingModel, count, aspectRatio) {
    try {
      // Clear previous images when generating new ones
      setTabImage([]);
      
      // Get the width and height based on the selected ratio
      const dimensions = ratioMapping[aspectRatio] || { width: 512, height: 512 };
      
      // Prepare the request data
      const requestData = {
        inputs: prompt,
        parameters: {
          negative_prompt: "blurry, bad quality, distorted, disfigured",
          num_inference_steps: 30,
          width: dimensions.width,
          height: dimensions.height
        }
      };

      // Generate the specified number of images
      const generatedImages = [];
      
      for (let i = 0; i < parseInt(count); i++) {
        const response = await fetch(
          `https://router.huggingface.co/${generatingModel}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY}`,
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(requestData),
          }
        );

        if (!response.ok) {
          throw new Error(`Error generating image: ${response.statusText}`);
        }

        // Convert the response to a Blob
        const result = await response.blob();

        // Create a URL from the Blob
        const imageUrl = URL.createObjectURL(result);
        console.log(`Image ${i+1} generated successfully`);
        
        // Add unique ID to each image for management
        generatedImages.push({
          id: nanoid(),
          url: imageUrl,
          prompt: prompt,
          model: generatingModel,
          ratio: aspectRatio
        });
      }
      
      setTabImage(generatedImages);
      return generatedImages;
    } catch (error) {
      console.error("Error generating images:", error);
      return [];
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!session?.user?.id) {
      console.log("Please sign in to generate images");
      return;
    }

    setIsSubmitting(true);

    try {
      const promptData = {
        content: prompt,
        imageCount,
        model,
        ratio,
        userId: session.user.id,
      };

      const saveResponse = await fetch("/api/prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(promptData),
      });

      if (!saveResponse.ok) {
        throw new Error("Failed to save prompt history");
      }
      
      // Generate the images with proper parameters
      await generateImage(prompt, model, imageCount, ratio);

      console.log("Successfully generated images with:", {
        prompt,
        model,
        ratio,
        imageCount,
      });
    } catch (error) {
      console.error("Error in form submission:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  function clearPrompt() {
    setPrompt("");
  }
  
  // Function to download an image
  const downloadImage = (imageUrl, index) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `generated-image-${index}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Nav />

      <HistoryBtn />
      <main className="flex flex-col gap-4 mx-auto max-w-4xl">
        <div className="text-center mt-10">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome,{" "}
            <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              {session?.user?.name || "Creator"}
            </span>
          </h1>
          <p className="text-gray-600 mt-2">
            What would you like to create today?
          </p>
        </div>

        <form
          className="flex flex-col gap-4 border border-transparent shadow p-3 rounded-[5px] bg-white w-full"
          onSubmit={handleSubmit}
        >
          <div className="border border-transparent p-2 rounded-[5px] bg-[#653bfc] flex flex-row gap-5">
            <div className="border border-transparent p-2 rounded-[5px] bg-white">
              <PencilRuler size={32} color="#653bfc" strokeWidth={1.75} />
            </div>
            <h1 className="text-gray-50 text-2xl font-bold self-center">
              AI-IMAGE-CREATOR
            </h1>
          </div>

          <div className="relative">
            <textarea
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              required
              placeholder="Describe the image you want to create... (e.g., 'A magical forest with glowing mushrooms, cinematic lighting')"
              className="w-full h-32 px-4 py-3 text-gray-700 bg-gray-50 rounded-lg border border-gray-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 focus:outline-none transition duration-200 text-lg resize-none"
            />
            <div className="absolute bottom-3 right-3 flex space-x-2">
              <button
                type="button"
                className="text-gray-400 cursor-pointer hover:text-violet-600 transition-colors"
                title="Clear input"
                onClick={clearPrompt}
              >
                <X size={18} />
              </button>
              <button
                onClick={generateRandomPrompt}
                type="button"
                className="text-gray-400 cursor-pointer hover:text-violet-600 transition-colors"
                title="Add inspiration"
              >
                <Sparkles size={18} />
              </button>
            </div>
          </div>

          <div className="flex-grow flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <select
              value={model}
              onChange={(event) => setModel(event.target.value)}
              className="flex-grow cursor-pointer px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:border-violet-400 focus:outline-none transition"
            >
              <option value="">Select AI Model</option>
              {models.map((model) => (
                <option key={nanoid()} value={model.link}>
                  {model.name}
                </option>
              ))}
            </select>

            <select
              value={ratio}
              onChange={(event) => setRatio(event.target.value)}
              className="flex-grow cursor-pointer px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:border-violet-400 focus:outline-none transition"
            >
              <option value="">Aspect Ratio</option>
              <option value="Square (1:1)">Square (1:1)</option>
              <option value="Landscape (16:9)">Landscape (16:9)</option>
              <option value="Portrait (9:16)">Portrait (9:16)</option>
            </select>

            <select
              value={imageCount}
              onChange={(event) => setImageCount(event.target.value)}
              className="flex-grow cursor-pointer px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:border-violet-400 focus:outline-none transition"
            >
              <option value="1">1 Image</option>
              <option value="2">2 Images</option>
              <option value="3">3 Images</option>
              <option value="4">4 Images</option>
            </select>

            <button
              type="submit"
              disabled={
                isSubmitting ||
                imageCount === "" ||
                ratio === "" ||
                model === "" ||
                prompt === "" ||
                !session?.user?.id
              }
              className={`${
                isSubmitting ||
                imageCount === "" ||
                ratio === "" ||
                model === "" ||
                prompt === "" ||
                !session?.user?.id
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#653bfc] cursor-pointer hover:bg-[#5933e8]"
              } px-5 border border-transparent rounded-[5px] text-white font-semibold flex items-center justify-center transition-colors`}
            >
              {isSubmitting ? "Generating..." : "Generate"}
            </button>
          </div>
        </form>

        {tabImage.length === 0 ? (
          <div className="flex items-center justify-center h-[16rem] border border-gray-200 bg-gray-50 rounded-[5px]">
            <div className="flex flex-col items-center gap-3">
              <Images size={40} color="#653bfc" strokeWidth={1.5} />
              <p className="font-semibold text-gray-800">
                No images generated yet...
              </p>
              <p className="text-gray-600 text-sm max-w-md text-center">
                Select a model, aspect ratio, and enter a prompt to create your AI-generated images.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-4">
            {tabImage.map((image, index) => (
              <div key={image.id} className="relative group">
                <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                  <div className="aspect-square relative">
                    <img
                      src={image.url}
                      alt={`Generated image ${index + 1}`}
                      className="object-cover w-full h-full rounded-t-lg"
                    />
                  </div>
                  <div className="p-2 flex justify-between items-center">
                    <div className="text-xs text-gray-600 truncate max-w-[70%]">
                      {prompt.substring(0, 20)}{prompt.length > 20 ? "..." : ""}
                    </div>
                    <button
                      onClick={() => downloadImage(image.url, index + 1)}
                      className="p-1 rounded-full bg-gray-100 hover:bg-[#653bfc] hover:text-white transition-colors"
                      title="Download image"
                    >
                      <Download size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}