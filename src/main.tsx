import './index.css';

// Interface matching the expandable, infinite data structure
interface FootballTerm {
  id: number;
  title: string;
  definition: string;
  analysis: string;
  history: string;
}

// Global state
let database: FootballTerm[] = [];
let activeFilteredData: FootballTerm[] = [];

// DOM Elements cache
const searchInput = document.getElementById('search-input') as HTMLInputElement | null;
const searchClearBtn = document.getElementById('search-clear') as HTMLButtonElement | null;
const resultsSection = document.getElementById('results-section') as HTMLElement | null;
const noResultsView = document.getElementById('no-results-view') as HTMLElement | null;
const statsCountEl = document.getElementById('stats-count') as HTMLElement | null;
const searchStatusText = document.getElementById('search-status-text') as HTMLElement | null;
const resetSearchBtn = document.getElementById('reset-search-btn') as HTMLElement | null;
const logoBadge = document.getElementById('logo-badge') as HTMLElement | null;

/**
 * Normalizes Arabic characters to ensure incredibly high tolerance search matching.
 */
function normalizeArabic(text: string): string {
  if (!text) return '';
  return text
    .toLowerCase()
    .trim()
    .replace(/[أإآا]/g, 'ا') // Normalize alefs
    .replace(/ة/g, 'ه')       // Normalize teh marbuta
    .replace(/[ىي]/g, 'ي')     // Normalize alef maksura / yeh
    .replace(/[ًٌٍَُِّْ]/g, ''); // Strip Arabic vocalization diacritics (tashkeel)
}

/**
 * Computes the Levenshtein Distance between two strings to enable full Fuzzy Search logic.
 */
function getLevenshteinDistance(s1: string, s2: string): number {
  const m = s1.length;
  const n = s2.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,      // Deletion
        dp[i][j - 1] + 1,      // Insertion
        dp[i - 1][j - 1] + cost // Substitution
      );
    }
  }
  return dp[m][n];
}

/**
 * Determines whether two words are fuzzy-similar (fuzzy matching tolerating typos).
 */
function isFuzzySimilar(word1: string, word2: string): boolean {
  if (Math.abs(word1.length - word2.length) > 2) return false;
  
  // Custom threshold depending on word length
  const maxLength = Math.max(word1.length, word2.length);
  const threshold = maxLength <= 3 ? 1 : maxLength <= 5 ? 2 : 3;
  
  return getLevenshteinDistance(word1, word2) <= threshold;
}

/**
 * Fuzzy search scorer that computes relevance values based on matches & similarity.
 */
function computeSearchRelevance(term: FootballTerm, query: string): number {
  const normQuery = normalizeArabic(query);
  if (!normQuery) return 1;

  const queryWords = normQuery.split(/\s+/).filter(Boolean);
  if (queryWords.length === 0) return 1;

  // Normalize targets
  const normTitle = normalizeArabic(term.title);
  const normDef = normalizeArabic(term.definition);
  const normAnalysis = normalizeArabic(term.analysis);
  const normHistory = normalizeArabic(term.history);

  const titleWords = normTitle.split(/\s+/).filter(Boolean);
  const bodyWords = [
    ...normDef.split(/\s+/),
    ...normAnalysis.split(/\s+/),
    ...normHistory.split(/\s+/),
  ].filter(Boolean);

  let totalScore = 0;

  for (const qWord of queryWords) {
    let wordMatchScore = 0;

    // 1. Direct Substring Check in Title (Highest Weight)
    if (normTitle.includes(qWord)) {
      wordMatchScore += 150;
    }

    // 2. Direct Substring Check in Body Fields
    if (normDef.includes(qWord) || normAnalysis.includes(qWord) || normHistory.includes(qWord)) {
      wordMatchScore += 50;
    }

    // 3. Exact Word Matches in Title
    if (titleWords.some(tWord => tWord === qWord)) {
      wordMatchScore += 100;
    }

    // 4. Exact Word Matches in Body
    if (bodyWords.some(bWord => bWord === qWord)) {
      wordMatchScore += 30;
    }

    // 5. Fuzzy Match (Levenhshtein) in Title
    if (titleWords.some(tWord => isFuzzySimilar(tWord, qWord))) {
      wordMatchScore += 60;
    }

    // 6. Fuzzy Match (Levenshtein) in Body
    if (bodyWords.some(bWord => isFuzzySimilar(bWord, qWord))) {
      wordMatchScore += 15;
    }

    totalScore += wordMatchScore;
  }

  // If none of the words matched directly or fuzzily, discard
  return totalScore;
}

/**
 * Highlights searched words in the text rendered inside cards.
 */
function highlightKeywords(text: string, query: string): string {
  if (!query.trim()) return text;
  
  const words = query.trim().split(/\s+/).filter((w) => w.length > 1);
  if (words.length === 0) return text;

  let highlighted = text;
  words.forEach((word) => {
    // Escaping regex Special Characters
    const escapedWord = word.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    // Regex matching Arabic normalized or exact options
    // To support Arabic, we match the characters directly and do a case-insensitive match
    try {
      const regex = new RegExp(`(${escapedWord})`, 'gi');
      highlighted = highlighted.replace(regex, '<mark class="bg-yellow-150 dark:bg-amber-950/70 text-emerald-800 dark:text-emerald-300 px-0.5 rounded font-semibold">$1</mark>');
    } catch (e) {
      // Fallback if regex generation fails due to complex inputs
    }
  });

  return highlighted;
}

/**
 * Renders the Cards dynamically inside resultsSection.
 */
function renderCards(terms: FootballTerm[], highlightQuery: string = '') {
  if (!resultsSection) return;

  resultsSection.innerHTML = '';

  if (terms.length === 0) {
    resultsSection.classList.add('hidden');
    if (noResultsView) {
      noResultsView.classList.remove('hidden');
      noResultsView.classList.add('flex');
    }
    updateStatusText(0);
    return;
  }

  resultsSection.classList.remove('hidden');
  if (noResultsView) {
    noResultsView.classList.add('hidden');
    noResultsView.classList.remove('flex');
  }

  updateStatusText(terms.length);

  // Generate HTML for each item and inject
  terms.forEach((term, index) => {
    const cardEl = document.createElement('article');
    cardEl.id = `term-${term.id}`;
    // Mobile responsive styling friendly for Oppo A15 (HD+), using high spacing & readable font heights
    cardEl.className = `group relative bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md hover:border-teal-500/50 dark:hover:border-teal-500/40 hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between overflow-hidden opacity-0 translate-y-4 animate-fade-in`;
    cardEl.style.animationDelay = `${index * 50}ms`;
    cardEl.style.animationFillMode = 'forwards';

    // Set interactive highlit texts
    const displayTitle = highlightKeywords(term.title, highlightQuery);
    const displayDef = highlightKeywords(term.definition, highlightQuery);
    const displayAnalysis = highlightKeywords(term.analysis, highlightQuery);
    const displayHistory = highlightKeywords(term.history, highlightQuery);

    // Determine category based on keywords
    let categoryBadgeHTML = '';
    if (term.title.includes('ملعب') || term.title.includes('أزتيكا')) {
      categoryBadgeHTML = `
        <span class="inline-flex items-center gap-1.5 px-2.5 py-1 bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400 text-xs font-bold rounded-lg border border-sky-100 dark:border-sky-900/40">
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16M2 21h20"/></svg>
          ملعب وموقع مونديالي
        </span>
      `;
    } else if (term.title.includes('نظام') || term.title.includes('48')) {
      categoryBadgeHTML = `
        <span class="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 text-xs font-bold rounded-lg border border-amber-100 dark:border-amber-900/40">
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          لوائح وأنظمة البطولة
        </span>
      `;
    } else if (term.title.includes('المغرب') || term.title.includes('تاريخ')) {
      categoryBadgeHTML = `
        <span class="inline-flex items-center gap-1.5 px-2.5 py-1 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-400 text-xs font-bold rounded-lg border border-indigo-100 dark:border-indigo-900/40">
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
          قصص ومشاركات تاريخية
        </span>
      `;
    } else {
      categoryBadgeHTML = `
        <span class="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 text-xs font-bold rounded-lg border border-emerald-100 dark:border-emerald-900/40">
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/></svg>
          تكتيكات كرة قدم
        </span>
      `;
    }

    cardEl.innerHTML = `
      <div class="space-y-4">
        <!-- Top Metadata & Categories -->
        <div class="flex items-center justify-between gap-2">
          ${categoryBadgeHTML}
          <span class="text-xs font-bold font-mono text-slate-400 dark:text-slate-500">#${term.id}</span>
        </div>

        <!-- Term Arabic Title -->
        <h3 class="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-150 leading-snug">
          ${displayTitle}
        </h3>

        <!-- 1. Definition Block -->
        <div class="space-y-1.5">
          <span class="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
            <!-- Book Icon Open -->
            <svg class="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25a8.987 8.987 0 0 1 6-1.8c2.305 0 4.408.867 6 2.292m0-16.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-16.25v14.25" />
            </svg>
            التعريف اللغوي والكروي
          </span>
          <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-semibold">
            ${displayDef}
          </p>
        </div>

        <!-- 2. Rich Analysis Block (Premium) -->
        <div class="bg-gradient-to-br from-emerald-500/5 to-teal-500/5 dark:from-emerald-500/10 dark:to-teal-500/10 border-r-3 border-emerald-500 rounded-xl p-4 space-y-2">
          <span class="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
            <!-- Sparkles/Brain Icon -->
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 21l8.904-4.113M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707" />
            </svg>
            تحليل دسم (dkora Analysis)
          </span>
          <p class="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
            ${displayAnalysis}
          </p>
        </div>

        <!-- 3. Historical Lore Block -->
        <div class="bg-slate-50 dark:bg-slate-800/40 rounded-xl p-4 space-y-2 border border-slate-100 dark:border-slate-800/60">
          <span class="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-wider">
            <!-- Scroll / Clock Icon -->
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            قصة تاريخية مجيدة
          </span>
          <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic">
            ${displayHistory}
          </p>
        </div>
      </div>

      <!-- Footer Action Share Link Panel -->
      <div class="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
        <span class="text-xxs text-slate-400 dark:text-slate-500 font-mono">آخر تحديث: يونيو 2026</span>
        <button 
          class="share-btn inline-flex items-center gap-2 px-3.5 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-emerald-600 dark:hover:bg-emerald-600 text-slate-700 dark:text-slate-200 hover:text-white dark:hover:text-white text-xs font-bold rounded-lg transition-all duration-200 cursor-pointer"
          data-id="${term.id}"
          title="مشاركة رابط المصطلح ومزامنته"
        >
          <!-- Share Icon -->
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186l5.566-2.783m-5.566 4.97l5.566 2.783m-.12-11.458a2.25 2.25 0 113.516 2.186m-3.516-2.186V6m0 12v.008H18" />
          </svg>
          مشاركة الرابط
        </button>
      </div>
    `;

    resultsSection.appendChild(cardEl);
  });

  // Attach clipboard events to all dynamic share buttons
  const shareButtons = resultsSection.querySelectorAll('.share-btn');
  shareButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const termId = (btn as HTMLButtonElement).getAttribute('data-id');
      if (termId) {
        copyTermLinkToClipboard(parseInt(termId));
      }
    });
  });
}

/**
 * Handles copy-to-clipboard utilizing direct fallback patterns for perfect sandbox support.
 */
function copyTermLinkToClipboard(id: number) {
  // Construct precise shared link containing term query parameter
  const shareUrl = `${window.location.origin}${window.location.pathname}?term=${id}`;

  const copySuccess = () => {
    // Show beautiful floating success toast
    const toast = document.getElementById('share-toast');
    if (toast) {
      toast.classList.remove('opacity-0', 'translate-y-20', 'pointer-events-none');
      toast.classList.add('opacity-100', 'translate-y-0');
      
      setTimeout(() => {
        toast.classList.remove('opacity-100', 'translate-y-0');
        toast.classList.add('opacity-0', 'translate-y-20', 'pointer-events-none');
      }, 3500);
    }
  };

  // Try standard Clipboard API
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(shareUrl)
      .then(copySuccess)
      .catch(() => fallbackCopyTextToClipboard(shareUrl, copySuccess));
  } else {
    fallbackCopyTextToClipboard(shareUrl, copySuccess);
  }
}

/**
 * Fallback clipboard copier for restrictive iframe wrappers.
 */
function fallbackCopyTextToClipboard(text: string, callback: () => void) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  
  // Outer hide parameters
  textArea.style.top = '0';
  textArea.style.left = '0';
  textArea.style.position = 'fixed';
  textArea.style.opacity = '0';

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    const successful = document.execCommand('copy');
    if (successful) {
      callback();
    } else {
      console.error('Failed to copy term link using fallback execCommand.');
    }
  } catch (err) {
    console.error('Fallback copy operation triggered exception: ', err);
  }

  document.body.removeChild(textArea);
}

/**
 * Updates description texts of current visible matches.
 */
function updateStatusText(count: number) {
  if (!searchStatusText) return;
  if (count === database.length) {
    searchStatusText.innerHTML = `عرض جميع المواد الموثقة (<span class="font-bold underline">${count} تكتيكات</span>)`;
    searchStatusText.className = 'font-semibold text-slate-500';
  } else if (count > 0) {
    searchStatusText.innerHTML = `عُثر على <span class="font-bold underline">${count} مصطلحات</span> تطابق كلماتك`;
    searchStatusText.className = 'font-semibold text-emerald-600 dark:text-emerald-400';
  } else {
    searchStatusText.innerHTML = 'لم يتم العثور على أي تحليلات مطابقة للبحث';
    searchStatusText.className = 'font-semibold text-rose-500 dark:text-rose-400';
  }
}

/**
 * Integrates Fuzzy Search matching on every stroke.
 */
function filterDatabase(query: string) {
  const trimmed = query.trim();
  if (!trimmed) {
    activeFilteredData = [...database];
    renderCards(activeFilteredData);
    if (searchClearBtn) searchClearBtn.classList.add('hidden');
    return;
  }

  if (searchClearBtn) searchClearBtn.classList.remove('hidden');

  // Compute a relevance score for every single database record
  const scoredTerms = database
    .map(term => ({
      term,
      score: computeSearchRelevance(term, trimmed)
    }))
    // Filter out rows possessing 0 score
    .filter(item => item.score > 0)
    // Sort descending by highest match relevance
    .sort((a, b) => b.score - a.score);

  activeFilteredData = scoredTerms.map(item => item.term);
  renderCards(activeFilteredData, trimmed);
}

/**
 * Handles automatic dark and light theme setup with user preferences.
 */
function initThemeEngine() {
  const themeToggleBtn = document.getElementById('theme-toggle');

  const setTheme = (isDark: boolean) => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // Check saved localStorage state
  const savedTheme = localStorage.getItem('theme');

  // Check system preferences (prefers-color-scheme) as requested
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Decide theme
  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    setTheme(true);
  } else {
    setTheme(false);
  }

  // Handle automatic changes of prefers-color-scheme
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches);
    }
  });

  // Handle manual clicks
  themeToggleBtn?.addEventListener('click', () => {
    const isNowDark = !document.documentElement.classList.contains('dark');
    setTheme(isNowDark);
  });
}

/**
 * Handle scrolling & visual highlight for shared deep-links (?term=5 or #term-5)
 */
function handleDeepLinking() {
  const urlParams = new URLSearchParams(window.location.search);
  const termParam = urlParams.get('term');
  const hashParam = window.location.hash;
  
  let targetId: number | null = null;
  
  if (termParam) {
    targetId = parseInt(termParam);
  } else if (hashParam && hashParam.startsWith('#term-')) {
    targetId = parseInt(hashParam.replace('#term-', ''));
  }

  if (targetId && !isNaN(targetId)) {
    const matchedTerm = database.find(item => item.id === targetId);
    if (matchedTerm) {
      // 1. Isolate just that card or highlight it in input
      if (searchInput) {
        searchInput.value = matchedTerm.title;
        filterDatabase(matchedTerm.title);
      }
      
      // 2. Perform smooth scroll and highlight of the node
      setTimeout(() => {
        const targetCard = document.getElementById(`term-${targetId}`);
        if (targetCard) {
          targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
          targetCard.classList.remove('border-slate-200/80', 'dark:border-slate-800/80');
          // Golden pulse effect to signal shared spotlight
          targetCard.classList.add('ring-4', 'ring-amber-500/50', 'border-amber-500');
          
          // Clear spotlight ring after a animation cycle
          setTimeout(() => {
            targetCard.classList.remove('ring-4', 'ring-amber-500/50');
          }, 3500);
        }
      }, 500);
    }
  }
}

/**
 * Initialize all interaction bindings in the app.
 */
function initInteractiveBindings() {
  // Input triggers
  searchInput?.addEventListener('input', (e) => {
    const value = (e.target as HTMLInputElement).value;
    filterDatabase(value);
  });

  // Custom clearing trigger
  searchClearBtn?.addEventListener('click', () => {
    if (searchInput) {
      searchInput.value = '';
      filterDatabase('');
      searchInput.focus();
    }
  });

  // Fast tags elements
  const fastTags = document.querySelectorAll('.fast-tag');
  fastTags.forEach((tag) => {
    tag.addEventListener('click', () => {
      const keyword = tag.getAttribute('data-tag');
      if (keyword && searchInput) {
        searchInput.value = keyword;
        filterDatabase(keyword);
        searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  });

  // Reset searchBtn fallback
  resetSearchBtn?.addEventListener('click', () => {
    if (searchInput) {
      searchInput.value = '';
      filterDatabase('');
      searchInput.focus();
    }
  });

  // Logo badge clicking resets and refreshes
  logoBadge?.addEventListener('click', () => {
    if (searchInput) {
      searchInput.value = '';
      filterDatabase('');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/**
 * Bootstraps the application data feed and UI binding state.
 */
async function startApp() {
  initThemeEngine();
  initInteractiveBindings();

  try {
    // Fetch external data JSON as requested ("تعتمد على ملف خارجي باسم data.json")
    const response = await fetch('/data.json');
    if (!response.ok) {
      throw new Error(`Failed to load data.json: HTTP ${response.status}`);
    }
    
    database = await response.json();
    activeFilteredData = [...database];
    
    // Animate stats counter
    if (statsCountEl) {
      let currentVal = 0;
      const targetVal = database.length;
      const duration = 800;
      const increment = Math.ceil(targetVal / (duration / 16));
      
      const counterInterval = setInterval(() => {
        currentVal += increment;
        if (currentVal >= targetVal) {
          currentVal = targetVal;
          clearInterval(counterInterval);
        }
        statsCountEl.textContent = currentVal.toString();
      }, 16);
    }

    // Default rendering setup
    renderCards(activeFilteredData);

    // Deep routing synchronization
    handleDeepLinking();

  } catch (err) {
    console.error('Error bootstrapping client-side database: ', err);
    if (resultsSection) {
      resultsSection.innerHTML = `
        <div class="col-span-full border border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-900/40 rounded-2xl p-6 text-center text-red-600 dark:text-red-400 space-y-2">
          <svg class="w-8 h-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <p class="font-bold">فشل الاتصال التفاعلي بقاعدة البيانات!</p>
          <p class="text-xs">يرجى التأكد من وجود ملف <code class="bg-red-100 dark:bg-red-950 px-1 py-0.5 rounded">public/data.json</code> وصحة هيكله البرمجي.</p>
        </div>
      `;
    }
  }
}

// Fire Startup sequence
window.addEventListener('DOMContentLoaded', startApp);
