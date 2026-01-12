// import { useParams } from "react-router-dom";
import ContentSingleBlog from "./Components/ContentSingleBlog/ContentSingleBlog";
import HeaderSingleBlog from "./Components/HeaderSingleBlog/HeaderSingleBlog";
import React from "react";
const SingleBlogPage = () => {
  // const { idCardSingleBlog } = useParams();
  return (
    <div className="single-blog-page">
      {/* =================== START HEADER SINGLE BLOG ================= */}
      <HeaderSingleBlog />
      {/* =================== END HEADER SINGLE BLOG ================= */}
      <ContentSingleBlog />
    </div>
  );
};

export default SingleBlogPage;
