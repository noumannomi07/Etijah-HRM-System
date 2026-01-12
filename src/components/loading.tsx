import Lottie from "lottie-react";
import React from "react";
import loadingAnimation from "@/assets/Animations/logoloading.json";
function Loading() {
    return (
        <div className="flex justify-center items-center h-[300px]">
            <Lottie
                animationData={loadingAnimation}
                loop
                style={{ height: "150px", width: "150px" }}
            />
        </div>
    );
}

export default Loading;
