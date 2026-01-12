export type Blog = {
  id: number;
  image: string;
  title: string;
  content: string;
  ar_title?: string;
  en_title?: string;
  ar_content?: string;
  en_content?: string;
  category_id: number;
  category: BlogCategory;
  images?: BlogImage[];
  text: string;
  badgeTitleCardBlog: string;
  similar: Blog[];
};

export type BlogCategory = {
  id: number;
  title: string;
  blogs: Blog[];
  image: string;
};

export type BlogResponse = {
  data: Blog;
};

export type BlogImage = {
  id: number;
  file: string;
  type: string;
 
};

export type FaqResponse = {
  data: Faq;
};

export type Faq = {
  id: number;
  title: string;
  faqs: FaqItem[];
};

export type FaqItem = {
  id: number;
  title: string;
  content: string;
};






