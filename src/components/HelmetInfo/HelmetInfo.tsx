import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface HelmetInfoProps {
  titlePage?: string;
  description?: string;
  keywords?: string;
  image?: string;
  type?: "website" | "article" | "product";
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
  noIndex?: boolean;
}

const HelmetInfo: React.FC<HelmetInfoProps> = ({
  titlePage,
  description,
  keywords,
  image,
  type = "website",
  article,
  noIndex = false,
}) => {
  const location = useLocation();
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language || "ar");

  // Force update when language changes
  useEffect(() => {
    setCurrentLang(i18n.language || "ar");
  }, [i18n.language]);

  // Default values
  const defaultTitle = currentLang === "ar"
    ? "نظام اتجاه - أفضل نظام موارد بشرية سحابي في السعودية"
    : "Etijah System - Best Cloud HR System in Saudi Arabia";

  const defaultDescription = currentLang === "ar"
    ? "نظام اتجاه هو برنامج متكامل لإدارة شؤون الموظفين، الحضور والانصراف، الرواتب، والإجازات. مصمم خصيصًا للشركات في السعودية لتبسيط إدارة الموارد البشرية بكفاءة عالية."
    : "Etijah is a comprehensive system for managing employee affairs, attendance, payroll, and vacations. Specially designed for companies in Saudi Arabia to simplify HR management efficiently.";

  const defaultKeywords = currentLang === "ar"
    ? "نظام الموارد البشرية, برنامج HR, إدارة الموارد البشرية, نظام موارد بشرية سعودي, نظام hr, برنامج شؤون موظفين, نظام حضور وانصراف, حساب الرواتب, إدارة الإجازات, أفضل نظام موارد بشرية في السعودية, نظام موارد بشرية متكامل, نظام اتجاه, HRMS, Human Resources Management"
    : "HR System, HR Software, Human Resources Management, Saudi HR System, HR Management, Employee Management, Attendance System, Payroll, Vacation Management, Best HR System in Saudi Arabia, Integrated HR System, Etijah, HRMS";

  const siteUrl = "https://etijah.sa";
  const currentUrl = `${siteUrl}${location.pathname}`;
  const defaultImage = `${siteUrl}/logotext.svg`;

  const pageTitle = titlePage ? `${titlePage} | ${defaultTitle}` : defaultTitle;
  const metaDescription = description || defaultDescription;
  const metaKeywords = keywords || defaultKeywords;
  const metaImage = image ? `${siteUrl}${image}` : defaultImage;

  // Language and locale
  const locale = currentLang === "ar" ? "ar_SA" : "en_US";
  const alternateLocale = currentLang === "ar" ? "en_US" : "ar_SA";

  // Schema.org structured data
  const getStructuredData = () => {
    const baseSchema = {
      "@context": "https://schema.org",
      "@type": type === "article" ? "Article" : "SoftwareApplication",
    };

    if (type === "article" && article) {
      return {
        ...baseSchema,
        headline: pageTitle,
        description: metaDescription,
        image: metaImage,
        datePublished: article.publishedTime,
        dateModified: article.modifiedTime || article.publishedTime,
        author: {
          "@type": "Organization",
          name: article.author || "Etijah HR System",
        },
        publisher: {
          "@type": "Organization",
          name: "Etijah HR System",
          logo: {
            "@type": "ImageObject",
            url: defaultImage,
          },
        },
        articleSection: article.section,
        keywords: article.tags?.join(", "),
      };
    }

    return {
      ...baseSchema,
      name: "نظام اتجاه للموارد البشرية",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: metaDescription,
      image: metaImage,
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

  // Organization structured data
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Etijah HR System",
    url: siteUrl,
    logo: defaultImage,
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

  return (
    <Helmet key={currentLang}>
      {/* Basic Meta Tags */}
      <html lang={currentLang} dir={currentLang === "ar" ? "rtl" : "ltr"} />
      <title>{pageTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <meta name="author" content="Etijah HR System" />

      {/* Robots */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />

      {/* Favicon */}
      <link rel="shortcut icon" type="image/png" href="/favicon.svg" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="apple-touch-icon" href="/logoicon.svg" />

      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />

      {/* Alternate Languages */}
      <link rel="alternate" hrefLang="ar" href={`${siteUrl}${location.pathname}?lang=ar`} />
      <link rel="alternate" hrefLang="en" href={`${siteUrl}${location.pathname}?lang=en`} />
      <link rel="alternate" hrefLang="x-default" href={`${siteUrl}${location.pathname}`} />

      {/* Open Graph Meta Tags */}
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content={locale} />
      <meta property="og:locale:alternate" content={alternateLocale} />
      <meta property="og:site_name" content="نظام اتجاه للموارد البشرية" />

      {/* Article specific OG tags */}
      {type === "article" && article && (
        <>
          <meta property="article:published_time" content={article.publishedTime} />
          <meta property="article:modified_time" content={article.modifiedTime} />
          <meta property="article:author" content={article.author} />
          <meta property="article:section" content={article.section} />
          {article.tags?.map((tag) => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@Etijah_HR" />
      <meta name="twitter:creator" content="@Etijah_HR" />
      <meta name="twitter:domain" content="etijah.sa" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />

      {/* Mobile & Theme */}
      <meta name="theme-color" content="#1e40af" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Etijah HR" />

      {/* Geographic Tags */}
      <meta name="geo.region" content="SA" />
      <meta name="geo.placename" content="Saudi Arabia" />

      {/* Structured Data - Page Specific */}
      <script type="application/ld+json">
        {JSON.stringify(getStructuredData())}
      </script>

      {/* Structured Data - Organization */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>

      {/* Breadcrumb Schema (if applicable) */}
      {location.pathname !== "/" && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: siteUrl,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: titlePage || "Page",
                item: currentUrl,
              },
            ],
          })}
        </script>
      )}
    </Helmet>
  );
};

export default HelmetInfo;
