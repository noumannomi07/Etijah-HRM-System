import React from "react";
import AllBlogsCards from './AllBlogsCards/AllBlogsCards'
import HeaderMainBlog from './HeaderMainBlog/HeaderMainBlog'

const MainBlogPage = () => {
  return (
    <div className='main-blog-page'>
    <HeaderMainBlog />
    <AllBlogsCards />
    </div>
  )
}

export default MainBlogPage
