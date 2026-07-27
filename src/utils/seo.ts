import { Product } from "../types";

export function createProductSlug(product: Partial<Product>): string {
  if (product.slug && product.slug.trim()) {
    return product.slug
      .trim()
      .toLowerCase()
      .replace(/[^\w\u0600-\u06FF\s-]/g, "")
      .replace(/\s+/g, "-");
  }

  // Combine Brand, Title, and Model for a rich SEO keyword string
  const rawStr = `${product.brandName || ""} ${product.titleAr || product.titleEn || ""} ${product.modelNumber || ""}`;
  const cleaned = rawStr
    .toLowerCase()
    .replace(/[^\w\u0600-\u06FF\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

  return cleaned || "product";
}

export function createProductUrl(product: Product, baseUrl?: string): string {
  const origin = baseUrl || (typeof window !== "undefined" ? window.location.origin : "https://dkora.online");
  const slug = createProductSlug(product);
  return `${origin}/?product=${product.id}-${encodeURIComponent(slug)}`;
}

export function findProductByQueryParam(
  products: Product[],
  paramValue?: string | null,
  keywordParam?: string | null
): Product | undefined {
  if (!paramValue && !keywordParam) return undefined;

  let rawVal = "";
  if (paramValue) {
    try {
      rawVal = decodeURIComponent(paramValue).trim();
    } catch {
      rawVal = paramValue.trim();
    }
  }

  let rawKeyword = "";
  if (keywordParam) {
    try {
      rawKeyword = decodeURIComponent(keywordParam).trim();
    } catch {
      rawKeyword = keywordParam.trim();
    }
  }

  // 1. Direct ID or slug match
  if (rawVal) {
    let match = products.find(
      (p) =>
        p.id === rawVal ||
        p.slug === rawVal ||
        String(p.id) === rawVal
    );
    if (match) return match;

    // 2. Match ID prefix e.g. "p1-dewalt-dcd796" -> "p1"
    const dashIndex = rawVal.indexOf("-");
    if (dashIndex > 0) {
      const possibleId = rawVal.substring(0, dashIndex);
      match = products.find((p) => p.id === possibleId || String(p.id) === possibleId);
      if (match) return match;
    }

    // 3. Match ID suffix e.g. "dewalt-dcd796-p1" -> "p1"
    const lastDashIndex = rawVal.lastIndexOf("-");
    if (lastDashIndex > 0) {
      const possibleId = rawVal.substring(lastDashIndex + 1);
      match = products.find((p) => p.id === possibleId || String(p.id) === possibleId);
      if (match) return match;
    }

    // 4. Match by slug or keyword inside string
    match = products.find(
      (p) =>
        (p.slug && (rawVal.includes(p.slug) || p.slug.includes(rawVal))) ||
        (p.modelNumber && rawVal.toLowerCase().includes(p.modelNumber.toLowerCase())) ||
        (p.titleEn && rawVal.toLowerCase().includes(p.titleEn.toLowerCase().replace(/\s+/g, "-"))) ||
        (p.titleAr && rawVal.includes(p.titleAr))
    );
    if (match) return match;
  }

  // 5. Keyword parameter lookup fallback
  if (rawKeyword) {
    const match = products.find(
      (p) =>
        p.id === rawKeyword ||
        p.slug === rawKeyword ||
        (p.slug && p.slug.includes(rawKeyword)) ||
        (p.titleAr && p.titleAr.includes(rawKeyword)) ||
        (p.brandName && p.brandName.toLowerCase().includes(rawKeyword.toLowerCase()))
    );
    if (match) return match;
  }

  return undefined;
}

