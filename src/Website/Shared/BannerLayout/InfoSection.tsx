import PropTypes from "prop-types";
import ButtonSendRequest from "../ButtonSendRequest/ButtonSendRequest";

const InfoSection = ({
  dataAos="",
  newClassInfoSection,
  title,
  description,
  hideButtonSendRequest,
  children
}) => {
  return (
    <div data-aos={dataAos} className={`${newClassInfoSection}`}>
      <h2 className="title !text-start mb-1">{title}</h2>
      <p className="text !text-start mb-4 !leading-8">{description}</p>
      {!hideButtonSendRequest && (
        <ButtonSendRequest
          addNewClassButton={"mt-3"}
          isTextSendReuestNow={true}
          addNewTextButton={""}
          isRoutePageSendRequest={true}
         
        />
      )}
      {children}
    </div>
  );
};
InfoSection.propTypes = {
  dataAos: PropTypes.string,
  newClassInfoSection: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  hideButtonSendRequest: PropTypes.bool,
  children: PropTypes.node
};
export default InfoSection;
