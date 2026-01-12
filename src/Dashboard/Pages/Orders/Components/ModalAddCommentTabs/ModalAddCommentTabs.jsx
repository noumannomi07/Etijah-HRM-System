import React from "react";
import { useTranslation } from "react-i18next";
import CustomModal from "@/Dashboard/Shared/CustomModal/CustomModal";
import male from "@assets/images/homeimages/users/male.png";
import PropTypes from "prop-types";
import SmallImageUser from "@/Dashboard/Shared/SmallImageUser/SmallImageUser";
import { useState, useEffect } from "react";
import SpinnerLoader from "@/Dashboard/Shared/SpinnerLoader/SpinnerLoader";
import { Link } from "react-router-dom";
import DataComments from "@/Dashboard/Pages/Orders/Components/ModalAddCommentTabs/DataComments";
import { useRequestComments } from "@/hooks/orders/useRequestComments";

const ModalAddCommentTabs = ({
  openModalComments,
  hiddenModalComments,
  selectedRowId,
  tabId,
  comments,
  refetch
}) => {
  const { t, i18n } = useTranslation("tasks");
  const [commentText, setCommentText] = useState("");
  const { createComment, isCreatingComment, isSuccess, data } = useRequestComments();

 
    useEffect(() => {
    if (isSuccess && data?.data) {

      // window.location.reload();
 hiddenModalComments();  
    }
  }, [isSuccess, data]);

  const handleCreateComment = async () => {
    if (!commentText.trim() || !selectedRowId) return;

    try {
      createComment({
        request_id: selectedRowId,
        comment: commentText.trim(),
        type: getRequestTypeFromTabId(tabId)
      });
      hiddenModalComments();  
      setCommentText("");
      
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

  // Helper function to map tab ID to request type
  const getRequestTypeFromTabId = (tabId) => {
    const tabMapping = {
      0: "vacation",
      1: "leave", 
      2: "advance",
      3: "letter",
      4: "expenses",
      5: "ticket"
    };
    return tabMapping[tabId] || "general";
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
        <DataComments comments={comments} />
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
      </CustomModal>
    </>
  );
};

ModalAddCommentTabs.propTypes = {
  openModalComments: PropTypes.bool.isRequired,
  hiddenModalComments: PropTypes.func.isRequired,
  selectedRowId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  tabId: PropTypes.number,
  comments: PropTypes.array,
  refetch: PropTypes.func
};

export default ModalAddCommentTabs;
