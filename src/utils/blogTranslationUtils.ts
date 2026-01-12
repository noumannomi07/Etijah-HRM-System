// Utility functions for translating blog data from API
// This handles the bilingual data structure returned by your backend

export interface BlogApiResponse {
  id: number;
  title: string;
  ar_title: string;
  en_title: string;
  content: string;
  ar_content: string;
  en_content: string;
  image: string;
  category_id: number;
  category?: {
    id: number;
    title: string;
    translations: Array<{
      id: number;
      blog_category_id: number;
      locale: string;
      title: string;
    }>;
  };
}

export interface CategoryApiResponse {
  id: number;
  title: string;
  translations?: Array<{
    id: number;
    blog_category_id: number;
    locale: string;
    title: string;
  }>;
}

/**
 * Translates a single blog item based on the current language
 * @param blog - Blog data from API with bilingual content
 * @param language - Current language ('ar' or 'en')
 * @returns Translated blog object
 */
export const translateBlogItem = (blog: BlogApiResponse, language: string) => {
  return {
    ...blog,
    title: language === 'ar' ? blog.ar_title : blog.en_title,
    content: language === 'ar' ? blog.ar_content : blog.en_content,
    category: blog.category ? {
      ...blog.category,
      title: translateCategoryTitle(blog.category, language)
    } : undefined
  };
};

// Category translations mapping based on your API data
const categoryTranslations: Record<number, { ar: string; en: string }> = {
  1: {
    ar: "الحضور وإدارة الوقت",
    en: "Attendance Management"
  },
  2: {
    ar: "الرواتب والمزايا", 
    en: "Payroll & Benefits"
  },
  5: {
    ar: "تطوير وتدريب الموظفين",
    en: "Employee Development & Training"
  },
  8: {
    ar: "إدارة الموارد البشرية الحديثة",
    en: "Modern Human Resources Management"
  },
  10: {
    ar: "أدلة ولوائح العمل",
    en: "Work Policies & Regulations"
  },
  13: {
    ar: "اتجاه والمجتمع المهني",
    en: "Etijah & Professional Community"
  }
};

/**
 * Translates a single category item based on the current language
 * @param category - Category data from API with bilingual content
 * @param language - Current language ('ar' or 'en')
 * @returns Translated category title
 */
export const translateCategoryTitle = (category: CategoryApiResponse, language: string): string => {
  // First check if category has translations array (for blog categories)
  if (category.translations && category.translations.length > 0) {
    const translation = category.translations.find(t => t.locale === language);
    return translation ? translation.title : category.title;
  }
  
  // Fallback to our mapping for main categories
  if (categoryTranslations[category.id]) {
    return language === 'ar' ? categoryTranslations[category.id].ar : categoryTranslations[category.id].en;
  }
  
  // Return original title if no translation found
  return category.title;
};

/**
 * Translates an array of blogs based on the current language
 * @param blogs - Array of blog data from API
 * @param language - Current language ('ar' or 'en')
 * @returns Array of translated blog objects
 */
export const translateBlogsArray = (blogs: BlogApiResponse[], language: string) => {
  return blogs.map(blog => translateBlogItem(blog, language));
};

/**
 * Translates an array of categories based on the current language
 * @param categories - Array of category data from API
 * @param language - Current language ('ar' or 'en')
 * @returns Array of translated category objects
 */
export const translateCategoriesArray = (categories: CategoryApiResponse[], language: string) => {
  return categories.map(category => ({
    ...category,
    title: translateCategoryTitle(category, language)
  }));
};

/**
 * Strips HTML tags from content and limits text length
 * @param html - HTML content string
 * @param maxLength - Maximum length of text (default: 100)
 * @returns Plain text with length limit
 */
export const stripHtmlAndLimit = (html: string, maxLength: number = 100): string => {
  // Create a temporary div element to parse HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  
  // Get text content without HTML tags
  const textContent = tempDiv.textContent || tempDiv.innerText || '';
  
  // Limit length and add ellipsis if needed
  return textContent.length > maxLength 
    ? textContent.substring(0, maxLength).trim() + '...'
    : textContent;
};

/**
 * Get all available category translations
 * Useful for debugging or extending translations
 */
export const getCategoryTranslations = () => categoryTranslations;

/**
 * Add a new category translation
 * @param id - Category ID
 * @param arTitle - Arabic title
 * @param enTitle - English title
 */
export const addCategoryTranslation = (id: number, arTitle: string, enTitle: string) => {
  categoryTranslations[id] = { ar: arTitle, en: enTitle };
};

/**
 * Hook-like function to manage translated blog data
 * This can be used in React components to handle language changes
 */
export const useBlogTranslation = () => {
  return {
    translateBlogItem,
    translateCategoryTitle,
    translateBlogsArray,
    translateCategoriesArray,
    stripHtmlAndLimit,
    getCategoryTranslations,
    addCategoryTranslation
  };
};
