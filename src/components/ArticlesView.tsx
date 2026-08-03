import React, { useState } from "react";
import { BookOpen, Calendar, Clock, User, ArrowRight, Tag, ChevronLeft } from "lucide-react";
import { Article } from "../types";

interface ArticlesViewProps {
  articles: Article[];
  isDarkMode: boolean;
  selectedArticle?: Article | null;
  onSelectArticle?: (article: Article | null) => void;
}

export const ArticlesView: React.FC<ArticlesViewProps> = ({
  articles,
  isDarkMode,
  selectedArticle: propSelectedArticle,
  onSelectArticle: propOnSelectArticle
}) => {
  const [internalSelected, setInternalSelected] = useState<Article | null>(null);
  
  const currentArticle = propSelectedArticle !== undefined ? propSelectedArticle : internalSelected;

  const handleSelect = (art: Article | null) => {
    if (propOnSelectArticle) {
      propOnSelectArticle(art);
    } else {
      setInternalSelected(art);
      if (typeof window !== "undefined") {
        if (art) {
          const url = `/article/${art.slug}`;
          window.history.pushState({ article: art.slug }, "", url);
        } else {
          window.history.pushState({}, "", "/articles");
        }
      }
    }
  };

  if (currentArticle) {
    return (
      <div className="max-w-4xl mx-auto my-8 space-y-6">
        <a
          href="/articles"
          onClick={(e) => {
            e.preventDefault();
            handleSelect(null);
          }}
          className="inline-flex items-center gap-2 text-xs font-bold text-amber-500 bg-amber-500/10 px-4 py-2 rounded-xl border border-amber-500/30 hover:bg-amber-500/20 transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة لجميع المقالات والدروس</span>
        </a>

        <article
          className={`rounded-3xl border overflow-hidden p-6 sm:p-10 space-y-6 ${
            isDarkMode ? "bg-slate-900 border-slate-800 text-slate-100" : "bg-white border-slate-200 text-slate-900"
          }`}
        >
          <div className="space-y-3">
            <span className="bg-amber-500/10 text-amber-500 border border-amber-500/30 text-xs font-bold px-3 py-1 rounded-full">
              {currentArticle.category}
            </span>

            <h1 className="text-3xl sm:text-4xl font-black leading-tight text-slate-900 dark:text-white">
              {currentArticle.title}
            </h1>

            <div className={`flex flex-wrap items-center gap-4 text-xs border-b pb-4 ${
              isDarkMode ? "text-slate-400 border-slate-800" : "text-slate-500 border-slate-200"
            }`}>
              <span className={`flex items-center gap-1.5 font-bold ${isDarkMode ? "text-slate-200" : "text-slate-800"}`}>
                <User className="w-4 h-4 text-amber-500" />
                {currentArticle.author}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-slate-500" />
                {currentArticle.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-slate-500" />
                وقت القراءة: {currentArticle.readTime}
              </span>
            </div>
          </div>

          <div className="h-80 rounded-2xl overflow-hidden border border-slate-300 dark:border-slate-800">
            <img
              src={currentArticle.coverImage}
              alt={currentArticle.title}
              loading="eager"
              decoding="async"
              width={800}
              height={320}
              referrerPolicy="no-referrer"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (!target.src.includes('postimg')) {
                  target.src = 'https://i.postimg.cc/LqzXq2Gs/61Zr-XB5LBk-L-AC-SY300-SX300-QL70-ML2.jpg';
                }
              }}
              className="w-full h-full object-cover"
            />
          </div>

          <div className={`max-w-none leading-relaxed space-y-4 text-sm sm:text-base ${
            isDarkMode ? "text-slate-300" : "text-slate-800"
          }`}>
            <p className={`p-4 rounded-2xl border font-medium ${
              isDarkMode ? "bg-amber-500/10 border-amber-500/20 text-amber-300" : "bg-amber-50 border-amber-200 text-amber-900"
            }`}>
              {currentArticle.excerpt}
            </p>
            {currentArticle.content.includes("<") ? (
              <div
                className="space-y-4 text-sm sm:text-base leading-relaxed"
                dangerouslySetInnerHTML={{ __html: currentArticle.content }}
              />
            ) : (
              <p>{currentArticle.content}</p>
            )}
          </div>

          <div className={`pt-6 border-t flex flex-wrap gap-2 ${isDarkMode ? "border-slate-800" : "border-slate-200"}`}>
            {currentArticle.tags.map((t, idx) => (
              <span key={idx} className={`px-3 py-1 rounded-lg text-xs font-mono border ${
                isDarkMode ? "bg-slate-950 text-slate-300 border-slate-800" : "bg-slate-100 text-slate-700 border-slate-200"
              }`}>
                #{t}
              </span>
            ))}
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="space-y-8 my-8">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <span className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs font-bold px-3 py-1 rounded-full">
          <BookOpen className="w-3.5 h-3.5" />
          مدونة 'ديكورا' والدروس الفنية
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          مقالات متخصصة وشروحات صيانة وتنقيب
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm">
          أسرار الورش والتشطيبات الهندسية من خبراء المهنة لمساعدتك في اتخاذ أفضل القرارات.
        </p>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((art) => (
          <a
            key={art.id}
            href={`/article/${art.slug}`}
            onClick={(e) => {
              if (!e.ctrlKey && !e.metaKey) {
                e.preventDefault();
                handleSelect(art);
              }
            }}
            className={`rounded-3xl border overflow-hidden p-6 space-y-4 cursor-pointer transition-all hover:shadow-2xl hover:border-amber-500/50 group flex flex-col justify-between block ${
              isDarkMode ? "bg-slate-900 border-slate-800 text-slate-100" : "bg-white border-slate-200 text-slate-900 shadow-md"
            }`}
          >
            <div className="space-y-3">
              <div className="h-48 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
                <img
                  src={art.coverImage}
                  alt={art.title}
                  loading="lazy"
                  decoding="async"
                  width={400}
                  height={192}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (!target.src.includes('postimg')) {
                      target.src = 'https://i.postimg.cc/LqzXq2Gs/61Zr-XB5LBk-L-AC-SY300-SX300-QL70-ML2.jpg';
                    }
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="bg-amber-500/10 text-amber-500 border border-amber-500/30 px-2.5 py-0.5 rounded font-bold">
                  {art.category}
                </span>
                <span>{art.date}</span>
              </div>

              <h3 className="font-extrabold text-lg group-hover:text-amber-500 transition-colors leading-snug">
                {art.title}
              </h3>

              <p className={`text-xs line-clamp-3 leading-relaxed ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>
                {art.excerpt}
              </p>
            </div>

            <div className={`pt-4 border-t flex items-center justify-between text-xs font-bold text-amber-600 dark:text-amber-500 ${
              isDarkMode ? "border-slate-800" : "border-slate-100"
            }`}>
              <span>اقرأ المقال الكامل</span>
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
