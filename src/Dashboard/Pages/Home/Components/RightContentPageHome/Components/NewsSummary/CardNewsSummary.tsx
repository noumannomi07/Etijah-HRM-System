import React from 'react';
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
interface CardNewsSummaryProps {
  image: string;
  titleCard: string;
  textCard: string;
}

const CardNewsSummary: React.FC<CardNewsSummaryProps> = ({ image, titleCard, textCard }) => {
  const { t } = useTranslation('home');

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.currentTarget;
    target.style.display = 'none';
    const container = target.parentElement;
    if (container) {
      container.classList.add('fallback-image');
      container.innerHTML = `
        <div class="w-full h-full flex flex-col items-center justify-center bg-gray-50">
          <svg class="w-8 h-8 text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 13L12 16L15 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 16V4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M20 18C20 18.5523 19.5523 19 19 19H5C4.44772 19 4 18.5523 4 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
          <span class="text-[10px] text-gray-400 mt-1 text-center">${t('dashboard.cards.imageError')}</span>
        </div>
      `;
    }
  };

  return (
    <div className="card-news-summary item-center-flex mb-4">
      <div className="shrink-0">
        <div className="w-[60px] h-[50px] rounded-[12px] bg-gray-100 flex items-center justify-center overflow-hidden">
          <img
            alt="image"
            height="50"
            src={image}
            width="60"
            className="rounded-[12px] object-cover w-full h-full"
            loading="lazy"
            onError={handleImageError}
          />
        </div>
      </div>
      <div className="min-w-0 flex-1">
        <h2 className="title-card-news text-font-dark text-[15px] font-[700] truncate">
          {titleCard}
        </h2>
        <p className="text-card-news text-font-gray text-[13px] truncate">
          {textCard}
        </p>
      </div>
    </div>
  );
};

CardNewsSummary.propTypes = {
  image: PropTypes.string.isRequired,
  titleCard: PropTypes.string.isRequired,
  textCard: PropTypes.string.isRequired
};

export default CardNewsSummary;
