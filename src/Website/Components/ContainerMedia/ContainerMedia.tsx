import PropTypes from "prop-types";

const ContainerMedia = ({ children }) => {
  return <div className="container-media">{children}</div>;
};
ContainerMedia.propTypes = {
  children: PropTypes.node.isRequired
};
export default ContainerMedia;
