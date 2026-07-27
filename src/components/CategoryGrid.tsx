import React from "react";
import {
  Zap,
  Wrench,
  Hammer,
  HardHat,
  Palette,
  Lightbulb,
  DoorClosed,
  Lock,
  Paintbrush,
  Ruler,
  Trees,
  Car,
  Layers,
  ChevronLeft
} from "lucide-react";
import { Category } from "../types";

interface CategoryGridProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (id: string | null) => void;
  isDarkMode: boolean;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  isDarkMode,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Zap": return <Zap className="w-6 h-6" />;
      case "Wrench": return <Wrench className="w-6 h-6" />;
      case "Hammer": return <Hammer className="w-6 h-6" />;
      case "HardHat": return <HardHat className="w-6 h-6" />;
      case "Palette": return <Palette className="w-6 h-6" />;
      case "Lightbulb": return <Lightbulb className="w-6 h-6" />;
      case "DoorClosed": return <DoorClosed className="w-6 h-6" />;
      case "Lock": return <Lock className="w-6 h-6" />;
      case "Paintbrush": return <Paintbrush className="w-6 h-6" />;
      case "Ruler": return <Ruler className="w-6 h-6" />;
      case "Trees": return <Trees className="w-6 h-6" />;
      case "Car": return <Car className="w-6 h-6" />;
      default: return <Layers className="w-6 h-6" />;
    }
  };

  return (
    <section className="space-y-4 my-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="w-6 h-6 text-amber-500" />
            <span>التصنيفات الرئيسية (12 تصنيف)</span>
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            استعرض الأقسام الشاملة للعدد والأدوات والتجهيزات المنزلية والورش
          </p>
        </div>

        {selectedCategory && (
          <button
            onClick={() => onSelectCategory(null)}
            className="text-xs font-bold text-amber-500 hover:underline bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-500/30"
          >
            إظهار جميع المنتجات (عرض الشامل)
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;

          return (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(isSelected ? null : cat.id)}
              className={`group relative p-4 rounded-2xl border transition-all cursor-pointer text-right flex flex-col justify-between overflow-hidden ${
                isSelected
                  ? "bg-amber-500 text-slate-950 border-amber-400 shadow-xl shadow-amber-500/20 transform -translate-y-1"
                  : isDarkMode
                  ? "bg-slate-900/90 border-slate-800/80 hover:border-amber-500/50 hover:bg-slate-800/80 text-slate-200"
                  : "bg-white border-slate-200 hover:border-amber-500/50 hover:bg-amber-50/50 text-slate-800 shadow-sm"
              }`}
            >
              <div>
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110 ${
                    isSelected
                      ? "bg-slate-950 text-amber-400"
                      : "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                  }`}
                >
                  {getIcon(cat.icon)}
                </div>

                <h3 className="font-extrabold text-sm sm:text-base leading-snug mb-1">
                  {cat.nameAr}
                </h3>
                <p
                  className={`text-[11px] line-clamp-2 leading-tight ${
                    isSelected ? "text-slate-900 font-medium" : "text-slate-400"
                  }`}
                >
                  {cat.description}
                </p>
              </div>

              <div className="mt-4 pt-2 border-t border-slate-800/20 flex items-center justify-between text-[11px] font-bold">
                <span className={isSelected ? "text-slate-950" : "text-amber-500"}>
                  {cat.productCount} مراجعة
                </span>
                <ChevronLeft
                  className={`w-3.5 h-3.5 transition-transform group-hover:-translate-x-1 ${
                    isSelected ? "text-slate-950" : "text-slate-500"
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
