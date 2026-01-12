import { useState } from "react";
import FormForgetPassword from "../FormForgetPassword/FormForgetPassword";
import FormHeaderLogin from "../FormHeaderLogin.jsx/FormHeaderLogin";
import SliderLogin from "../SliderLogin/SliderLogin";
import "./AllContentInfoAuth.css";
import React from "react";
import { useNavigate } from "react-router-dom";
const AllContentInfoAuth = () => {
    const navigate = useNavigate();
    // THIS FOR FORGET PASSWORD
    const [showForgetPassword, setShowForgetPassword] = useState(false); // THIS FOR CHANGE PASSWORD

    const handleForgotPasswordClick = () => {
        setShowForgetPassword(true); // SHOW FORGET PASSWORD
    };

    // RETURN TO LOGIN FROM FORGOT PASSWORD
    const handleBackToLoginClick = () => {
        setShowForgetPassword(false);
    };

    // NAVIGATE BACK TO PREVIOUS PAGE
    const handleBackToPreviousPage = () => {
        navigate(-1); // Go back to previous page in browser history
    };

    // WHEN LOGIN SUCCESS SHOW OTP FORM
    const handleLoginSuccess = () => {
        console.log("");
    };

    return (
        <div className="all-auth-page grid grid-cards-2 items-center gap-5 z-1 w-full h-[100vh] ">
            <div
                data-aos="fade-left"
                className="right-content-auth w-full relative z-10 pl-5"
            >
                {showForgetPassword ? (
                    <FormForgetPassword onBack={handleBackToLoginClick} />
                ) : (
                    <FormHeaderLogin
                        onForgotPassword={handleForgotPasswordClick}
                        onBack={handleBackToPreviousPage}
                    />
                )}
            </div>
            <div
                data-aos="fade-right"
                className="left-content-auth w-full  relative z-10"
            >
                <SliderLogin />
            </div>
        </div>
    );
};

export default AllContentInfoAuth;
