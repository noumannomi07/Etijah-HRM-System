import  LogoImage from "@/assets/images/logo/logo.svg";
import LogoIcon from "@assets/images/logo/logoicon.svg";
import TextLogo from "@assets/images/logo/logotext.svg";

type LogoType = "all" | 'icon' | "text";

const LogoTypeMapper: Record<LogoType, string> = {
  'all': LogoImage,
  'text': TextLogo,
  'icon': LogoIcon

}

const Logo = ({ logoType = 'all' }: { logoType?: LogoType }) => {

  return (
    <div className="logo-image">
      <img
        src={LogoTypeMapper[logoType]}
        alt="logo"
        width={"110px"}
        height={"44px"}
        loading="lazy"
      />
    </div>
  );
};

export default Logo;
