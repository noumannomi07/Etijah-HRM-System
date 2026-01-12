import React from 'react';
import { useTranslation } from 'react-i18next';
import './CircularProgress.css';

export interface CircularProgressProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  progressColor?: string;
  backgroundColor?: string;
  children?: React.ReactNode;
  className?: string;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  percentage,
  size = 150,
  strokeWidth = 15,
  progressColor = '#4a90e2',
  backgroundColor = '#e0e0e0',
  children,
  className = '',
}) => {
  const { t } = useTranslation('common');
  // Ensure percentage is between 0-100
  const normalizedPercentage = Math.min(100, Math.max(0, percentage));

  const innerSize = size - (strokeWidth * 2);

  return (
    <div
      className={`circular-progress ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        background: `conic-gradient(${progressColor} 0% ${normalizedPercentage}%, ${backgroundColor} ${normalizedPercentage}% 100%)`,
      }}
      role="progressbar"
      aria-valuenow={normalizedPercentage}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={t('circularProgress.ariaLabel', { percentage: normalizedPercentage })}
    >
      <div
        className="circular-progress-inner"
        style={{
          width: `${innerSize}px`,
          height: `${innerSize}px`,
        }}
      >
        {children || t('circularProgress.percentage', { percentage: normalizedPercentage })}
      </div>
    </div>
  );
};

export default CircularProgress; 