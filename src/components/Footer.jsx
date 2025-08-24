"use client";
import React from "react";
import Logo from "./Logo";
import Link from "next/link";
import {
  Twitter,
  Facebook,
  Linkedin,
  Github,
  Mail,
  Phone,
  MapPin,
  Heart,
  ArrowUp,
  TrendingUp,
  Shield,
  Zap,
  Globe,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const quickLinks = [
    { href: "/", label: "Home", icon: "🏠" },
    { href: "/about", label: "About", icon: "📖" },
    { href: "/markets", label: "Markets", icon: "📈" },
    { href: "/portfolio", label: "Portfolio", icon: "💼" },
    { href: "/news", label: "News", icon: "📰" },
    { href: "/contact", label: "Contact", icon: "📧" },
  ];

  const cryptoResources = [
    { href: "/learn", label: "Learn Crypto", icon: "🎓" },
    { href: "/trading", label: "Trading Guide", icon: "📊" },
    { href: "/security", label: "Security Tips", icon: "🔒" },
    { href: "/api", label: "API Docs", icon: "⚡" },
    { href: "/tools", label: "Tools", icon: "🛠️" },
    { href: "/faq", label: "FAQ", icon: "❓" },
  ];

  const socialLinks = [
    { href: "#", icon: Twitter, label: "Twitter", color: "hover:text-sky-400" },
    {
      href: "#",
      icon: Facebook,
      label: "Facebook",
      color: "hover:text-blue-600",
    },
    {
      href: "#",
      icon: Linkedin,
      label: "LinkedIn",
      color: "hover:text-blue-500",
    },
    {
      href: "#",
      icon: Github,
      label: "GitHub",
      color: "hover:text-gray-900 dark:hover:text-white",
    },
  ];

  const features = [
    { icon: Shield, text: "Bank-level Security", color: "text-green-500" },
    { icon: Zap, text: "Lightning Fast", color: "text-yellow-500" },
    { icon: Globe, text: "Global Access", color: "text-blue-500" },
    { icon: TrendingUp, text: "Real-time Data", color: "text-purple-500" },
  ];

  return (
    <footer className="relative mt-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 border-t border-gray-200/50 dark:border-gray-800/50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-r from-pink-500/10 to-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-0 w-48 h-48 bg-gradient-to-r from-green-500/10 to-teal-500/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <div className="lg:col-span-1 space-y-6">
              <div className="group transform hover:scale-105 transition-transform duration-300">
                <Logo />
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Your trusted cryptocurrency platform for trading, tracking, and
                learning about digital assets. Join millions of users worldwide.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400 group hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                  <Mail className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                  <span className="text-sm">support@cryptoplatform.com</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400 group hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                  <Phone className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                  <span className="text-sm">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400 group hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                  <MapPin className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                  <span className="text-sm">San Francisco, CA</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white relative">
                Quick Links
                <div className="absolute -bottom-2 left-0 w-8 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
              </h3>
              <nav className="space-y-3">
                {quickLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="group flex items-center space-x-3 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:translate-x-1"
                  >
                    <span className="text-sm group-hover:scale-110 transition-transform duration-200">
                      {link.icon}
                    </span>
                    <span className="text-sm font-medium">{link.label}</span>
                  </Link>
                ))}
              </nav>
            </div>

            {/* Crypto Resources */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white relative">
                Resources
                <div className="absolute -bottom-2 left-0 w-8 h-1 bg-gradient-to-r from-green-500 to-teal-500 rounded-full" />
              </h3>
              <nav className="space-y-3">
                {cryptoResources.map((resource, index) => (
                  <Link
                    key={index}
                    href={resource.href}
                    className="group flex items-center space-x-3 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-all duration-300 hover:translate-x-1"
                  >
                    <span className="text-sm group-hover:scale-110 transition-transform duration-200">
                      {resource.icon}
                    </span>
                    <span className="text-sm font-medium">
                      {resource.label}
                    </span>
                  </Link>
                ))}
              </nav>
            </div>

            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white relative">
                  Why Choose Us
                  <div className="absolute -bottom-2 left-0 w-8 h-1 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full" />
                </h3>
                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="group flex items-center space-x-3"
                    >
                      <feature.icon
                        className={`h-5 w-5 ${feature.color} group-hover:scale-110 transition-transform duration-200`}
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media & Bottom Section */}
        <div className="border-t border-gray-200/50 dark:border-gray-800/50 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
            {/* Social Links */}
            <div className="flex items-center space-x-6">
              <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                Follow us:
              </span>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <Link
                    key={index}
                    href={social.href}
                    className={`group p-3 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg border border-gray-200/50 dark:border-gray-700/50 text-gray-600 dark:text-gray-400 ${social.color} transform hover:scale-110 transition-all duration-300 hover:-translate-y-1`}
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Scroll to Top Button */}
            <button
              onClick={scrollToTop}
              className="group cursor-pointer p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 hover:-translate-y-1"
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-5 w-5 group-hover:animate-bounce" />
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200/30 dark:border-gray-800/30 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <span>© {currentYear} CryptoPlatform. Made with</span>
              <Heart className="h-4 w-4 text-red-500 animate-pulse" />
              <span>by our team.</span>
            </div>

            <div className="flex items-center space-x-6">
              <Link
                href="/privacy"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
