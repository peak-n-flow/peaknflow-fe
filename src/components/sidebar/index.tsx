"use client";

import type React from "react";

import { useState, useEffect } from "react";
import {
  LayoutGrid,
  Clock,
  FileText,
  Gift,
  User,
  LogOut,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useMobile } from "@/hooks/use-mobile";

interface NavItem {
  title: string;
  icon: React.ElementType;
  href: string;
  active?: boolean;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    title: "MANAJEMEN BISNIS",
    items: [
      {
        title: "Overview",
        icon: LayoutGrid,
        href: "#",
      },
      {
        title: "Schedule",
        icon: Clock,
        href: "#",
      },
      {
        title: "Transaction list",
        icon: FileText,
        href: "#",
        active: true,
      },
      {
        title: "Voucher",
        icon: Gift,
        href: "#",
      },
    ],
  },
  {
    title: "MANAJEMEN USER",
    items: [
      {
        title: "User",
        icon: User,
        href: "#",
      },
    ],
  },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const isMobile = useMobile();

  // Close sidebar by default on mobile/tablet
  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, [isMobile]);

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Toggle button for mobile */}
      {isMobile && (
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-black text-white transition-transform duration-300",
          isMobile && !isOpen && "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 text-center">
            <h1 className="text-xl font-semibold">Peak&Flow</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 space-y-8">
            {navSections.map((section) => (
              <div key={section.title} className="space-y-2">
                <h2 className="text-xs tracking-wider text-gray-500 font-medium px-2">
                  {section.title}
                </h2>
                <ul className="space-y-1">
                  {section.items.map((item) => (
                    <li key={item.title}>
                      <a
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                          item.active ? "bg-zinc-700/50" : "hover:bg-zinc-800"
                        )}
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          {/* User profile */}
          <div className="p-4 mt-auto border-t border-zinc-800">
            <div className="flex items-center gap-3 mb-4">
              <Avatar>
                <AvatarImage
                  src="/placeholder.svg?height=40&width=40"
                  alt="User avatar"
                />
                <AvatarFallback>JB</AvatarFallback>
              </Avatar>
              <div className="flex flex-col text-sm">
                <span className="font-medium">Jaxson Botosh</span>
                <span className="text-xs text-gray-400">
                  jaxsonbotosh@gmail.com
                </span>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full border-zinc-700 text-white hover:bg-zinc-800 hover:text-white"
            >
              <LogOut className="h-4 w-4 mr-2" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
