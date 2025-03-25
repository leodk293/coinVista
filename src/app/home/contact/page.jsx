"use client";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { CircleUserRound } from "lucide-react";

const ContactPage = () => {
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_API_KEY);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(Object.fromEntries(formData)),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      if (result.success) {
        toast.success("Message sent successfully!");
        event.target.reset();
      } else {
        toast.error(result.message || "Failed to send message");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Submission error:", error);
    }
  }

  return (
    <main className="flex flex-col md:flex-row gap-8 py-12 px-4 mx-auto max-w-6xl">
      <form
        className="w-full md:w-1/2 bg-white border border-gray-200 rounded-lg shadow-lg p-8 transition-all duration-300 hover:shadow-xl"
        onSubmit={handleSubmit}
      >
        <h2 className=" flex flex-row gap-1 text-2xl font-bold text-gray-800 mb-6 text-center">
          <span className=" self-center">Contact Us </span>
          <CircleUserRound
            strokeWidth={2.3}
            className=" self-center"
            size={30}
            color="#000000"
          />
        </h2>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-2"
            >
              Name *
            </label>
            <input
              id="name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              placeholder="Enter your name"
              type="text"
              name="name"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email *
            </label>
            <input
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              placeholder="Enter your email"
              type="email"
              name="email"
              required
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-gray-700 font-medium mb-2"
            >
              Message *
            </label>
            <textarea
              id="message"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg min-h-[120px]"
              placeholder="Write your message"
              name="message"
              required
            ></textarea>
          </div>
          <button
            className="w-full bg-blue-600 cursor-pointer text-white py-3 rounded-md hover:bg-blue-700 transition-colors duration-300 font-semibold text-lg"
            type="submit"
          >
            Send Message
          </button>
        </div>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
      />

      <div className="w-full md:w-1/2 bg-gray-50 border border-gray-200 rounded-lg p-8 flex flex-col justify-center space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Let's Connect
          </h2>
          <p className="text-gray-600 mb-4">
            Feel free to reach out to us for any inquiries.
          </p>
        </div>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <span className="text-lg text-gray-700">+212 0619965635</span>
          </div>
          <div className="flex items-center space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span className="text-lg text-gray-700">
              aboubatraore04@gmail.com
            </span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
