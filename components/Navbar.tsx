"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "홈", href: "/" },
    { label: "게시판", href: "/board" },
    { label: "뉴스", href: "/news" },
    { label: "일정", href: "/schedule" },
    { label: "결과", href: "/results" },
    { label: "순위", href: "/standings" },
    { label: "드라이버", href: "/drivers" },
    { label: "팀", href: "/teams" },
    { label: "동영상", href: "/videos" },
  ];

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <nav
      className={`bg-dark/95 backdrop-blur-md border-b border-dark-lighter sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "shadow-lg shadow-primary/10" : ""
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded flex items-center justify-center shadow-lg shadow-primary/50 group-hover:shadow-primary/80 transition-all duration-300 group-hover:scale-110">
              <span className="text-white font-bold text-xl">F1</span>
            </div>
            <span className="text-xl font-bold hidden sm:block bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Dashboard
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative px-4 py-2 text-sm font-medium text-gray-300 hover:text-white rounded-md transition-all duration-300 group"
                style={{
                  animationDelay: `${index * 0.05}s`,
                }}
              >
                <span className="relative z-10">{item.label}</span>
                <span className="absolute inset-0 bg-primary/20 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></span>
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-3/4 transition-all duration-300"></span>
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-gray-300 hover:text-white hover:bg-dark-light transition-all duration-300 hover:rotate-180 hover:scale-110"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-300 hover:text-white hover:bg-dark-light transition-all duration-300"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X size={24} className="animate-fade-in" />
              ) : (
                <Menu size={24} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 border-t border-dark-lighter space-y-2">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-dark-light rounded-md transition-all duration-300 hover:translate-x-2 hover:shadow-lg hover:shadow-primary/20"
                onClick={() => setIsMenuOpen(false)}
                style={{
                  animationDelay: `${index * 0.05}s`,
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
