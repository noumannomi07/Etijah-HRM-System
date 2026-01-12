import { useLottie } from "lottie-react";
import logoutLottie from "./ErrorProjects.json";

function LogoutLottie() {
  const options = {
    animationData: logoutLottie,
    loop: true,
    style: { width: "300px", height: "300px" },
  };
  const { View } = useLottie(options);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {View}
    </div>
  );
}

export default LogoutLottie;
