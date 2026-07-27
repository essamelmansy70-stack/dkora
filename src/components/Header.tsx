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
  DollarSign
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
      {/* Top Disclosure & Currency Bar */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-orange-500 text-slate-950 px-4 py-1.5 text-xs font-bold flex items-center justify-between shadow-inner">
        <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-slate-950" />
            <span>موقع مراجع حقيقي 100% | اختبارات ميدانية مستقلة للعدد والأدوات والديكور</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-1.5 opacity-90 text-[11px]">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>مقارنة أسعار أمازون • جوميا • نون</span>
            </div>

            {/* Currency Switcher */}
            <div className="flex items-center gap-1 bg-slate-950/20 px-2 py-0.5 rounded-md text-white font-mono">
              <DollarSign className="w-3 h-3 text-amber-300" />
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as Currency)}
                className="bg-transparent text-xs font-bold focus:outline-none text-slate-950 cursor-pointer"
              >
                <option value="EGP" className="bg-slate-900 text-white">ج.م (مصر)</option>
                <option value="SAR" className="bg-slate-900 text-white">ر.س (السعودية)</option>
                <option value="USD" className="bg-slate-900 text-white">$ (USD)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Nav Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <button
          onClick={() => {
            setActiveView("home");
            setSelectedCategory(null);
          }}
          className="flex items-center gap-3 group text-right focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <Wrench className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-2xl tracking-tight text-slate-900 dark:text-white">
                ديكورا
              </span>
              <span className="text-xs bg-amber-500/20 text-amber-500 border border-amber-500/30 px-1.5 py-0.5 rounded font-mono font-bold">
                Dkora
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium tracking-wide">
              دليل العدد والأدوات والديكور
            </p>
          </div>
        </button>

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
          <button
            onClick={() => {
              setActiveView("home");
              setSelectedCategory(null);
            }}
            className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeView === "home" && !selectedCategory
                ? "bg-amber-500/15 text-amber-500 border border-amber-500/30"
                : "text-slate-400 hover:text-amber-400 hover:bg-slate-800/40"
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>الرئيسية</span>
          </button>

          <button
            onClick={() => setActiveView("categories")}
            className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeView === "categories" || selectedCategory
                ? "bg-amber-500/15 text-amber-500 border border-amber-500/30"
                : "text-slate-400 hover:text-amber-400 hover:bg-slate-800/40"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>التصنيفات (12)</span>
          </button>

          <button
            onClick={() => setActiveView("comparisons")}
            className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeView === "comparisons"
                ? "bg-amber-500/15 text-amber-500 border border-amber-500/30"
                : "text-slate-400 hover:text-amber-400 hover:bg-slate-800/40"
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>المقارنات</span>
          </button>

          <button
            onClick={() => setActiveView("deals")}
            className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeView === "deals"
                ? "bg-amber-500/15 text-amber-500 border border-amber-500/30"
                : "text-slate-400 hover:text-amber-400 hover:bg-slate-800/40"
            }`}
          >
            <Tag className="w-4 h-4 text-orange-400" />
            <span>العروض والخصومات</span>
          </button>

          <button
            onClick={() => setActiveView("articles")}
            className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeView === "articles"
                ? "bg-amber-500/15 text-amber-500 border border-amber-500/30"
                : "text-slate-400 hover:text-amber-400 hover:bg-slate-800/40"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>المقالات</span>
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Admin Dashboard shortcut */}
          <button
            onClick={() => {
              setIsAdmin(!isAdmin);
              if (!isAdmin) setActiveView("admin");
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border flex items-center gap-1.5 ${
              isAdmin
                ? "bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20"
                : "bg-slate-800/80 text-slate-300 border-slate-700 hover:border-amber-500/50"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isAdmin ? "لوحة التحكم (نشطة)" : "دخول الإدارة"}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-xl transition-colors border ${
              isDarkMode
                ? "bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800"
                : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"
            }`}
            title="تغيير المظهر"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-800/80 text-slate-300 border border-slate-700"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className={`lg:hidden border-t p-4 space-y-3 ${
            isDarkMode ? "bg-slate-950 border-slate-800" : "bg-white border-slate-200"
          }`}
        >
          {/* Mobile Search */}
          <div className="relative mb-3">
            <input
              type="text"
              placeholder="ابحث عن منتج أو فئة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-9 pl-3 py-2 rounded-xl text-xs border bg-slate-900 border-slate-800 text-white"
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
              className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-right flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-amber-400" />
              <span>الرئيسية</span>
            </button>

            <button
              onClick={() => {
                setActiveView("categories");
                setMobileMenuOpen(false);
              }}
              className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-right flex items-center gap-2"
            >
              <Layers className="w-4 h-4 text-amber-400" />
              <span>التصنيفات</span>
            </button>

            <button
              onClick={() => {
                setActiveView("comparisons");
                setMobileMenuOpen(false);
              }}
              className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-right flex items-center gap-2"
            >
              <SlidersHorizontal className="w-4 h-4 text-amber-400" />
              <span>المقارنات</span>
            </button>

            <button
              onClick={() => {
                setActiveView("deals");
                setMobileMenuOpen(false);
              }}
              className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-right flex items-center gap-2"
            >
              <Tag className="w-4 h-4 text-orange-400" />
              <span>العروض والخصومات</span>
            </button>

            <button
              onClick={() => {
                setActiveView("articles");
                setMobileMenuOpen(false);
              }}
              className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-right flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>المقالات</span>
            </button>

            <button
              onClick={() => {
                setIsAdmin(!isAdmin);
                if (!isAdmin) setActiveView("admin");
                setMobileMenuOpen(false);
              }}
              className="p-3 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 text-right flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>لوحة التحكم</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
