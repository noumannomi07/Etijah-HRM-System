import appStore from "@assets/images/website/apps/appstore.svg";
import googlePlay from "@assets/images/website/apps/googleplay.svg";

const AppsWeb = () => {
  return (
    <>
      {/* =============== START APPS INFO =================== */}
      <div className="apps-info flex items-center gap-3 mt-3">
        <a target="_blank" href="https://www.apple.com/" className="app-one">
          <img
            src={appStore}
            alt="app store"
            loading="lazy"
            className="object-cover"
          />
        </a>
        <a target="_blank" href="https://play.google.com/" className="app-one">
          <img
            src={googlePlay}
            alt="google play"
            loading="lazy"
            className=" object-cover"
          />
        </a>
      </div>
      {/* =============== END APPS INFO =================== */}
    </>
  );
};

export default AppsWeb;
