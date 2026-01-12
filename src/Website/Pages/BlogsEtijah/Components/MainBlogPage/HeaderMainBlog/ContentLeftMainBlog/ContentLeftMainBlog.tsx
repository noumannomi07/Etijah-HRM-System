import imageBlog from "@assets/images/website/blogs/blogImage.png";

const ContentLeftMainBlog = () => {
  return (
    <div className="blog-image-header">
      <img
        src={imageBlog}
        alt="blog image"
        className="w-full h-full object-cover image-src"
        data-aos="fade-up"
        loading="lazy"
      />
    </div>
  );
};

export default ContentLeftMainBlog;
