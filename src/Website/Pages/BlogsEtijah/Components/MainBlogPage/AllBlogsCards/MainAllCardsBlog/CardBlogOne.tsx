import { FullRoutes } from "@/Routes/routes";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import React from "react";

const CardBlogOne = ({
  idCard,
  hideImageCard,
  imageBlog,
  altImage,
  badgeTitleCardBlog,
  titleCardBlog,
  descriptionCardBlog
}) => {
  return (
    <Link to={FullRoutes.Website.BlogsEtijah.SingleBlog({ idCardSingleBlog: idCard })}>
      <div className="card-blog-one">
        {!hideImageCard && (
          <>
            {" "}
            {/* ===================== START IMAGE CARD BLOG ================= */}
            <div className="image-card-blog  bg-01-overlay">
              <img
                src={imageBlog}
                alt={altImage}
                loading="lazy"
                className="image-card-blog-src w-full  h-full  sm:h-[320px] md:h-[230px] lg:h-[300px] object-cover rounded-[16px]"
              />
            </div>
            {/* ===================== END IMAGE CARD BLOG ================= */}
          </>
        )}

        {/* ===================== START DETIALS INFO OCARD BLOG ===================== */}
        <div className="details-info-card-blog pt-3">
          <div className="badge-card-blog  mt-1 max-w-max bg-lightColorblue_02 text-font-dark text-primaryColor p-[6px_19px] rounded-full border border-lightColorblue_02">
            {badgeTitleCardBlog}
          </div>
          <h2 className="title-card-blog text-font-dark text-[15px] sm:text-[18px] font-[700] mt-3">
            {titleCardBlog}
          </h2>
          <p 
            className="text-card-blog text-font-dark text-[13px] sm:text-[15px] mt-2 leading-7"
            dangerouslySetInnerHTML={{ __html: descriptionCardBlog }}
          ></p>
        </div>
        {/* ===================== END DETIALS INFO OCARD BLOG ===================== */}
      </div>
    </Link>
  );
};
CardBlogOne.propTypes = {
  idCard: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  hideImageCard: PropTypes.bool.isRequired,
  imageBlog: PropTypes.string.isRequired,
  altImage: PropTypes.string.isRequired,
  badgeTitleCardBlog: PropTypes.string.isRequired,
  titleCardBlog: PropTypes.string.isRequired,
  descriptionCardBlog: PropTypes.string.isRequired
};
export default CardBlogOne;
