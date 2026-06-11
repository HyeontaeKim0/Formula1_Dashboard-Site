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
  { label: "순위", href: "/standings" },
];

function isNavItemActive(
  item: (typeof navItems)[number],
  pathname: string,
  hash: string,
) {
  if (item.href === "/standings") {
    return pathname === "/standings";
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

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  const linkClassName = (active: boolean) =>
    `relative px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-300 group ${
      active ? "text-primary" : "text-gray-700 hover:text-primary"
    }`;

  return (
    <>
      <nav
        className={`bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 transition-all duration-300 shadow-sm ${
          scrolled ? "shadow-lg shadow-primary/10" : ""
        }`}
      >
        <div className="container mx-auto min-w-0 px-3 sm:px-4">
          <div className="flex h-20 min-w-0 items-center justify-between gap-3">
            <Link
              href="/"
              className="flex shrink-0 items-center"
              aria-label="홈으로 이동"
            >
              <Image
                src={Logo}
                alt="F1 Dashboard"
                width={300}
                height={200}
                sizes="(max-width: 640px) 220px, (max-width: 768px) 280px, 360px"
                className="h-14 w-auto max-w-[220px] object-contain object-left sm:h-16 sm:max-w-[280px] md:h-[4.5rem] md:max-w-[340px] lg:max-w-[360px]"
                priority
              />
            </Link>

            <div className="flex shrink-0 items-center gap-1 sm:gap-3">
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
        </div>
      </nav>

      <div className="md:hidden">
        <div
          className={`fixed inset-0 z-[60] bg-black/40 transition-opacity duration-300 ${
            isMenuOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }`}
          onClick={() => setIsMenuOpen(false)}
          aria-hidden={!isMenuOpen}
        />

        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-menu-title"
          className={`fixed right-0 top-0 z-[70] flex h-full w-[min(280px,85vw)] flex-col border-l border-gray-200 bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex h-16 items-center justify-end border-b border-gray-200 px-4">
            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-xl p-2 text-gray-700 transition-colors hover:bg-gray-100 hover:text-primary"
              aria-label="메뉴 닫기"
            >
              <X size={22} />
            </button>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
            {navItems.map((item, index) => {
              const active = isNavItemActive(item, pathname, hash);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`block rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300 ${
                    active
                      ? "bg-primary/5 text-primary"
                      : "text-gray-700 hover:bg-gray-100 hover:text-primary"
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
          </nav>
        </div>
      </div>
    </>
  );
}
