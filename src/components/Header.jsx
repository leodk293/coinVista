"use client";
import React from "react";
import Logo from "./Logo";
import Link from "next/link";
import { useSession } from "next-auth/react";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { Skeleton } from "./ui/skeleton";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const { status, data:session } = useSession();
  const { setTheme } = useTheme();
  return (
    <div className="py-8 shadow w-full fixed top-0 left-0 z-50 bg-slate-100 dark:bg-gray-950 dark:border-b border-b-gray-900">
      <header className="max-w-6xl flex flex-wrap mx-auto justify-center gap-4 md:gap-0 md:justify-between">
        <Logo />

        <nav className="flex flex-row text-lg self-center font-medium gap-3">
          <Link href={"/"}>Linkedin</Link>
          <Link href={"/"}>X/Twitter</Link>
          <Link href={"/"}>Facebook</Link>
        </nav>

        <div className="flex flex-row self-center gap-2">
          {status === "authenticated" ? (
            <LogoutButton />
          ) : status === "unauthenticated" ? (
            <LoginButton />
          ) : (
            <div className="flex items-center self-center gap-3 px-3 py-2 bg-white/10 rounded-full border border-gray-300/10 min-w-[160px] animate-pulse">
              <Skeleton className="h-6 w-6 rounded-full bg-gray-300/30" />
              <div className="flex flex-col gap-2 flex-1">
                <Skeleton className="h-3 w-18 rounded bg-gray-300/30" />
                <Skeleton className="h-2 w-12 rounded bg-gray-300/20" />
              </div>
            </div>
          )}
          <DropdownMenu className=" self-center">
            <DropdownMenuTrigger asChild>
              <Button className="cursor-pointer self-center" variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </div>
  );
}
