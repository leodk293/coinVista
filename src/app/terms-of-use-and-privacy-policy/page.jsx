import React from "react";
import Link from "next/link";

export default function TermsOfUsePageAndPrivacy() {
  return (
    <main className="mt-10 px-6 mx-auto max-w-5xl text-gray-900">
      <section
        id="terms-of-use"
        className="bg-gray-50 p-8 rounded-lg shadow-md"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-black">
          Terms of Use
        </h1>
        <p className="mt-4 text-lg">
          Welcome to <span className="font-semibold">AI-IMAGE-CREATOR✨</span>.
          By accessing or using our AI image generator web app, you agree to
          comply with these Terms of Use. If you do not agree, please do not use
          the Service.
        </p>

        <h2 className="mt-6 text-2xl font-bold text-gray-900">
          1. Use of the Service
        </h2>
        <ul className="mt-2 list-disc pl-6 space-y-2 text-gray-700">
          <li>You must be at least 13 years old to use this Service.</li>
          <li>
            You are responsible for all activity conducted under your account.
          </li>
          <li>
            Do not use the Service for illegal, harmful, or unethical purposes,
            such as:
          </li>
          <ul className="list-disc pl-6 space-y-1 text-gray-600">
            <li>
              Generating or distributing illegal, violent, or misleading
              content.
            </li>
            <li>Violating intellectual property rights.</li>
            <li>Impersonating others or engaging in fraud.</li>
            <li>Bypassing security measures or disrupting the Service.</li>
          </ul>
        </ul>

        <h2 className="mt-6 text-2xl font-bold text-gray-900">
          2. Ownership & Intellectual Property
        </h2>
        <p className="mt-2">
          You own the rights to the images you create but grant us a
          non-exclusive, worldwide, royalty-free license for promotional and
          research purposes unless you opt out.
        </p>

        <h2 className="mt-6 text-2xl font-bold text-gray-900">
          3. Disclaimers & Limitation of Liability
        </h2>
        <p className="mt-2">
          The Service is provided "as is" without garranties of any kind.
        </p>

        <h2 className="mt-6 text-2xl font-bold text-gray-900">4. Contact Us</h2>
        <p className="mt-2">
          For questions, contact us at{" "}
          <span className=" font-bold">aboubatraore04@gmail.com</span>.
        </p>
      </section>

      {/* Privacy Policy Section */}
      <section
        id="privacy-policy"
        className="bg-gray-50 p-8 mt-10 mb-10 rounded-lg shadow-md"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-black">
          Privacy Policy
        </h1>
        <p className="mt-4 text-lg">
          This Privacy Policy explains how{" "}
          <span className="font-semibold">AI-IMAGE-CREATOR✨</span> collects,
          uses, and protects your personal information.
        </p>

        <h2 className="mt-6 text-2xl font-bold text-gray-900">
          1. Information We Collect
        </h2>
        <ul className="mt-2 list-disc pl-6 space-y-2 text-gray-700">
          <li>Personal details like name & email when signing up.</li>
          <li>Third-party login data (e.g., Google profile info).</li>
        </ul>

        <h2 className="mt-6 text-2xl font-bold text-gray-900">
          2. Sharing Your Information
        </h2>
        <ul className="mt-2 list-disc pl-6 space-y-2 text-gray-700">
          <li>We do not sell your data.</li>
          <li>
            May share data with analytics providers (Google Analytics, etc.).
          </li>
        </ul>

        <h2 className="mt-6 text-2xl font-bold text-gray-900">3. Contact Us</h2>
        <p className="mt-2">
          For privacy concerns, email us at{" "}
          <span className=" font-bold">aboubatraore04@gmail.com</span>.
        </p>
      </section>
    </main>
  );
}
