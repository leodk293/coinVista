"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Nav from "../components/Nav/Nav";
import {
  Pencil,
  Sparkles,
  ImagePlus,
  X,
  History,
  Clock,
  ChevronLeft,
  ChevronRight,
  Trash2,
} from "lucide-react";

const Ai_image_generator = () => {
  const { data: session } = useSession();
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [promptHistory, setPromptHistory] = useState([]);
  const [selectedModel, setSelectedModel] = useState("");
  const [aspectRatio, setAspectRatio] = useState("");
  const [imageCount, setImageCount] = useState(1);
  const [generatedImages, setGeneratedImages] = useState([]);
  const [error, setError] = useState(null);

  const examplePrompts = [
    "A magic forest with glowing plants and fairy homes among giant mushrooms",
    "An old steampunk airship floating through golden clouds at sunset",
    "A future Mars colony with glass domes and gardens against red mountains",
    "A dragon sleeping on gold coins in a crystal cave",
    "An underwater kingdom with siren and glowing coral buildings",
    "A floating island with waterfalls pouring into clouds below",
    "A witch's cottage in fall with magic herbs in the garden",
    "A robot painting in a sunny studio with art supplies around it",
    "A magical library with floating glowing books and spiral staircases",
    "A Japanese shrine during cherry blossom season with lanterns and misty mountains",
    "A cosmic beach with glowing sand and an aurora in the night sky",
    "A medieval marketplace with colorful tents and street performers",
    "A cyberpunk city with neon signs and flying cars at night",
    "A peaceful bamboo forest with a hidden ancient temple",
    "A giant turtle carrying a village on its back in the ocean",
  ];

  const generateImage = async (
    selectedModel,
    imageCount,
    aspectRatio,
    promptText
  ) => {
    setError(null);
    const { width, height } = getImagesDimensions(aspectRatio);

    // Map model selection to actual Hugging Face model IDs
    const modelMap = {
      "FLUX.1-dev": "black-forest-labs/FLUX.1-dev",
      "FLUX.1-schnell": "black-forest-labs/FLUX.1-schnell",
      "Stable Diffusion XL": "stabilityai/stable-diffusion-xl-base-1.0",
      "Stable Diffusion v1.5": "runwayml/stable-diffusion-v1-5",
      "Stable Diffusion 3": "stabilityai/stable-diffusion-3-medium",
      Openjourney: "prompthero/openjourney",
    };

    const modelId = modelMap[selectedModel] || selectedModel;

    const imagePromises = Array.from({ length: imageCount }, async () => {
      try {
        const response = await fetch(
          "https://router.huggingface.co/hf-inference/models/black-forest-labs/" + modelId,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY}`,
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
              inputs: promptText,
              parameters: {
                width,
                height,
                num_inference_steps: 50,
                guidance_scale: 7.5,
              },
            }),
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`API Error: ${response.status} - ${errorText}`);
        }

        const blob = await response.blob();
        return URL.createObjectURL(blob);
      } catch (error) {
        throw error;
      }
    });

    return Promise.allSettled(imagePromises);
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!prompt.trim() || !selectedModel || !aspectRatio) return;

    setIsGenerating(true);
    setGeneratedImages([]);

    try {
      const results = await generateImage(
        selectedModel,
        imageCount,
        aspectRatio,
        prompt
      );

      const successfulImages = results
        .filter((result) => result.status === "fulfilled")
        .map((result) => result.value);

      if (successfulImages.length === 0) {
        throw new Error("No images were generated successfully");
      }

      setGeneratedImages(successfulImages);

      const newPrompt = {
        id: Date.now(),
        text: prompt,
        timestamp: new Date().toLocaleTimeString(),
        model: selectedModel,
      };
      setPromptHistory([newPrompt, ...promptHistory]);
    } catch (error) {
      setError(error.message || "Failed to generate images. Please try again.");
      console.error("Error during image generation:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  function generateRandomPrompt() {
    const randomIndex = Math.floor(Math.random() * examplePrompts.length);
    setPrompt(examplePrompts[randomIndex]);
  }

  const getImagesDimensions = (aspectRatio, baseSize = 512) => {
    const [width, height] = aspectRatio.split("/").map(Number);
    const scaleFactor = baseSize / Math.sqrt(width * height);

    let calculatedWidth = Math.round(width * scaleFactor);
    let calculatedHeight = Math.round(height * scaleFactor);

    calculatedWidth = Math.floor(calculatedWidth / 16) * 16;
    calculatedHeight = Math.floor(calculatedHeight / 16) * 16;

    return {
      width: calculatedWidth,
      height: calculatedHeight,
    };
  };

  const loadPrompt = (promptText) => {
    setPrompt(promptText);
  };

  const deletePrompt = (id) => {
    setPromptHistory(promptHistory.filter((item) => item.id !== id));
  };

  const handleAspectRatioChange = (e) => {
    const value = e.target.value;
    if (value === "Square (1:1)") {
      setAspectRatio("1/1");
    } else if (value === "Landscape (16:9)") {
      setAspectRatio("16/9");
    } else if (value === "Portrait (9:16)") {
      setAspectRatio("9/16");
    } else {
      setAspectRatio("");
    }
  };

  return (
    <>
      <Nav />
      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        <aside
          className={`
            fixed md:relative z-10 h-full md:h-auto bg-white border-r border-gray-200 shadow-lg md:shadow-none
            transition-all duration-300 ease-in-out
            ${
              sidebarOpen
                ? "w-64 translate-x-0"
                : "w-0 -translate-x-full md:w-12 md:translate-x-0"
            }
          `}
        >
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h2
                className={`font-semibold text-gray-800 flex items-center ${
                  !sidebarOpen && "md:hidden"
                }`}
              >
                <History size={18} className="mr-2 text-violet-600" />
                Prompt History
              </h2>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-gray-500 cursor-pointer hover:text-violet-600 transition-colors"
              >
                {sidebarOpen ? (
                  <ChevronLeft size={20} />
                ) : (
                  <ChevronRight size={20} className="hidden md:block" />
                )}
              </button>
            </div>

            <div
              className={`flex-1 overflow-y-auto ${
                !sidebarOpen && "md:hidden"
              }`}
            >
              {promptHistory.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {promptHistory.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <button
                          onClick={() => loadPrompt(item.text)}
                          className="text-left group flex-1"
                        >
                          <p className="text-sm font-medium text-gray-800 line-clamp-2 group-hover:text-violet-600 transition-colors">
                            {item.text}
                          </p>
                        </button>
                        <button
                          onClick={() => deletePrompt(item.id)}
                          className="ml-2 text-gray-400 hover:text-red-500 transition-colors"
                          title="Delete prompt"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="flex items-center mt-2 text-xs text-gray-500">
                        <Clock size={12} className="mr-1" />
                        <span>{item.timestamp}</span>
                        <span className="ml-2 px-1.5 py-0.5 bg-gray-100 rounded text-gray-600">
                          {item.model}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-gray-500 text-sm">
                  <p>No prompt history yet</p>
                </div>
              )}
            </div>
          </div>
        </aside>

        <main className="flex-1 p-4 md:p-8">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden mb-4 flex items-center text-gray-600 hover:text-violet-600 transition-colors"
            >
              <History size={18} className="mr-1" />
              <span className="text-sm">
                {sidebarOpen ? "Hide History" : "Show History"}
              </span>
            </button>

            <div className="text-center mb-8">
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

            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-violet-600 to-purple-700 p-4 flex items-center">
                <div className="bg-white bg-opacity-20 p-2 rounded-lg mr-3">
                  <Pencil size={32} className="text-violet-600" />
                </div>
                <h2 className="text-xl font-bold text-white">
                  AI IMAGE GENERATOR
                </h2>
              </div>

              <div className="p-6">
                <form onSubmit={handleGenerate}>
                  <div className="mb-6 relative">
                    <textarea
                      placeholder="Describe the image you want to create... (e.g., 'A magical forest with glowing mushrooms, cinematic lighting')"
                      className="w-full h-32 px-4 py-3 text-gray-700 bg-gray-50 rounded-lg border border-gray-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 focus:outline-none transition duration-200 text-lg resize-none"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                    />
                    <div className="absolute bottom-3 right-3 flex space-x-2">
                      <button
                        type="button"
                        className="text-gray-400 cursor-pointer hover:text-violet-600 transition-colors"
                        title="Clear input"
                        onClick={() => setPrompt("")}
                      >
                        <X size={18} />
                      </button>
                      <button
                        type="button"
                        className="text-gray-400 cursor-pointer hover:text-violet-600 transition-colors"
                        title="Add inspiration"
                        onClick={generateRandomPrompt}
                      >
                        <Sparkles size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row md:gap-3 md:items-center space-y-4 md:space-y-0">
                    <div className="flex-grow flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                      <select
                        className="flex-grow cursor-pointer px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:border-violet-400 focus:outline-none transition"
                        value={selectedModel}
                        onChange={(e) => setSelectedModel(e.target.value)}
                      >
                        <option value="">Select AI Model</option>
                        <option value="FLUX.1-dev">FLUX.1-dev</option>
                        <option value="FLUX.1-schnell">FLUX.1-schnell</option>
                        <option value="Stable Diffusion XL">
                          Stable Diffusion XL
                        </option>
                        <option value="Stable Diffusion v1.5">
                          Stable Diffusion v1.5
                        </option>
                        <option value="Stable Diffusion 3">
                          Stable Diffusion 3
                        </option>
                        <option value="Openjourney">Openjourney</option>
                      </select>

                      <select
                        className="flex-grow cursor-pointer px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:border-violet-400 focus:outline-none transition"
                        onChange={handleAspectRatioChange}
                      >
                        <option value="">Aspect Ratio</option>
                        <option value="Square (1:1)">Square (1:1)</option>
                        <option value="Landscape (16:9)">
                          Landscape (16:9)
                        </option>
                        <option value="Portrait (9:16)">Portrait (9:16)</option>
                      </select>

                      <select
                        className="flex-grow cursor-pointer px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:border-violet-400 focus:outline-none transition"
                        value={imageCount}
                        onChange={(e) => setImageCount(Number(e.target.value))}
                      >
                        <option value="1">1 Image</option>
                        <option value="2">2 Images</option>
                        <option value="3">3 Images</option>
                        <option value="4">4 Images</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={
                        isGenerating ||
                        !prompt.trim() ||
                        !selectedModel ||
                        !aspectRatio
                      }
                      className={`px-6 py-2 rounded-lg font-medium text-white transition-all flex items-center justify-center
                        ${
                          isGenerating ||
                          !prompt.trim() ||
                          !selectedModel ||
                          !aspectRatio
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-gradient-to-r from-violet-600 to-purple-600 hover:shadow-md"
                        }`}
                    >
                      {isGenerating ? (
                        <>
                          <div className="mr-2 h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                          Generating...
                        </>
                      ) : (
                        <>
                          <ImagePlus size={18} className="mr-2" />
                          Generate Image
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Image Display Section */}
            <div className="mt-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Generated Images
              </h2>
              {error && (
                <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
                  {error}
                </div>
              )}
              {isGenerating && (
                <div className="text-center text-gray-600">
                  Generating images, please wait...
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {generatedImages.map((imageUrl, index) => (
                  <div key={index} className="relative">
                    <img
                      src={imageUrl}
                      alt={`Generated image ${index + 1}`}
                      className="w-full h-auto rounded-lg shadow-md"
                    />
                  </div>
                ))}
                {generatedImages.length === 0 && !isGenerating && !error && (
                  <p className="text-gray-500 text-center col-span-full">
                    No images generated yet
                  </p>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Ai_image_generator;
