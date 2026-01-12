import { cardDataBlog } from "../../../MainBlogPage/AllBlogsCards/MainAllCardsBlog/DataCardBlog";
import CardBlogOne from "../../../MainBlogPage/AllBlogsCards/MainAllCardsBlog/CardBlogOne";
import WebSectionTitle from "@/Website/Shared/WebSectionTitle/WebSectionTitle";
import { Blog } from "@/Website/Pages/BlogsEtijah/BlogType";
import React from "react";
import { useTranslation } from "react-i18next";
import { translateBlogItem, stripHtmlAndLimit } from "@/utils/blogTranslationUtils";

 

const CardsSimilarTopics = ({ blogs }: { blogs: Blog }) => {
  const { i18n, t } = useTranslation();

  // Function to get localized content based on current language
  const getLocalizedContent = (blog: Blog) => {
    const translatedBlog = translateBlogItem(blog as any, i18n.language);
    
    return {
      title: translatedBlog.title,
      content: translatedBlog.content,
      categoryTitle: translatedBlog.category?.title || ''
    };
  };


  return (
    <div className="cards-similar-topics padding-60-web">
      <WebSectionTitle
        dataAos="fade-right"
        isTrueReverseCol={true}
        newClassTitleSection={"similar-blog-section-title  !items-center"}
        ishideText={true}
        textTitleHead={false}
        titleWebSection={i18n.language === 'ar' ? "مواضيع مشابهه" : "Similar Topics"}
      />

      {/* ================= START ALL SIMILAR TOPICS =================== */}
      <div
        data-aos="fade-up"
        className="all-similar-card-topics grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5"
      >
        {blogs.map((item) => {
          const localizedContent = getLocalizedContent(item);
          return (
            <>
              {" "}
              <CardBlogOne
                key={item.id}
                idCard={item.id}
                hideImageCard={false}
                imageBlog={item.image}
                altImage={localizedContent.title}
                badgeTitleCardBlog={localizedContent.categoryTitle}
                titleCardBlog={localizedContent.title}
                descriptionCardBlog={stripHtmlAndLimit(localizedContent.content)}
              />
            </>
          );
        })}
      </div>
      {/* ================= END ALL SIMILAR TOPICS =================== */}
    </div>
  );
};

export default CardsSimilarTopics;
