"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { disableNavbarFooter } from "@/lib/disable";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTop, setIsTop] = useState(true);
  const pathname = usePathname();
  const [isSaleOpen, setIsSaleOpen] = useState(true);

  const closeSale = () => {
    setIsSaleOpen(false);
  };
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      setIsTop(currentScrollY === 0); // Detect if at the top
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
  ];

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
              <div className="w-full container h-8 py-2.5 flex justify-center items-center text-white text-xs ">
                MEET FOUNDATION: THE ESSENTIAL SELF-CARE MEMBERSHIP.
              </div>
              <X
                onClick={closeSale}
                className="absolute top-2.5 right-4 w-6 h-6 text-white cursor-pointer"
              />
            </div>
          )}
          <nav className="container flex justify-between items-center py-4">
            <Image
              src={"/logo-nav.png"}
              alt="logo"
              className="invert brightness-0"
              width={60}
              height={40}
            />

            <div className="hidden md:flex space-x-12 items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-base font-thin hover:text-primary-40 ${
                    pathname === link.href
                      ? "font-medium text-primary-60"
                      : "text-white"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link href={"/booking"}>
                <Button>Book Now</Button>
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
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`text-base font-medium block ${
                      pathname === link.href
                        ? "text-primary-60"
                        : "text-white hover:text-primary-40"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </header>
      </>
    )
  );
};

export default Navbar;
