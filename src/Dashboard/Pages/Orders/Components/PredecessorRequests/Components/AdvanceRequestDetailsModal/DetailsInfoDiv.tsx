import React from "react";

type DetailsInfoDivProps = {
  newClassName?: string;
  titleDetails?: React.ReactNode;
  newClassTextDetails?: string;
  textDetails?: React.ReactNode;
  children?: React.ReactNode;
};

const DetailsInfoDiv = ({
  newClassName,
  titleDetails,
  newClassTextDetails,
  textDetails,
  children,
}: DetailsInfoDivProps) => {

  const titleComponent = titleDetails ?
    typeof titleDetails === "string" ?
      <h2 className="title text-font-dark text-[15px] sm:text-[16px]">
        {titleDetails ?? '-'}
      </h2>
      :
      titleDetails
    :
    null

  const textDetailsComponent = textDetails ?
    typeof textDetails === "string" ?
      <p className={`text text-font-gray ${newClassTextDetails}`}>
        {textDetails}
      </p>
      :
      textDetails
    :
    null

  return (
    <div
      className={`details-one details-one-div pb-2 border-b mb-3 items-center  ${newClassName}`}
    >
      <div className="main-info">
        {titleComponent}
        {textDetailsComponent}
      </div>
      <div className="info-new-content">{children}</div>
    </div>
  );
};

export default DetailsInfoDiv;
