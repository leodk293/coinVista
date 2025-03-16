"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import googleLogo from "../assets/google-logo.png";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

const SignUp = () => {
  const { status, data: session } = useSession();

  async function handleSignin() {
    try {
      await signIn("google", {
        callbackUrl: "/ai-image-creator",
      });
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Left Content Section */}
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-16">
        <div className="max-w-md mx-auto">
          {/* Logo */}
          <div className="mb-8">
            <div className="h-10 w-10 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            </div>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">
            Welcome to AI Image Generator
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Sign in and start creating stunning AI-generated images instantly
          </p>

          <div className="space-y-4">
            <button
              onClick={handleSignin}
              className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-md bg-white px-4 py-3 text-gray-700 shadow-md hover:shadow-lg transition-all border border-gray-300"
            >
              <Image
                src={googleLogo}
                alt="Google"
                width={20}
                height={20}
                className="object-contain"
              />
              <span className="font-medium">Sign in with Google</span>
            </button>

            {/* <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <button className=" cursor-pointer mt-6 flex w-full items-center justify-center gap-3 rounded-md bg-white px-4 py-3 text-gray-700 shadow-md hover:shadow-lg transition-all border border-gray-300">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.489.5.092.682-.217.682-.48 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.933.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                  ></path>
                </svg>
                <span className=" font-medium">Sign in with GitHub</span>
              </button>
            </div> */}

            <p className="text-center text-sm text-gray-500 mt-6">
              By signing in, you agree to our{" "}
              <Link
                href="#"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="#"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="hidden md:flex flex-1 bg-gradient-to-br from-purple-600 to-blue-500 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="relative w-full max-w-lg">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

            <div className="relative bg-white bg-opacity-10 rounded-2xl backdrop-filter backdrop-blur-sm p-8 border border-white border-opacity-20 shadow-xl">
              <h2 className="text-2xl font-bold text-white mb-4">
                Create stunning AI images
              </h2>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="aspect-square rounded-lg bg-gradient-to-br from-pink-500 to-purple-600"></div>
                <div className="aspect-square rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400"></div>
                <div className="aspect-square rounded-lg bg-gradient-to-br from-amber-500 to-pink-500"></div>
                <div className="aspect-square rounded-lg bg-gradient-to-br from-green-400 to-blue-500"></div>
              </div>

              <p className="text-black font-semibold text-opacity-90">
                Transform your ideas into beautiful visuals with our advanced AI
                technology.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
