"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";
import { Button } from "../ui/Button";

interface HeaderProps {
  transparent?: boolean;
}

export function Header({ transparent = false }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/#features" },
    { name: "About", href: "/#about" },
    { name: "Contact", href: "/#contact" },
  ];

  const dashboardNavigation = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Disease Detection", href: "/disease-detection" },
    { name: "Weather", href: "/weather" },
    { name: "Market Prices", href: "/market-prices" },
    { name: "Chat", href: "/chat" },
  ];

  const currentNav = isAuthenticated ? dashboardNavigation : navigation;

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled || !transparent
          ? "bg-black/60 backdrop-blur-2xl shadow-lg"
          : "bg-transparent",
        transparent && !isScrolled && "text-white"
      )}
      style={isScrolled ? { backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' } : {}}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center group">
            {/* Black box with leaf icon (like YouTube red box) */}
            <div className="bg-black rounded-lg p-3 flex items-center justify-center">
              <img
                src="/images/Gemini_Generated_Image_4tx5xo4tx5xo4tx5.png"
                alt="AgriAdvisor"
                className="h-12 w-24"
              />
            </div>
            {/* Text next to the black box */}
            <motion.span
              className="ml-3 text-3xl font-bold bg-gradient-to-r from-primary-500 to-primary-400 bg-clip-text text-transparent"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              AgriAdvisor
            </motion.span>
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            {currentNav.map((item) => (
              <Link key={item.name} href={item.href}>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "text-sm font-medium text-white hover:bg-white/10",
                    isScrolled && "text-gray-200"
                  )}
                >
                  {item.name}
                </Button>
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              <>
                <Link href="/profile">
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                    <User className="h-4 w-4" />
                    Profile
                  </Button>
                </Link>
                <Button variant="outline" size="sm" onClick={() => setIsAuthenticated(false)} className="text-white border-white/20 hover:bg-white/10 hover:text-white-200">
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm" className="bg-primary-500 hover:bg-primary-600 text-white border-0">Get Started</Button>
                </Link>
              </>
            )}
          </div>

          <button className="md:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colors" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu">
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }} className="md:hidden overflow-hidden border-t border-neutral-200 bg-white">
              <div className="py-4 space-y-2">
                {currentNav.map((item) => (
                  <Link key={item.name} href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                    <div className="block px-4 py-2 text-base font-medium text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors">
                      {item.name}
                    </div>
                  </Link>
                ))}
                <div className="border-t border-neutral-200 my-2" />
                {isAuthenticated ? (
                  <>
                    <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                      <div className="block px-4 py-2 text-base font-medium text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors">
                        Profile
                      </div>
                    </Link>
                    <button onClick={() => { setIsAuthenticated(false); setIsMobileMenuOpen(false); }} className="w-full text-left block px-4 py-2 text-base font-medium text-error hover:bg-neutral-100 rounded-lg transition-colors">
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                      <div className="block px-4 py-2 text-base font-medium text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors">
                        Login
                      </div>
                    </Link>
                    <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                      <div className="block px-4 py-2 text-base font-medium text-primary-600 hover:bg-neutral-100 rounded-lg transition-colors">
                        Get Started
                      </div>
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isScrolled && !isAuthenticated && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="absolute right-4 top-4 hidden lg:block">
              <Link href="/signup">
                <Button size="sm" className="shadow-lg">
                  Start Free
                </Button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </motion.header>
  );
}
