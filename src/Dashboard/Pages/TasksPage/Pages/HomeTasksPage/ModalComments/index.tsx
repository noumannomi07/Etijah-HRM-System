import React from "react";
import { useTranslation } from "react-i18next";
import CustomModal from "@/Dashboard/Shared/CustomModal/CustomModal";
import male from "@assets/images/homeimages/users/male.png";
import PropTypes from "prop-types";
import SmallImageUser from "@/Dashboard/Shared/SmallImageUser/SmallImageUser";
import { useState } from "react";
import SpinnerLoader from "@/Dashboard/Shared/SpinnerLoader/SpinnerLoader";
import { useTaskComment } from "@/hooks/Tasks/useTaskComments";
import { useTask } from "@/hooks/Tasks/useShowTask";
import { Link } from "react-router-dom";

const ModalDetailsTasks = ({
  openModalComments,
  hiddenModalComments,
  data
}) => {
  const { t, i18n } = useTranslation("tasks");
  const [commentText, setCommentText] = useState("");
  const { createComment, isLoading: isCreatingComment } = useTaskComment();
  const { data: taskData, isLoading } = useTask(data.id);

  const handleCreateComment = async () => {
    if (!commentText.trim()) return;

    try {
      createComment({
        id: data.id,
        comment: commentText
      });
      setCommentText(""); // Clear input
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleCreateComment();
    }
  };

  return (
    <>
      <CustomModal
        newClassModal={"medium-modal modal-add-comment"}
        isOpen={openModalComments}
        handleOpen={hiddenModalComments}
        titleModal={t("taskDetails.comments")}
        classBodyContent={""}
      >
        <div className="all-content-details-documents border-width-content p-3">
          <div className="comments-section scrollbarChange  mt-1 max-h-[300px] pr-1 pl-3 overflow-y-auto">
            <h3 className="text-lg hidden font-semibold mb-3 text-primaryColor sticky top-0 bg-white p-3 border rounded-[8px] ">
              {t("taskDetails.comments")}
            </h3>
            {isLoading ? (
              <div className="flex justify-center py-4">
                <SpinnerLoader />
              </div>
            ) : taskData?.data?.comments &&
              taskData?.data.comments.length > 0 ? (
              <div className="space-y-4">
                {taskData?.data.comments.map((comment) => (
                  <Link
                    to={`/dashboard/staff-management/staff-employee-information/${comment.id}`}
                    key={comment.id}
                    className="comment-item  block p-4 bg-[#fff] border rounded-lg  group transition-colors hover:bg-primaryColor "
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="image-user flex items-center">
                        <SmallImageUser
                          newClassImage="w-10 h-10 rounded-full"
                          imageUser={comment.employee?.image || male}
                          altImage={t("common.userAvatar", {
                            username: `${comment.employee?.first_name || ""} ${
                              comment.employee?.last_name || ""
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
                    </div>
                    <p className="text-gray-700 text-[15px] leading-relaxed group-hover:text-white transition-all duration-300">
                      {comment.comment}
                    </p>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p className="text-lg mb-2">{t("comments.noComments")}</p>
                <p className="text-sm">{t("comments.beFirstToComment")}</p>
              </div>
            )}
          </div>

          <div className="add-comment-section mt-4 border-t pt-4">
            <textarea
              className="input-comment h-[80px] w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all resize-none"
              placeholder={t("comments.enterComment")}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyPress={handleKeyPress}
              rows={3}
              minLength={10}
            />
            <div className="buttons-modal-details flex items-center gap-3 justify-end mt-3">
              <button
                className={`btn-main button-blue height--50 px-6 transition-opacity ${
                  !commentText.trim() ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={handleCreateComment}
                disabled={!commentText.trim() || isCreatingComment}
              >
                {isCreatingComment ? (
                  <SpinnerLoader />
                ) : (
                  t("taskDetails.addComment")
                )}
              </button>
            </div>
          </div>
        </div>
      </CustomModal>
    </>
  );
};

ModalDetailsTasks.propTypes = {
  openModalComments: PropTypes.bool.isRequired,
  hiddenModalComments: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

export default ModalDetailsTasks;
