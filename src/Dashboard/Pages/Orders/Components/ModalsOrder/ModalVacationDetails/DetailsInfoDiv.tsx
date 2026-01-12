import React from "react";

type DetailsInfoDivProps = {
    newClassName?: string;
    titleDetails: string;
    newClassTextDetails?: string;
    textDetails?: string | number | React.ReactNode;
    children?: React.ReactNode;
    isLink?: boolean;
    link?: string;
};

const DetailsInfoDiv = ({
    newClassName,
    titleDetails,
    newClassTextDetails,
    textDetails,
    children,
    isLink,
    link,
}: DetailsInfoDivProps) => {
    return (
        <div
            className={`details-one details-one-div pb-2 border-b mb-3 items-center  ${newClassName}`}
        >
            <div className="main-info">
 
                <h2 className="title text-font-dark text-[15px] sm:text-[16px]">
                    {titleDetails}
                </h2>
         
                {isLink ? (
                    <a href={link} target="_blank" rel="noopener noreferrer" className="btn btn-success">
                        <p className={`text text-font-gray ${newClassTextDetails}`}>
                            {textDetails ?? "-"}
                        </p>
                    </a>
                ) : (   
                    <p className={`text text-font-gray ${newClassTextDetails}`}>
                        {textDetails ?? "-"}
                    </p>
                )}
            </div>
            <div className="info-new-content">{children}</div>
        </div>
    );
};

export default DetailsInfoDiv;
