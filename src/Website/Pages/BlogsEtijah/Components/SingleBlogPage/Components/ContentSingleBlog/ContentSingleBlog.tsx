import React from 'react';
import ContainerMedia from "@/Website/Components/ContainerMedia/ContainerMedia";
import "./ContentSingleBlog.css";
import CardBlogOne from "../../../MainBlogPage/AllBlogsCards/MainAllCardsBlog/CardBlogOne";
import CardsSimilarTopics from "./CardsSimilarTopics";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { query } from "@/utils/website";
import { Blog } from '@/Website/Pages/BlogsEtijah/BlogType';
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Spinner } from "@material-tailwind/react";
import { translateBlogItem } from "@/utils/blogTranslationUtils";
 

interface BlogResponse {
  data: Blog;
}

const ContentSingleBlog = () => {
  const { idCardSingleBlog } = useParams();
  const { i18n } = useTranslation();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  // Function to get localized content based on current language
  const getLocalizedContent = (blog: Blog) => {
    const translatedBlog = translateBlogItem(blog as any, i18n.language);
    
    return {
      title: translatedBlog.title,
      content: translatedBlog.content,
      categoryTitle: translatedBlog.category?.title || ''
    };
  };
 
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await query<BlogResponse>({
          endpoint: `blog/${idCardSingleBlog}`,
        });
        setBlog(response.data.data);
      } catch (error) {
        console.error('Error fetching blog:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [idCardSingleBlog]);

  // Re-render when language changes
  useEffect(() => {
    // This will trigger a re-render when language changes
    // The getLocalizedContent function will return different content based on current language
  }, [i18n.language]);

  if (loading) {
    return(
      <div className="flex justify-center items-center h-32">
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ loop: Infinity, duration: 1 }}
        className="loader"
      >
        <span className="text-2xl">
          {" "}
          <Spinner className="h-12 w-12" color="blue"  />
        </span>
      </motion.div>
    </div>
    );
  }

  if (!blog) {
    return <div>Blog not found</div>;
  }

  const localizedContent = getLocalizedContent(blog);

  return (
    <div className="content-single-blog">
      {/* ================ START CONTAINER ================= */}
      <ContainerMedia>
        <div className="all-details-single-page">
          {/* ================ START IMAGE SINGLE PAGE =============== */}
          <div data-aos="fade-up" className="image-single-page w-[70%] m-auto bg-01-overlay mt-[-340px] z-[50]">
            <img
              src={blog.image}
              alt="image single blog"
              className="image-single-blog-src w-[100%]  max-h-full  md:h-[500px] lg:h-[475px] object-cover rounded-[16px]"
              loading="lazy"
            />
          </div>
          {/* ================ END IMAGE SINGLE PAGE =============== */}
          {/* ================ START CINTENT SIGNLE INFO DETAILS ================= */}
          <div data-aos="fade-up" className="single-blog-info-details">
            <CardBlogOne
              idCard={blog.id}
              hideImageCard={true}
              imageBlog={""}
              altImage={""}
              badgeTitleCardBlog={localizedContent.categoryTitle}
              titleCardBlog={localizedContent.title}
              descriptionCardBlog={localizedContent.content}
            />
 
            
            {blog.images && blog.images.length > 0 && (
              <div className="images-cards-signle-blog my-[35px] grid grid-cols-2 gap-4">
                {blog.images.map((image, index) => (
                  <div className="image-single-blog-one h-full sm:h-[280px] md:h-[350px] relative bg-01-overlay" key={index}>
                    <img
                      src={image.file}
                      alt={`Blog image ${index + 1}`}
                      className="w-full h-full object-cover rounded-[14px]"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            )}
 
          </div>
          {/* ================ END CINTENT SIGNLE INFO DETAILS ================= */}
          <CardsSimilarTopics blogs={blog.similar} />
        </div>
      </ContainerMedia>
      {/* ================ END CONTAINER ================= */}
    </div>
  );
};

export default ContentSingleBlog;
