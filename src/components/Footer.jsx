"use client";
import React from "react";
import Logo from "./Logo";
import Link from "next/link";
import {
  Twitter,
  Facebook,
  Linkedin,
  Github,
  ArrowUp,
  Heart,
  Sparkles,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    {
      href: "https://x.com/Aboubac48530295",
      icon: Twitter,
      label: "Twitter",
      color: "hover:text-sky-400",
    },
    {
      href: "https://www.facebook.com/profile.php?id=100092315485742",
      icon: Facebook,
      label: "Facebook",
      color: "hover:text-blue-600",
    },
    {
      href: "https://www.linkedin.com/in/aboubacar-traore-495736252",
      icon: Linkedin,
      label: "LinkedIn",
      color: "hover:text-blue-500",
    },
    {
      href: "https://github.com/leodk293",
      icon: Github,
      label: "GitHub",
      color: "hover:text-gray-900 dark:hover:text-white",
    },
  ];

  return (
    <footer className="relative mt-20 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-gray-950 dark:via-slate-900 dark:to-blue-950/30 border-t border-gray-200/40 dark:border-gray-700/40 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/5 dark:bg-blue-400/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/5 dark:bg-purple-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/3 to-purple-500/3 dark:from-blue-400/3 dark:to-purple-400/3 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 flex flex-col items-center space-y-8">
          {/* Logo with enhanced styling */}
          <div className="group transform hover:scale-105 transition-all duration-500 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 dark:from-blue-400/20 dark:to-purple-400/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg group-hover:shadow-2xl transition-all duration-500">
              <Logo />
            </div>
          </div>

          {/* Enhanced Social Media Section */}
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 font-medium">
              <Sparkles className="h-4 w-4 text-blue-500 animate-pulse" />
              <span>Connect with us</span>
              <Sparkles className="h-4 w-4 text-purple-500 animate-pulse delay-500" />
            </div>

            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className={`group relative p-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200/50 dark:border-gray-700/50 text-gray-600 dark:text-gray-400 ${social.color} transform hover:scale-110 transition-all duration-500 hover:-translate-y-2`}
                  aria-label={social.label}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-400/10 dark:to-purple-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <social.icon className="relative h-6 w-6 transition-transform duration-500 group-hover:rotate-12" />
                </Link>
              ))}
            </div>
          </div>

          {/* Enhanced Contact Link */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            <Link
              href="/contact"
              className="relative inline-flex items-center px-8 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>

          {/* Enhanced Scroll to Top */}
          <button
            onClick={scrollToTop}
            className="group relative p-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-500 hover:-translate-y-2 animate-pulse hover:animate-none"
            aria-label="Scroll to top"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
            <ArrowUp className="relative h-6 w-6 group-hover:animate-bounce transition-transform duration-500" />
          </button>
        </div>

        {/* Enhanced Copyright Section */}
        <div className="relative">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
          <div className="py-8 mt-8">
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 text-sm">
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                <span>© {currentYear} CryptoPlatform.</span>
                <span className="hidden md:inline">•</span>
                <div className="flex items-center space-x-1">
                  <span>Crafted with</span>
                  <Heart className="h-4 w-4 text-red-500 animate-pulse" />
                  <span>and passion by our team</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
