import image from "@assets/images/website/services/imagesservices/attendancedeparture/01.png";
const ContentLeftAttendanceDeparture = () => {
  return (
    <div className="image-left-attendance">
      <img
        data-aos="fade-right"
        src={image}
        alt="image"
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  );
};

export default ContentLeftAttendanceDeparture;
