"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import Logo from "@/assets/img/logo/MainTitle.png";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "홈", href: "/" },
  { label: "일정", href: "/schedule" },
  { label: "결과", href: "/#race-results" },
  { label: "뉴스", href: "/news" },
];

function isNavItemActive(
  item: (typeof navItems)[number],
  pathname: string,
  hash: string,
) {
  if (item.href === "/news") {
    return pathname === "/news";
  }
  if (item.href === "/schedule") {
    return pathname === "/schedule";
  }
  if (item.href === "/#race-results") {
    return pathname === "/" && hash === "#race-results";
  }
  if (item.href === "/") {
    return pathname === "/" && hash !== "#race-results";
  }
  return pathname === item.href;
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [hash, setHash] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const updateHash = () => setHash(window.location.hash);
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, [pathname]);

  const isNewsPage = pathname === "/news";

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  const linkClassName = (active: boolean) =>
    `relative px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-300 group ${
      active
        ? "text-primary"
        : "text-gray-700 hover:text-primary"
    }`;

  return (
    <nav
      className={`bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 transition-all duration-300 shadow-sm ${
        scrolled ? "shadow-lg shadow-primary/10" : ""
      } ${isNewsPage ? "bg-[#f4f1ea] transition-all duration-300" : ""}`}
    >
      <div className="container mx-auto min-w-0 px-3 sm:px-4">
        <div className="flex h-16 min-w-0 items-center justify-between gap-2">
          <div className="flex min-w-0 shrink">
            <Link href="/" className="block min-w-0">
              <Image
                src={Logo}
                alt="Logo"
                width={300}
                height={200}
                sizes="(max-width: 640px) 140px, (max-width: 768px) 180px, 260px"
                className={`h-8 w-auto max-w-[140px] object-contain object-left sm:h-9 sm:max-w-[180px] md:h-10 md:max-w-[240px] lg:max-w-[280px] ${
                  isNewsPage
                    ? "grayscale transition-all duration-300 hover:grayscale-0"
                    : ""
                }`}
                priority
              />
            </Link>
          </div>

          <div className="flex min-w-0 flex-shrink-0 items-center gap-1 sm:gap-3">
            <div className="hidden items-center space-x-1 md:flex">
              {navItems.map((item, index) => {
                const active = isNavItemActive(item, pathname, hash);
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={linkClassName(active)}
                    style={{
                      animationDelay: `${index * 0.05}s`,
                    }}
                  >
                    <span className="relative z-10">{item.label}</span>
                    <span
                      className={`absolute bottom-0 left-1/2 h-0.5 -translate-x-1/2 bg-primary transition-all duration-300 ${
                        active ? "w-3/4" : "w-0 group-hover:w-3/4"
                      }`}
                    />
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center gap-1 sm:gap-2">
              <Link
                href="https://github.com/HyeontaeKim0"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-xl p-2 text-gray-900 transition-colors hover:bg-gray-100 hover:text-primary sm:gap-2 sm:px-2"
                aria-label="GitHub 프로필"
              >
                <FaGithub className="text-lg sm:text-xl" />
                <span className="hidden text-sm font-semibold sm:inline">
                  HyeontaeKim0
                </span>
              </Link>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl text-gray-700 hover:text-primary hover:bg-gray-100 transition-all duration-300 hover:rotate-180 hover:scale-110"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-xl text-gray-700 hover:text-primary hover:bg-gray-100 transition-all duration-300"
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
        </div>

        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 border-t border-gray-200 space-y-2">
            {navItems.map((item, index) => {
              const active = isNavItemActive(item, pathname, hash);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`block px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-300 hover:translate-x-2 hover:shadow-lg hover:shadow-primary/20 ${
                    active
                      ? "text-primary bg-primary/5"
                      : "text-gray-700 hover:text-primary hover:bg-gray-100"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    animationDelay: `${index * 0.05}s`,
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
