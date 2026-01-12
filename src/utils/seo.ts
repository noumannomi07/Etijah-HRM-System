/**
 * SEO Utilities for Etijah HR System
 * Provides helper functions for better SEO implementation
 */

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: "website" | "article" | "product";
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
}

/**
 * Generate page title with site branding
 */
export const generatePageTitle = (pageTitle?: string, lang: string = "ar"): string => {
  const siteName = lang === "ar"
    ? "نظام اتجاه - أفضل نظام موارد بشرية سحابي في السعودية"
    : "Etijah System - Best Cloud HR System in Saudi Arabia";

  return pageTitle ? `${pageTitle} | ${siteName}` : siteName;
};

/**
 * Generate meta description
 */
export const generateMetaDescription = (
  description?: string,
  lang: string = "ar"
): string => {
  const defaultDescription = lang === "ar"
    ? "نظام اتجاه هو برنامج متكامل لإدارة شؤون الموظفين، الحضور والانصراف، الرواتب، والإجازات. مصمم خصيصًا للشركات في السعودية لتبسيط إدارة الموارد البشرية بكفاءة عالية."
    : "Etijah is a comprehensive system for managing employee affairs, attendance, payroll, and vacations. Specially designed for companies in Saudi Arabia to simplify HR management efficiently.";

  return description || defaultDescription;
};

/**
 * Generate meta keywords
 */
export const generateMetaKeywords = (
  customKeywords?: string,
  lang: string = "ar"
): string => {
  const defaultKeywords = lang === "ar"
    ? "نظام الموارد البشرية, برنامج HR, إدارة الموارد البشرية, نظام موارد بشرية سعودي, نظام hr, برنامج شؤون موظفين, نظام حضور وانصراف, حساب الرواتب, إدارة الإجازات, أفضل نظام موارد بشرية في السعودية, نظام موارد بشرية متكامل, نظام اتجاه, HRMS"
    : "HR System, HR Software, Human Resources Management, Saudi HR System, HR Management, Employee Management, Attendance System, Payroll, Vacation Management, Best HR System in Saudi Arabia, Integrated HR System, Etijah, HRMS";

  return customKeywords || defaultKeywords;
};

/**
 * Truncate text for meta descriptions
 */
export const truncateText = (text: string, maxLength: number = 160): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + "...";
};

/**
 * Generate breadcrumb schema
 */
export const generateBreadcrumbSchema = (
  items: Array<{ name: string; url: string }>
) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
};

/**
 * Generate FAQ schema
 */
export const generateFAQSchema = (
  faqs: Array<{ question: string; answer: string }>
) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
};

/**
 * Generate Article schema
 */
export const generateArticleSchema = (article: {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
}) => {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: article.image,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      "@type": "Organization",
      name: article.author || "Etijah HR System",
    },
    publisher: {
      "@type": "Organization",
      name: "Etijah HR System",
      logo: {
        "@type": "ImageObject",
        url: "https://etijah.sa/logotext.svg",
      },
    },
  };
};

/**
 * Generate Organization schema
 */
export const generateOrganizationSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Etijah HR System",
    url: "https://etijah.sa",
    logo: "https://etijah.sa/logotext.svg",
    description: "أفضل نظام موارد بشرية سحابي في السعودية",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+966-XX-XXX-XXXX",
      contactType: "Customer Service",
      areaServed: "SA",
      availableLanguage: ["Arabic", "English"],
    },
    sameAs: [
      "https://twitter.com/Etijah_HR",
      "https://www.linkedin.com/company/etijah",
      "https://www.facebook.com/etijah",
    ],
  };
};

/**
 * Generate SoftwareApplication schema
 */
export const generateSoftwareSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "نظام اتجاه للموارد البشرية",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "نظام اتجاه هو برنامج متكامل لإدارة شؤون الموظفين، الحضور والانصراف، الرواتب، والإجازات",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "SAR",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "150",
    },
  };
};

/**
 * Clean text for SEO (remove HTML tags, extra spaces, etc.)
 */
export const cleanTextForSEO = (text: string): string => {
  return text
    .replace(/<[^>]*>/g, "") // Remove HTML tags
    .replace(/\s+/g, " ") // Replace multiple spaces with single space
    .trim();
};

/**
 * Generate canonical URL
 */
export const generateCanonicalURL = (pathname: string): string => {
  const baseUrl = "https://etijah.sa";
  return `${baseUrl}${pathname}`;
};

/**
 * Check if current page should be indexed
 */
export const shouldIndexPage = (pathname: string): boolean => {
  const noIndexPaths = [
    "/dashboard",
    "/login",
    "/auth",
    "/admin",
    "/signup",
  ];

  return !noIndexPaths.some((path) => pathname.startsWith(path));
};

/**
 * Generate Open Graph image URL
 */
export const generateOGImageURL = (imagePath?: string): string => {
  const baseUrl = "https://etijah.sa";
  const defaultImage = "/logotext.svg";

  return imagePath ? `${baseUrl}${imagePath}` : `${baseUrl}${defaultImage}`;
};

/**
 * SEO Constants
 */
export const SEO_CONSTANTS = {
  SITE_NAME: {
    ar: "نظام اتجاه للموارد البشرية",
    en: "Etijah HR System",
  },
  SITE_URL: "https://etijah.sa",
  TWITTER_HANDLE: "@Etijah_HR",
  FACEBOOK_URL: "https://www.facebook.com/etijah",
  LINKEDIN_URL: "https://www.linkedin.com/company/etijah",
  DEFAULT_IMAGE: "/logotext.svg",
  DEFAULT_LOCALE: {
    ar: "ar_SA",
    en: "en_US",
  },
  THEME_COLOR: "#1e40af",
  CONTACT_PHONE: "+966-XX-XXX-XXXX",
};

