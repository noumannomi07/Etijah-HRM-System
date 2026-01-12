import React, { useState, useEffect } from 'react';
import { Modal, Box, CircularProgress } from "@mui/material";
import { formatDateToYmd } from "@/utils/date";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { PayrollTransactionComment } from '@/Dashboard/Pages/types';
import { useCreateTransactionsComment } from '@/hooks/payroll/useCreateTransactionsComment';
import { useTranslation } from 'react-i18next';

interface CommentsModalProps {
  open: boolean;
  onClose: () => void;
  comments: PayrollTransactionComment[] | null;
  transactionId: number | null;
}

const CommentsModal = ({ open, onClose, comments, transactionId }: CommentsModalProps) => {
  const { t, i18n } = useTranslation('financialTransactions');
  const isRTL = i18n.language === 'ar';
  const [newComment, setNewComment] = useState("");
  const [localComments, setLocalComments] = useState<PayrollTransactionComment[] | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate: createComment } = useCreateTransactionsComment();

  // Update local comments whenever props change
  useEffect(() => {
    if (comments) {
      setLocalComments(comments);
    }
  }, [comments]);

  const handleSendComment = () => {
    if (newComment.trim() && transactionId) {
      setIsSubmitting(true);

      // Create optimistic comment
      const optimisticComment: PayrollTransactionComment = {
        id: Math.random(), // Temporary ID
        comment: newComment.trim(),
        created_at: new Date().toISOString(),
        employee: {
          id: 0,
          name: t('modal.comments.you'),
          full_name: t('modal.comments.you'),
          first_name: '',
          last_name: '',
          gender: '',
          marital_status: '',
          phone: '',
          email: '',
          sponsorship: 0,
          status: 1,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          code: null,
          files: [],
          assets: [],
          workdata: {} as any, // This is a placeholder
        } as any
      };

      // Optimistically update UI
      setLocalComments(prev => prev ? [...prev, optimisticComment] : [optimisticComment]);

      // Clear input
      setNewComment("");

      // Send to server
      createComment(
        { transaction_id: transactionId.toString(), comment: optimisticComment.comment },
        {
          onSettled: () => {
            setIsSubmitting(false);
          }
        }
      );
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendComment();
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="comments-modal-title"
      aria-describedby="comments-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "50%",
        height: "70%",
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
        maxHeight: '80vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        direction: isRTL ? 'rtl' : 'ltr'
      }}>
        <h2 className="text-2xl font-normal border-b-2 mb-5">
          {t('modal.comments.title')}
        </h2>

        <div
          id="comments-modal-description"
          className="flex-grow overflow-y-auto mb-4 pr-1"
          style={{ maxHeight: 'calc(80vh - 200px)' }}
        >
          {localComments && localComments.length > 0 ? (
            <div className="space-y-3">
              {localComments.map((comment, index) => (
                <div key={index} className="border-b pb-3">
                  <div className="flex justify-between items-start">
                    <div className="font-medium">{comment.employee?.name || t('modal.comments.unknownUser')}</div>
                    <div className="text-xs text-gray-500">
                      {comment.created_at ? formatDateToYmd(new Date(comment.created_at)) : ''}
                    </div>
                  </div>
                  <div className="mt-1 text-gray-700">
                    {comment.comment}
                    {/* Show spinner for optimistic comment if it's the last one and we're submitting */}
                    {isSubmitting && index === localComments.length - 1 &&
                      localComments[localComments.length - 1].id === comment.id && (
                        <span className="mr-2 inline-flex items-center">
                          <CircularProgress size={12} thickness={5} className="text-blue-500" />
                        </span>
                      )
                    }
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500">{t('modal.comments.noComments')}</div>
          )}
        </div>

        {/* Chat Input Section */}
        <div className="mt-2">
          <div className="relative">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t('modal.comments.addPlaceholder')}
              className={`w-full py-2 px-4 ${isRTL ? 'pr-12' : 'pl-12'} rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-300`}
              disabled={isSubmitting}
            />
            <button
              onClick={handleSendComment}
              disabled={!newComment.trim() || isSubmitting}
              className={`absolute ${isRTL ? 'left-2' : 'right-2'} top-1/2 transform -translate-y-1/2 rounded-full w-8 h-8 flex items-center justify-center ${!newComment.trim() || isSubmitting ? 'text-gray-400' : 'text-blue-600 hover:bg-blue-100'
                } transition-colors`}
              title={t('modal.comments.send')}
            >
              {isSubmitting ?
                <CircularProgress size={16} thickness={5} className="text-gray-400" /> :
                <FontAwesomeIcon icon={faPaperPlane} />
              }
            </button>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-1 px-4 rounded transition-colors"
            disabled={isSubmitting}
          >
            {t('modal.comments.close')}
          </button>
        </div>
      </Box>
    </Modal>
  );
};

export default CommentsModal; 