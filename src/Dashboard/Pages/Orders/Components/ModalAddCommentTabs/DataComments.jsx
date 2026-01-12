import React from "react";
import { useTranslation } from "react-i18next";
import CustomModal from "@/Dashboard/Shared/CustomModal/CustomModal";
import male from "@assets/images/homeimages/users/male.png";
import PropTypes from "prop-types";
import SmallImageUser from "@/Dashboard/Shared/SmallImageUser/SmallImageUser";
import { useState } from "react";
import SpinnerLoader from "@/Dashboard/Shared/SpinnerLoader/SpinnerLoader";
import { Link } from "react-router-dom";
import axiosInstance from "@/utils/axios";
import endpoints from "@/api/endpoints";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

const DataComments = ({ comments = [], onAddCommentClick }) => {
  const { t, i18n } = useTranslation("tasks");
  const [isDeleting, setIsDeleting] = useState(null);

  // 🗑️ delete handler
  const handleDeleteComment = async (e, commentId) => {
    e.preventDefault();
    e.stopPropagation();
    if (!commentId) return;

    // const confirmDelete = window.confirm(t("comments.confirmDelete") || "Are you sure you want to delete this comment?");
    // if (!confirmDelete) return;

    try {
      setIsDeleting(commentId);
      await axiosInstance.delete(endpoints.orders.comments.delete(commentId));
      toast.success(t("Comment deleted successfully!") || "Comment deleted successfully!");
      // if (refetch) refetch();
      window.location.reload()
    } catch (error) {
      toast.error(t("Failed to delete comment") || "Failed to delete comment");
    } finally {
      setIsDeleting(null);

    }
  };

  return (
    <div className="all-content-details-documents border-width-content border-[#E0E0E0] cursor-pointer" onClick={onAddCommentClick}>
      
      <div 
        className="comments-section scrollbarChange pb-10 border-width-content border rounded-lg p-3 border-[#E0E0E0] mt-1 min-h-[200px] max-h-[300px] pr-1 pl-3 overflow-y-auto"
      >
          {/* <div 
        className="comments-section scrollbarChange pb-10 "
      ></div> */}

        {comments && comments.length > 0 ? (
          <div className="space-y-4">
              {comments.map((comment, index) => (
                <Link
                  to={`/dashboard/staff-management/staff-employee-information/${comment.employee?.id || comment.id}`}
                  key={comment.id || index}
                  className="comment-item  block p-4 bg-[#fff] border rounded-lg  group transition-colors hover:bg-primaryColor "
                  onClick={(e) => e.stopPropagation()}
                >
                <div className="flex items-center justify-between mb-3">
                  <div className="image-user flex items-center">
                    <SmallImageUser
                      newClassImage="w-10 h-10 rounded-full"
                      imageUser={comment.employee?.image || male}
                      altImage={t("common.userAvatar", {
                        username: `${comment.employee?.first_name || ""} ${comment.employee?.last_name || ""
                          }`
                      })}
                    />
                    <h2 className="name-user group-hover:text-white transition-all duration-300 text-font-dark text-[15px] mr-3 font-medium">
                      {comment.employee?.first_name}{" "}
                      {comment.employee?.last_name}
                    </h2>
                  </div>
                  <span className="text-sm text-gray-500 group-hover:text-white transition-all duration-300">
                    {new Date(comment.created_at).toLocaleDateString(
                      i18n.language === "ar" ? "ar-EG" : "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit"
                      }
                    )}
                  </span>
                  <button
                    onClick={(e) => handleDeleteComment(e, comment.id)}
                    disabled={isDeleting === comment.id}
                    className="text-gray-400 hover:text-red-500 transition-colors ml-3"
                    title={t("comments.delete")}
                  >
                    {isDeleting === comment.id ? (
                      <span className="text-sm">{t("Deleting") || "..."}</span>
                    ) : (
                      <> <FontAwesomeIcon icon={faTrash} /></>
                    )}
                  </button>

                </div>
                <p className="text-gray-700 text-[15px] leading-relaxed group-hover:text-white transition-all duration-300">
                  {comment.comment}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500 cursor-pointer" onClick={onAddCommentClick}>
            <p className="text-lg mb-2">{t("comments.noComments")}</p>
            <p className="text-sm">{t("comments.beFirstToComment")}</p>
          </div>
        )}
      </div>
    </div>
  );
};

DataComments.propTypes = {
  comments: PropTypes.array
};

export default DataComments;
