import React from "react";

type DetailsInfoDivProps = {
  newClassName?: string;
  titleDetails: string;
  newClassTextDetails?: string;
  textDetails?: string | number;
  children?: React.ReactNode;
};

const DetailsInfoDiv = ({
  newClassName,
  titleDetails,
  newClassTextDetails,
  textDetails,
  children,
}: DetailsInfoDivProps) => {
  return (
    <div
      className={`details-one details-one-div pb-2 border-b mb-3 items-center  ${newClassName}`}
    >
      <div className="main-info">
        <h2 className="title text-font-dark text-[15px] sm:text-[16px]">
          {titleDetails}
        </h2>
        <p className={`text text-font-gray ${newClassTextDetails}`}>
          {textDetails ?? '-'}
        </p>
      </div>
      <div className="info-new-content">{children}</div>
    </div>
  );
};

export default DetailsInfoDiv;
