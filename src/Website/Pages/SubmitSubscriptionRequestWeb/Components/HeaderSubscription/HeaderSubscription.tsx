import ContentSubscriptionInfo from "../ContentSubscriptionInfo/ContentSubscriptionInfo";
import FormSubmitSubscription from "../FormSubmitSubscription/FormSubmitSubscription";
import BannerLayout from "@/Website/Shared/BannerLayout/BannerLayout";
const HeaderSubscription = () => {
  return (
    <>
      <BannerLayout
        leftContent={<ContentSubscriptionInfo />}
        rightContent={<FormSubmitSubscription />}
        className="banner-header-subscription"
      />
    </>
  );
};
export default HeaderSubscription;
