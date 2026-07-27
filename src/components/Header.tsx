import React, { useState } from "react";
import {
  Wrench,
  Search,
  Sun,
  Moon,
  Menu,
  X,
  SlidersHorizontal,
  Layers,
  Sparkles,
  ShieldCheck,
  Tag,
  BookOpen,
  ShoppingBag,
  Compass,
  DollarSign,
  Globe
} from "lucide-react";
import { Currency } from "../types";

interface HeaderProps {
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  activeView: string;
  setActiveView: (view: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (cat: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
  showAdminButton?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  isDarkMode,
  setIsDarkMode,
  activeView,
  setActiveView,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  currency,
  setCurrency,
  isAdmin,
  setIsAdmin,
  showAdminButton = true,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-md transition-all ${
        isDarkMode
          ? "bg-slate-950/90 border-slate-800/80 text-slate-100"
          : "bg-white/95 border-slate-200 text-slate-900 shadow-sm"
      }`}
    >
      {/* Main Nav Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        {/* Brand Logo */}
        <a
          href="/"
          onClick={(e) => {
            if (!e.ctrlKey && !e.metaKey) {
              e.preventDefault();
              setActiveView("home");
              setSelectedCategory(null);
              if (typeof window !== "undefined") window.history.pushState({}, "", "/");
            }
          }}
          className="flex items-center gap-2 sm:gap-3 group text-right focus:outline-none shrink-0"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <Wrench className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-xl sm:text-2xl tracking-tight text-slate-900 dark:text-white">
                ديكورا
              </span>
              <span className="text-[10px] sm:text-xs bg-amber-500/20 text-amber-500 border border-amber-500/30 px-1.5 py-0.5 rounded font-mono font-bold">
                Dkora
              </span>
            </div>
            <p className="text-[9px] sm:text-[10px] text-slate-400 font-medium tracking-wide">
              دليل العدد والأدوات والديكور
            </p>
          </div>
        </a>

        {/* Desktop Quick Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md relative">
          <input
            type="text"
            placeholder="ابحث عن شنيور، ميزان ليزر، قفل ذكي، دهان..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pr-10 pl-4 py-2 rounded-xl text-xs sm:text-sm border transition-all focus:outline-none focus:ring-2 focus:ring-amber-500/50 ${
              isDarkMode
                ? "bg-slate-900 border-slate-800 text-slate-100 placeholder-slate-500"
                : "bg-slate-100 border-slate-300 text-slate-900 placeholder-slate-400"
            }`}
          />
          <Search className="w-4 h-4 absolute right-3 top-3 text-slate-400" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute left-3 top-2.5 text-xs text-slate-400 hover:text-amber-500"
            >
              ✕
            </button>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="hidden lg:flex items-center gap-1 text-sm font-bold">
          <a
            href="/"
            onClick={(e) => {
              if (!e.ctrlKey && !e.metaKey) {
                e.preventDefault();
                setActiveView("home");
                setSelectedCategory(null);
                if (typeof window !== "undefined") window.history.pushState({}, "", "/");
              }
            }}
            className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeView === "home" && !selectedCategory
                ? "bg-amber-500/15 text-amber-500 border border-amber-500/30"
                : isDarkMode
                ? "text-slate-400 hover:text-amber-400 hover:bg-slate-800/40"
                : "text-slate-600 hover:text-amber-600 hover:bg-slate-100"
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>الرئيسية</span>
          </a>

          <a
            href="/categories"
            onClick={(e) => {
              if (!e.ctrlKey && !e.metaKey) {
                e.preventDefault();
                setActiveView("categories");
                if (typeof window !== "undefined") window.history.pushState({}, "", "/categories");
              }
            }}
            className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeView === "categories" || selectedCategory
                ? "bg-amber-500/15 text-amber-500 border border-amber-500/30"
                : isDarkMode
                ? "text-slate-400 hover:text-amber-400 hover:bg-slate-800/40"
                : "text-slate-600 hover:text-amber-600 hover:bg-slate-100"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>التصنيفات (12)</span>
          </a>

          <a
            href="/comparisons"
            onClick={(e) => {
              if (!e.ctrlKey && !e.metaKey) {
                e.preventDefault();
                setActiveView("comparisons");
                if (typeof window !== "undefined") window.history.pushState({}, "", "/comparisons");
              }
            }}
            className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeView === "comparisons"
                ? "bg-amber-500/15 text-amber-500 border border-amber-500/30"
                : isDarkMode
                ? "text-slate-400 hover:text-amber-400 hover:bg-slate-800/40"
                : "text-slate-600 hover:text-amber-600 hover:bg-slate-100"
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>المقارنات</span>
          </a>

          <a
            href="/deals"
            onClick={(e) => {
              if (!e.ctrlKey && !e.metaKey) {
                e.preventDefault();
                setActiveView("deals");
                if (typeof window !== "undefined") window.history.pushState({}, "", "/deals");
              }
            }}
            className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeView === "deals"
                ? "bg-amber-500/15 text-amber-500 border border-amber-500/30"
                : isDarkMode
                ? "text-slate-400 hover:text-amber-400 hover:bg-slate-800/40"
                : "text-slate-600 hover:text-amber-600 hover:bg-slate-100"
            }`}
          >
            <Tag className="w-4 h-4 text-orange-500" />
            <span>العروض والخصومات</span>
          </a>

          <a
            href="/articles"
            onClick={(e) => {
              if (!e.ctrlKey && !e.metaKey) {
                e.preventDefault();
                setActiveView("articles");
                if (typeof window !== "undefined") window.history.pushState({}, "", "/articles");
              }
            }}
            className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeView === "articles"
                ? "bg-amber-500/15 text-amber-500 border border-amber-500/30"
                : isDarkMode
                ? "text-slate-400 hover:text-amber-400 hover:bg-slate-800/40"
                : "text-slate-600 hover:text-amber-600 hover:bg-slate-100"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>المقالات</span>
          </a>

          <a
            href="/sitemap"
            onClick={(e) => {
              if (!e.ctrlKey && !e.metaKey) {
                e.preventDefault();
                setActiveView("sitemap");
                if (typeof window !== "undefined") window.history.pushState({}, "", "/sitemap");
              }
            }}
            className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeView === "sitemap"
                ? "bg-amber-500/15 text-amber-500 border border-amber-500/30"
                : isDarkMode
                ? "text-slate-400 hover:text-amber-400 hover:bg-slate-800/40"
                : "text-slate-600 hover:text-amber-600 hover:bg-slate-100"
            }`}
          >
            <Globe className="w-4 h-4 text-emerald-400" />
            <span>خريطة الموقع</span>
          </a>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Admin Dashboard shortcut (Hidden by default unless accessed via secret link or unlocked) */}
          {(showAdminButton || isAdmin) && (
            <button
              onClick={() => {
                setIsAdmin(!isAdmin);
                if (!isAdmin) setActiveView("admin");
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border flex items-center gap-1.5 ${
                isAdmin
                  ? "bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20"
                  : isDarkMode
                  ? "bg-slate-800/80 text-slate-300 border-slate-700 hover:border-amber-500/50"
                  : "bg-slate-100 text-slate-800 border-slate-300 hover:border-amber-500"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isAdmin ? "لوحة التحكم (نشطة)" : "دخول الإدارة"}</span>
            </button>
          )}

          {/* Theme Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-xl transition-colors border ${
              isDarkMode
                ? "bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800"
                : "bg-amber-100 border-amber-300 text-amber-900 hover:bg-amber-200"
            }`}
            title="تغيير المظهر"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 rounded-xl border ${
              isDarkMode
                ? "bg-slate-800/80 text-slate-300 border-slate-700"
                : "bg-slate-100 text-slate-800 border-slate-300"
            }`}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Horizontal Quick Nav Bar (Always visible on mobile without needing drawer) */}
      <div className="lg:hidden border-t overflow-x-auto py-2 px-3 flex items-center gap-2 text-xs font-bold no-scrollbar scroll-smooth">
        <a
          href="/"
          onClick={(e) => {
            if (!e.ctrlKey && !e.metaKey) {
              e.preventDefault();
              setActiveView("home");
              setSelectedCategory(null);
              if (typeof window !== "undefined") window.history.pushState({}, "", "/");
            }
          }}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap flex items-center gap-1.5 shrink-0 transition-colors ${
            activeView === "home" && !selectedCategory
              ? "bg-amber-500 text-slate-950 font-black shadow-sm"
              : isDarkMode
              ? "bg-slate-900/80 text-slate-300 border border-slate-800"
              : "bg-slate-100 text-slate-700 border border-slate-200"
          }`}
        >
          <Compass className="w-3.5 h-3.5 text-amber-500" />
          <span>الرئيسية</span>
        </a>

        <a
          href="/categories"
          onClick={(e) => {
            if (!e.ctrlKey && !e.metaKey) {
              e.preventDefault();
              setActiveView("categories");
              if (typeof window !== "undefined") window.history.pushState({}, "", "/categories");
            }
          }}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap flex items-center gap-1.5 shrink-0 transition-colors ${
            activeView === "categories" || selectedCategory
              ? "bg-amber-500 text-slate-950 font-black shadow-sm"
              : isDarkMode
              ? "bg-slate-900/80 text-slate-300 border border-slate-800"
              : "bg-slate-100 text-slate-700 border border-slate-200"
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-amber-500" />
          <span>التصنيفات</span>
        </a>

        <a
          href="/comparisons"
          onClick={(e) => {
            if (!e.ctrlKey && !e.metaKey) {
              e.preventDefault();
              setActiveView("comparisons");
              if (typeof window !== "undefined") window.history.pushState({}, "", "/comparisons");
            }
          }}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap flex items-center gap-1.5 shrink-0 transition-colors ${
            activeView === "comparisons"
              ? "bg-amber-500 text-slate-950 font-black shadow-sm"
              : isDarkMode
              ? "bg-slate-900/80 text-slate-300 border border-slate-800"
              : "bg-slate-100 text-slate-700 border border-slate-200"
          }`}
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-amber-500" />
          <span>المقارنات</span>
        </a>

        <a
          href="/deals"
          onClick={(e) => {
            if (!e.ctrlKey && !e.metaKey) {
              e.preventDefault();
              setActiveView("deals");
              if (typeof window !== "undefined") window.history.pushState({}, "", "/deals");
            }
          }}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap flex items-center gap-1.5 shrink-0 transition-colors ${
            activeView === "deals"
              ? "bg-amber-500 text-slate-950 font-black shadow-sm"
              : isDarkMode
              ? "bg-slate-900/80 text-slate-300 border border-slate-800"
              : "bg-slate-100 text-slate-700 border border-slate-200"
          }`}
        >
          <Tag className="w-3.5 h-3.5 text-orange-500" />
          <span>العروض</span>
        </a>

        <a
          href="/articles"
          onClick={(e) => {
            if (!e.ctrlKey && !e.metaKey) {
              e.preventDefault();
              setActiveView("articles");
              if (typeof window !== "undefined") window.history.pushState({}, "", "/articles");
            }
          }}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap flex items-center gap-1.5 shrink-0 transition-colors ${
            activeView === "articles"
              ? "bg-amber-500 text-slate-950 font-black shadow-sm"
              : isDarkMode
              ? "bg-slate-900/80 text-slate-300 border border-slate-800"
              : "bg-slate-100 text-slate-700 border border-slate-200"
          }`}
        >
          <BookOpen className="w-3.5 h-3.5 text-amber-500" />
          <span>المقالات</span>
        </a>

        <button
          onClick={() => {
            setIsAdmin(true);
            setActiveView("admin");
          }}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap flex items-center gap-1.5 shrink-0 transition-colors ${
            activeView === "admin"
              ? "bg-amber-500 text-slate-950 font-black shadow-sm"
              : "bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/40"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>لوحة التحكم وتعديل المنتجات</span>
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className={`lg:hidden border-t p-4 space-y-3 ${
            isDarkMode ? "bg-slate-950 border-slate-800 text-slate-100" : "bg-white border-slate-200 text-slate-900"
          }`}
        >
          {/* Mobile Search */}
          <div className="relative mb-3">
            <input
              type="text"
              placeholder="ابحث عن منتج أو فئة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pr-9 pl-3 py-2 rounded-xl text-xs border ${
                isDarkMode
                  ? "bg-slate-900 border-slate-800 text-white placeholder-slate-500"
                  : "bg-slate-100 border-slate-300 text-slate-900 placeholder-slate-400"
              }`}
            />
            <Search className="w-4 h-4 absolute right-3 top-2.5 text-slate-400" />
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-bold">
            <button
              onClick={() => {
                setActiveView("home");
                setSelectedCategory(null);
                setMobileMenuOpen(false);
              }}
              className={`p-3 rounded-xl border text-right flex items-center gap-2 ${
                isDarkMode
                  ? "bg-slate-900 border-slate-800 text-slate-100 hover:bg-slate-800"
                  : "bg-slate-100 border-slate-200 text-slate-800 hover:bg-slate-200"
              }`}
            >
              <Compass className="w-4 h-4 text-amber-500" />
              <span>الرئيسية</span>
            </button>

            <button
              onClick={() => {
                setActiveView("categories");
                setMobileMenuOpen(false);
              }}
              className={`p-3 rounded-xl border text-right flex items-center gap-2 ${
                isDarkMode
                  ? "bg-slate-900 border-slate-800 text-slate-100 hover:bg-slate-800"
                  : "bg-slate-100 border-slate-200 text-slate-800 hover:bg-slate-200"
              }`}
            >
              <Layers className="w-4 h-4 text-amber-500" />
              <span>التصنيفات</span>
            </button>

            <button
              onClick={() => {
                setActiveView("comparisons");
                setMobileMenuOpen(false);
              }}
              className={`p-3 rounded-xl border text-right flex items-center gap-2 ${
                isDarkMode
                  ? "bg-slate-900 border-slate-800 text-slate-100 hover:bg-slate-800"
                  : "bg-slate-100 border-slate-200 text-slate-800 hover:bg-slate-200"
              }`}
            >
              <SlidersHorizontal className="w-4 h-4 text-amber-500" />
              <span>المقارنات</span>
            </button>

            <button
              onClick={() => {
                setActiveView("deals");
                setMobileMenuOpen(false);
              }}
              className={`p-3 rounded-xl border text-right flex items-center gap-2 ${
                isDarkMode
                  ? "bg-slate-900 border-slate-800 text-slate-100 hover:bg-slate-800"
                  : "bg-slate-100 border-slate-200 text-slate-800 hover:bg-slate-200"
              }`}
            >
              <Tag className="w-4 h-4 text-orange-500" />
              <span>العروض والخصومات</span>
            </button>

            <button
              onClick={() => {
                setActiveView("articles");
                setMobileMenuOpen(false);
              }}
              className={`p-3 rounded-xl border text-right flex items-center gap-2 ${
                isDarkMode
                  ? "bg-slate-900 border-slate-800 text-slate-100 hover:bg-slate-800"
                  : "bg-slate-100 border-slate-200 text-slate-800 hover:bg-slate-200"
              }`}
            >
              <BookOpen className="w-4 h-4 text-amber-500" />
              <span>المقالات</span>
            </button>

            <button
              onClick={() => {
                setActiveView("sitemap");
                setMobileMenuOpen(false);
              }}
              className={`p-3 rounded-xl border text-right flex items-center gap-2 ${
                isDarkMode
                  ? "bg-slate-900 border-slate-800 text-slate-100 hover:bg-slate-800"
                  : "bg-slate-100 border-slate-200 text-slate-800 hover:bg-slate-200"
              }`}
            >
              <Globe className="w-4 h-4 text-emerald-400" />
              <span>خريطة الموقع</span>
            </button>

            {(showAdminButton || isAdmin) && (
              <button
                onClick={() => {
                  setIsAdmin(!isAdmin);
                  if (!isAdmin) setActiveView("admin");
                  setMobileMenuOpen(false);
                }}
                className="p-3 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-600 dark:text-amber-400 text-right flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>لوحة التحكم</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
