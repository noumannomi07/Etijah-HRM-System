import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import FilterButtonsCards from "./FilterButtonsCards/FilterButtonsCards";
import CardBlogOne from "./CardBlogOne";
import { Spinner } from "@material-tailwind/react";
import axiosInstance from "@/utils/axios";
import PaginationPage from "@/Dashboard/Shared/Pagination/Pagination";
import { useTranslation } from "react-i18next";
import { translateBlogsArray, translateCategoriesArray, stripHtmlAndLimit } from "@/utils/blogTranslationUtils";

interface Blog {
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

interface Category {
  id: number;
  title: string;
  translations?: Array<{
    id: number;
    blog_category_id: number;
    locale: string;
    title: string;
  }>;
}

// Translation functions are now imported from utils/blogTranslationUtils.ts

const MainAllCardsBlog = () => {
  const { i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [originalData, setOriginalData] = useState<any>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axiosInstance.get(
          "https://backend.etijah.sa/website/blogs"
        );
        const data = await response.data;
        console.log("Fetched blogs:", data.blogs);
        console.log("Fetched categories:", data.categories);

        // Store original data for translation
        setOriginalData(data);
        
        // Apply translations based on current language using utility functions
        const translatedBlogs = translateBlogsArray(data.blogs, i18n.language);
        const translatedCategories = translateCategoriesArray(data.categories, i18n.language);

        setBlogs(translatedBlogs);
        setCategories(translatedCategories);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  // Re-translate when language changes
  useEffect(() => {
    if (originalData) {
      console.log("Language changed to:", i18n.language);
      console.log("Original categories:", originalData.categories);
      
      const translatedBlogs = translateBlogsArray(originalData.blogs, i18n.language);
      const translatedCategories = translateCategoriesArray(originalData.categories, i18n.language);

      console.log("Translated categories:", translatedCategories);
      
      setBlogs(translatedBlogs);
      setCategories(translatedCategories);
    }
  }, [i18n.language, originalData]);

  const [activeGenre, setActiveGenre] = useState("all");
  const [filteredCards, setFilteredCards] = useState<Blog[]>(blogs);

  // FUNCTION PAGE COUNT
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6; // Number of items per page

  const pageCount = Math.ceil(filteredCards.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentItems = filteredCards.slice(offset, offset + itemsPerPage);

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  useEffect(() => {
    setLoading(true);

    const filtered =
      activeGenre === "all"
        ? blogs
        : blogs.filter((item) => {
            if (item.category_id === Number(activeGenre)) {
              return item;
            }
          });

    console.log("Filtered results:", filtered);

    setTimeout(() => {
      setFilteredCards(filtered);
      setCurrentPage(0);
      setLoading(false);
    }, 300);
  }, [activeGenre, blogs]);

  return (
    <div>
      <FilterButtonsCards
        setActiveGenre={setActiveGenre}
        activeGenre={activeGenre}
        categories={categories}
      />
      <div className="main-all-cards-blogs pt-[40px]">
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ loop: Infinity, duration: 1 }}
              className="loader"
            >
              <span className="text-2xl">
                {" "}
                <Spinner className="h-12 w-12" color="blue" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
              </span>
            </motion.div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {currentItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                    delay: index * 0.1
                  }
                }}
                exit={{
                  opacity: 0,
                  y: 20,
                  transition: { duration: 0.3 }
                }}
                className="overflow-hidden rounded-lg"
              >
                <CardBlogOne
                  idCard={item.id}
                  hideImageCard={false}
                  imageBlog={item.image}
                  altImage={item.title}
                  badgeTitleCardBlog={item.category?.title || ""}
                  titleCardBlog={item.title}
                  descriptionCardBlog={stripHtmlAndLimit(item.content, 100)}
                />
              </motion.div>
            ))}
          </div>
        )}

        {filteredCards.length > itemsPerPage && (
          <PaginationPage
            itemCount={pageCount}
            onPageChange={handlePageClick}
          />
        )}
      </div>
    </div>
  );
};

export default MainAllCardsBlog;
