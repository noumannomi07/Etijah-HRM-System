import DownloadIcon from "@assets/Icons/DownloadIcon.svg";
import PropTypes from "prop-types";
import React from "react";

type DownloadImagePdfProps = {
  newClassName?: string;
  image: string;
  typeImage: string;
  timeNow: string;
};

const DownloadImagePdf = (props: DownloadImagePdfProps) => {
  const { image, newClassName = "", timeNow, typeImage } = props;
  
  const downloadFile = () => {
    const link = document.createElement('a');
    link.href = image;
    link.download = typeImage;
    link.setAttribute('download', '');
    link.setAttribute('target', '_blank');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {/* ==================== START DOWNLOAD PDF IMAGE =============== */}
      <div className={`download-pdf-iamge flex-between pt-3 ${newClassName}`}>
        {/* ============ START IMAGE CONTENT INFO ================ */}
        <div className="image-content-info item-center-flex">
          <div className="image-download">
            <img
              src={image}
              alt="image"
              className="object-cover max-w-max w-[61px] h-[47px] rounded-md"
              loading="lazy"
            />
          </div>
          <div className="content-details-info-image">
            <h2 className="title text-font-dark text-[14px] sm:text-[15px]">
              {typeImage}
            </h2>
            <p className="time-add text-font-gray text-[14px] sm:text-[15px]">
              {timeNow}
            </p>
          </div>
        </div>
        {/* ============ END IMAGE CONTENT INFO ================ */}
        {/* ============ START ICON DOWNLOAD ============== */}
        <div className="icon-download cursor-pointer" onClick={downloadFile}>
          <img src={DownloadIcon} />
        </div>
        {/* ============ END ICON DOWNLOAD ============== */}
      </div>
      {/* ==================== END DOWNLOAD PDF IMAGE =============== */}
    </>
  );
};

DownloadImagePdf.propTypes = {
  newClassName: PropTypes.string,
  image: PropTypes.string.isRequired,
  typeImage: PropTypes.string.isRequired,
  timeNow: PropTypes.string.isRequired,
};

export default DownloadImagePdf;
