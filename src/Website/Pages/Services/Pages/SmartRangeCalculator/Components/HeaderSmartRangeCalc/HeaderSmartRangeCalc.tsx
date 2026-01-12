import BannerLayout from "@/Website/Shared/BannerLayout/BannerLayout"
import ContentRightSmartRange from "./ContentRightSmartRange/ContentRightSmartRange"
import ContentLeftSmartRangeCalc from "./ContentLeftSmartRangeCalc/ContentLeftSmartRangeCalc"


const HeaderSmartRangeCalc = () => {
  return (
    <BannerLayout
    leftContent={<ContentRightSmartRange />}
    rightContent={<ContentLeftSmartRangeCalc />}
    className="banner-header-main-smart"
  />
  )
}

export default HeaderSmartRangeCalc