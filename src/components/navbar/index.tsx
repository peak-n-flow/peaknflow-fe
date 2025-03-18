"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { disableNavbarFooter } from "@/lib/disable";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const [isTop, setIsTop] = useState(true);
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
  const pathname = usePathname();
  const [isSaleOpen, setIsSaleOpen] = useState(true);
  const { data } = useSession();

  const closeSale = () => {
    setIsSaleOpen(false);
  };

  useEffect(() => {
    setIsMobileDropdownOpen(false);
    setIsMobileMenuOpen(false);
    setIsServiceDropdownOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      setIsTop(currentScrollY === 0);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    !disableNavbarFooter.includes(pathname) &&
    disableNavbarFooter.includes("/admin") && (
      <>
        <header
          className={`fixed top-0 w-full z-50 transition-transform duration-500 ${
            showNavbar ? "translate-y-0" : "-translate-y-full"
          } ${
            isTop
              ? "bg-transparent backdrop-blur-3xl"
              : "bg-transparent backdrop-blur-3xl"
          }`}
        >
          {isSaleOpen && (
            <div className="bg-secondary-100 relative">
              <div className="w-full container h-8 py-2.5 flex justify-center items-center text-white text-xs">
                MEET FOUNDATION: THE ESSENTIAL SELF-CARE MEMBERSHIP.
              </div>
              <X
                onClick={closeSale}
                className="absolute top-2.5 right-4 w-6 h-6 text-white cursor-pointer"
              />
            </div>
          )}
          <nav className="container flex justify-between items-center py-4">
            <Link href={"/"}>
              <Image
                src={"/logo-nav.png"}
                alt="logo"
                className="invert brightness-0"
                width={60}
                height={40}
              />
            </Link>

            <div className="hidden md:flex space-x-12 items-center">
              <Link
                href="/"
                className="text-base font-light hover:text-primary-40 text-white"
              >
                Home
              </Link>
              <div className="relative">
                <button
                  className="flex items-center text-base font-light hover:text-primary-40 text-white"
                  onClick={() =>
                    setIsServiceDropdownOpen(!isServiceDropdownOpen)
                  }
                >
                  Services{" "}
                  {isServiceDropdownOpen ? (
                    <ChevronUp className="w-4 h-4 ml-1" />
                  ) : (
                    <ChevronDown className="w-4 h-4 ml-1" />
                  )}
                </button>
                {isServiceDropdownOpen && (
                  <div className="border-primary-60 border absolute left-20mt-2 w-48 bg-secondary-80 shadow-lg rounded-md overflow-hidden">
                    <Link
                      href="/service/gym"
                      className="block px-4 py-2 text-light-20 hover:bg-secondary-60"
                    >
                      Gym
                    </Link>
                    <Link
                      href="/service/recovery"
                      className="block px-4 py-2 text-light-20 hover:bg-secondary-60"
                    >
                      Recovery
                    </Link>
                    <Link
                      href="/service/yoga"
                      className="block px-4 py-2 text-light-20 hover:bg-gray-200"
                    >
                      Yoga
                    </Link>
                    <Link
                      href="/service/wellness-bar"
                      className="block px-4 py-2 text-light-20 hover:bg-gray-200"
                    >
                      Wellness Bar
                    </Link>
                  </div>
                )}
              </div>
              <Link
                href="/contact"
                className="text-base font-light hover:text-primary-40 text-white"
              >
                Contact
              </Link>
              <Link href={data?.user ? "/auth/logout" : "/auth/login"}>
                <Button>{data?.user ? "Logout" : "Login"}</Button>
              </Link>
            </div>

            <button
              className="md:hidden text-white hover:text-light-100"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-8 h-8" />
              ) : (
                <Menu className="w-8 h-8" />
              )}
            </button>
          </nav>
          <div
            className={`md:hidden origin-top bg-transparent backdrop-blur-3xl shadow-md transition-all duration-300 ease-in-out ${
              isMobileMenuOpen
                ? "opacity-90 scale-y-100 max-h-[300px]"
                : "opacity-90 scale-y-0 max-h-0"
            }`}
            style={{ transformOrigin: "top" }}
          >
            <ul className="flex flex-col space-y-4 py-4 px-6">
              <li>
                <Link
                  href="/"
                  className="text-base font-medium block text-white hover:text-primary-40"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <button
                  className="text-base font-medium flex items-center text-white hover:text-primary-40"
                  onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
                >
                  Services{" "}
                  {isMobileDropdownOpen ? (
                    <ChevronUp className="w-4 h-4 ml-1" />
                  ) : (
                    <ChevronDown className="w-4 h-4 ml-1" />
                  )}
                </button>
                {isMobileDropdownOpen && (
                  <ul className="pl-4 mt-2 space-y-2">
                    <li>
                      <Link
                        href="/service/gym"
                        className="block text-light-20 hover:text-primary-40"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Gym
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/service/recovery"
                        className="block text-light-20 hover:text-primary-40"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Recovery
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/service/yoga"
                        className="block text-light-20 hover:text-primary-40"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Yoga
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/service/wellness-bar"
                        className="block text-light-20 hover:text-primary-40"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Wellness Bar
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-base font-medium block text-white hover:text-primary-40"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link href={data?.user ? "/auth/logout" : "/auth/login"}>
                  <Button>{data?.user ? "Logout" : "Login"}</Button>
                </Link>
              </li>
            </ul>
          </div>
        </header>
      </>
    )
  );
};

export default Navbar;
