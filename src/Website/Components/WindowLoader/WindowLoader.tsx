import LoaderSvg from "./LoaderSvg";
import "./WindowLoader.css";
const WindowLoader = () => {
  return (
    <>
      <div className="loader-wrapper hidden-loader">
        <div className="loader d-flex  justify-content-center  align-items-center ">
          <>
            <LoaderSvg />
          </>
        </div>
      </div>
    </>
  );
};

export default WindowLoader;
