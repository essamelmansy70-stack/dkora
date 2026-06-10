import React, { useState } from 'react';
import { 
  ExternalLink, 
  Video, 
  Sparkles, 
  CheckCircle2, 
  Tv, 
  Info,
  Sliders,
  HelpCircle
} from 'lucide-react';

// --- Monetag monetization configuration ---
const monetagLink = "https://omg10.com/4/11125764"; // Monetag Smart Link (رابط موني تاج الذكي الخاص بك)
const finalDestination = "https://geminigen.ai/profile/orders"; // Original generator page link (الرابط الأصلي المستهدف)

interface VeoVideoPageProps {
  locale: 'ar' | 'en';
  t?: any;
}

const contentData = {
  ar: {
    badge: "✨ تقنية Veo 3 الجديدة للذكاء الاصطناعي",
    title: "إنشاء فيديو veo 3 مجاناً بلا حدود",
    subtitle: "الدليل الشامل والحصري لتوليد فيديوهات سينمائية فائقة الدقة والواقعية باستخدام محرك Google Veo 3 المتطور مجاناً بالكامل وبأسهل طريقة.",
    ctaBtn: "انتقل إلى موقع التوليد والطلبات الآن",
    ctaDesc: "بوابة التوليد المباشرة",
    
    sections: {
      introTitle: "ما هو نموذج Google Veo 3؟",
      introDesc: "هو الجيل الأحدث والأقوى من نماذج توليد الفيديو من Google. يتميز بقدرة مذهلة على فهم الفيزياء، محاكاة حركة الكاميرا السينمائية بدقة شديدة، تمثيل الواقع بدقة بصرية متناهية، والتحكم الفائق في حركة وحيوية الأجسام والشخصيات بناءً على الوصف النصي فقط.",
      
      stepsTitle: "خطوات التوليد المجاني واللامحدود عبر المنصة",
      stepsDesc: "اتبع الشرح التفصيلي التالي لتوليد أول فيديو احترافي لك وحفظه بجودة عالية:",
      
      faqTitle: "💬 أسئلة شائعة وحلول برمجية للتحميل",
      faqDesc: "كل ما تود معرفته للحصول على أفضل تجربة توليد ممكنة."
    },

    steps: [
      {
        id: "step1",
        num: "١",
        title: "الدخول للموقع والتسجيل المباشر",
        desc: "اضغط على الزر الموجود أسفل الصفحة للذهاب مباشرة إلى صفحة التوليد والمتابعة الخاصة بك. قم بتسجيل الدخول باستخدام حساب Google الخاص بك بثانية واحدة.",
        icon: Tv
      },
      {
        id: "step2",
        num: "٢",
        title: "الذهاب لقسم التوليد (Generate Video)",
        desc: "بمجرد الدخول، انتقل لقسم إنشاء الفيديوهات. هناك ستجد واجهة مخصصة لكتابة الوصف (Prompt)، اختيار الأبعاد (مربع، طولي للستوري، أو عرضي لليوتيوب)، والتحكم في إعدادات اللقطة وحفاوة التفاصيل.",
        icon: Sliders
      },
      {
        id: "step3",
        num: "٣",
        title: "كتابة الوصف النصي الدقيق بالإنجليزية",
        desc: "للحصول على أفضل جودة من Veo 3، يفضل كتابة الأوصاف باللغة الإنجليزية بالتفصيل. مثل تحديد الإضاءة (Cinematic lighting)، وحركة الكاميرا (Dolly zoom, Slow motion) والتفاصيل الدقيقة للأجسام.",
        icon: Sparkles
      },
      {
        id: "step4",
        num: "٤",
        title: "متابعة الطلبات وتنزيل مقاطعك مجاناً",
        desc: "بعد الضغط على Generate، ستتم معالجة الفيديو فوراً. يمكنك متابعة تقدم وحالة المعالجة عبر صفحة Orders. بمجرد اكتمال التوليد، اضغط على زر تنزيل (Download) للاحتفاظ بالفيديو بجودة فائقة.",
        icon: CheckCircle2
      }
    ],

    faqs: [
      {
        q: "هل الخدمة مجانية بالكامل حقاً وبدون حدود؟",
        a: "نعم، بوابة الطلبات والتوليد توفر حزم تشغيل مستمرة ومجانية لنموذج Veo 3 المطور لجميع المطورين والمصممين لتجربة تقنيات توليد الفيديو الرائدة مجاناً وبكل مصداقية."
      },
      {
        q: "كيف أحصل على جودة بصرية 4K من النموذج السينمائي؟",
        a: "تأكد من إدراج كلمات مثل 'ultra-detailed', 'photorealistic', '8k resolution', 'cinematic grade lens' في ثنايا الوصف باللغة الإنجليزية لتوجيه النموذج لإظهار أعلى كثافة تفاصيل ممكنة."
      },
      {
        q: "هل يمكنني تعديل أبعاد الفيديو الملائمة لمتجري أو انستقرام؟",
        a: "نعم تماماً، واجهة التوليد تتيح لك اختيار نسبة العرض إلى الارتفاع (16:9 شاشات، 9:16 تيك توك وستوري، 1:1 إنستقرام ورموز المنتجات لسلة وزد)."
      }
    ]
  },
  en: {
    badge: "✨ Advanced Veo 3 AI Technology",
    title: "Create Veo 3 Video Free with Unlimited Access",
    subtitle: "The ultimate exclusive roadmap to generating ultra-realistic high-definition cinematic videos using Google's revolutionary Veo 3 model easily and completely for free.",
    ctaBtn: "Go to Video Generation & Orders Page Now",
    ctaDesc: "Direct Access Portal",
    
    sections: {
      introTitle: "What is Google Veo 3?",
      introDesc: "It is Google's most advanced and highly capable video generation model to date. It features an incredible understanding of physics, precise simulation of cinematic camera pans, hyper-realistic rendering, and exceptional control over physical dynamics, all from a simple text description.",
      
      stepsTitle: "How to Generate Free & Unlimited Videos",
      stepsDesc: "Follow this step-by-step tutorial to produce and download your first professional masterpiece:",
      
      faqTitle: "💬 Frequently Asked Questions",
      faqDesc: "Everything you need to know about getting the best outcomes."
    },

    steps: [
      {
        id: "step1",
        num: "1",
        title: "Access the Portal & Secure Log In",
        desc: "Click the red button at the bottom of the page to go directly to your customized workspace. Authenticate securely using your Google account in one simple tap.",
        icon: Tv
      },
      {
        id: "step2",
        num: "2",
        title: "Go to 'Generate Video' Section",
        desc: "Once logged in, open the generation space. You will find intuitive controls to insert your text prompt, select aspect ratios (Square, Widescreen 16:9, or Widescreen Verticals), and adjust camera settings.",
        icon: Sliders
      },
      {
        id: "step3",
        num: "3",
        title: "Draft a Rich English Description",
        desc: "To get spectacular details, write descriptions in English with rich descriptive terms like 'Cinematic lighting', 'slow motion', 'Dolly zoom panning', and 'photorealistic materials'.",
        icon: Sparkles
      },
      {
        id: "step4",
        num: "4",
        title: "Track & Download in HD Quality",
        desc: "Click 'Generate' to initialize the server processing. Monitor your video files under the 'Orders' dashboard. Once prepared, hit Download to save to your device safely.",
        icon: CheckCircle2
      }
    ],

    faqs: [
      {
        q: "Is it really free and unlimited?",
        a: "Yes! The portal provides direct development access tokens to generate Google Veo 3 videos without paywalls so designers and content teams can test next-generation AI workflows."
      },
      {
        q: "How do I prompt to guarantee realistic details?",
        a: "Integrating descriptive prompt keywords such as 'photorealistic', 'raytraced details', and 'cinematic lens lighting' helps guide Veo 3 to use the maximum resolution matrix available."
      },
      {
        q: "Can I generate tall videos suitable for vertical stories?",
        a: "Absolutely. The generation engine fully supports customizable ratios: 16:9 for widescreen YouTube, 9:16 for TikTok, Instagram Reels, or Salla and Zid vertical product videos."
      }
    ]
  }
};

export default function VeoVideoPage({ locale }: VeoVideoPageProps) {
  const data = contentData[locale];
  const [clickCount, setClickCount] = useState<number>(0);

  const playSfx = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(560, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(840, audioCtx.currentTime + 0.15);
      
      gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);
      
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.15);
    } catch (e) {
      // Audio context disabled or not supported
    }
  };

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    playSfx();

    if (clickCount === 0) {
      setClickCount(1);
      try {
        // First Click: Open Monetag Smart Link in a new window/tab
        window.open(monetagLink, '_blank', 'noopener,noreferrer');
      } catch (err) {
        console.error("Popup window blocked or failed to load:", err);
      }
    } else {
      // Second Click: Redirect the user to the original destination URL in the same window
      window.location.href = finalDestination;
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-16 font-sans">
      
      {/* Hero Banner / Headline Section */}
      <div className="relative text-center bg-radial from-rose-500/10 via-transparent to-transparent py-10 sm:py-14 rounded-3xl overflow-hidden border border-slate-200/50 dark:border-slate-900/80 bg-white/40 dark:bg-slate-950/20 backdrop-blur-sm shadow-xl px-4 select-none">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/50 text-rose-600 dark:text-rose-400 text-xs sm:text-sm font-black rounded-full mb-4 animate-bounce">
          <Sparkles className="w-4 h-4 shrink-0" />
          <span>{data.badge}</span>
        </div>
        
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-3xl mx-auto leading-tight">
          {data.title}
        </h1>
        
        <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-350 max-w-2xl mx-auto leading-relaxed font-normal">
          {data.subtitle}
        </p>

        {/* Ambient background decoration */}
        <div className="absolute top-0 left-0 w-24 h-24 bg-[#ff1a40]/5 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#ff1a40]/5 blur-3xl rounded-full" />
      </div>

      {/* Intro Overview Panel */}
      <div id="intro-panel" className="bg-slate-50 dark:bg-slate-900/30 rounded-2xl p-6 sm:p-8 border border-slate-200/50 dark:border-slate-900/40 shadow-sm flex flex-col md:flex-row items-start gap-6">
        <div className="p-3 bg-[#ff1a40]/10 dark:bg-[#ff1a40]/20 text-[#ff1a40] rounded-xl shrink-0">
          <Video className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            {data.sections.introTitle}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-450 leading-relaxed font-normal">
            {data.sections.introDesc}
          </p>
        </div>
      </div>

      {/* Steps list in simple 1-column layout */}
      <div className="space-y-6">
        <div className="px-1 text-center md:text-start">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {data.sections.stepsTitle}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {data.sections.stepsDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.steps.map((step) => {
            const IconComp = step.icon;
            return (
              <div 
                key={step.id} 
                id={step.id}
                className="group relative flex gap-4 p-5 bg-white dark:bg-slate-950 rounded-2xl border border-slate-200/60 dark:border-slate-900 shadow-xs hover:shadow-md transition duration-300"
              >
                {/* Step ID badge */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-900 text-[#ff1a40] text-sm font-black border border-slate-100 dark:border-slate-800 shadow-inner group-hover:bg-[#ff1a40]/10 transition-colors duration-300">
                  {step.num}
                </div>
                
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <IconComp className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-[#ff1a40] transition-colors" />
                    <h3 className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-200">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-normal leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Expert Tip Box */}
      <div className="bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/25 p-5 rounded-2xl flex items-start gap-4">
        <Info className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="text-sm font-black text-amber-600 dark:text-amber-400">
            {locale === 'ar' ? "💡 نصيحة الخبراء" : "💡 Golden Tip"}
          </span>
          <p className="text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-400 font-normal">
            {locale === 'ar' 
              ? "كلما كان الوصف تفصيلياً ويعبر عن عناصر الإضاءة والمشهد بدقة كأنك تصف صورة فوتوغرافية، كلما تمكن الذكاء الاصطناعي Veo 3 من تجسيدها بحركة انسيابية خالية من العيوب." 
              : "The more cinematic parameters you explicitly model (such as specifying lenses, focus coordinates, dust, or atmospheric haze), the more detailed Veo 3's high-speed motion sequence will become."
            }
          </p>
        </div>
      </div>

      {/* Direct Generation Page Link Button */}
      <div className="pt-4 text-center animate-fade-in">
        <a 
          href={finalDestination} 
          onClick={handleCtaClick}
          className="inline-flex flex-col items-center gap-1 group no-underline text-inherit"
        >
          <div className="inline-flex items-center gap-2 px-8 py-4 sm:py-4.5 bg-[#ff1a40] text-white font-sans font-black text-base sm:text-lg rounded-2xl hover:bg-[#e00f32] active:scale-[0.98] transition-all shadow-lg hover:shadow-[#ff1a40]/30 duration-300 select-none cursor-pointer">
            <span>{data.ctaBtn}</span>
            <ExternalLink className="w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
          </div>
          <span className="text-xs text-slate-400 dark:text-slate-500 mt-1 font-normal opacity-85">
            {data.ctaDesc}
          </span>
        </a>
      </div>

      {/* Frequently Asked Questions */}
      <div className="bg-white dark:bg-slate-950 rounded-2xl border border-slate-200/60 dark:border-slate-900 p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2 mb-6">
          <HelpCircle className="w-5 h-5 text-[#ff1a40]" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            {data.sections.faqTitle}
          </h2>
        </div>

        <div className="space-y-6 divide-y divide-slate-150 dark:divide-slate-900/60 font-sans">
          {data.faqs.map((faq, idx) => (
            <div 
              key={`faq-${idx}`} 
              className={`pt-5 first:pt-0 space-y-2`}
            >
              <h3 className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-200">
                {faq.q}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
