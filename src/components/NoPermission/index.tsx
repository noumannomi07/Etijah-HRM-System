import React, { useState, useEffect } from "react";
import { FullRoutes } from "@/Routes/routes";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faShieldAlt,
    faHome,
    faArrowRight,
    faExclamationTriangle,
    faUserLock,
    faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import "./style.css";

const NoPermission = () => {
    const navigate = useNavigate();
    const { t } = useTranslation("common");
    const [isVisible, setIsVisible] = useState(false);
    const [showContact, setShowContact] = useState(false);

    useEffect(() => {
        // Animation on mount
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const handleContactAdmin = () => {
        setShowContact(true);
        // يمكن إضافة منطق إرسال بريد إلكتروني هنا
        setTimeout(() => setShowContact(false), 3000);
    };

    return (
        <div className="no-permission-container">
            {/* Background Animation */}
            <div className="background-animation">
                <div className="blob-1"></div>
                <div className="blob-2"></div>
                <div className="blob-3"></div>
            </div>

            <div className={`main-content ${isVisible ? "visible" : ""}`}>
                {/* Main Card */}
                <div className="main-card">
                    {/* Animated Icon */}
                    <div className="icon-container">
                        <div className="icon-circle">
                            <FontAwesomeIcon
                                icon={faShieldAlt}
                                className="text-white text-3xl"
                            />
                            <div className="ripple-effect"></div>
                        </div>
                    </div>

                    {/* Title with Animation */}
                    <h1 className="title">
                        {t("noPermission")}
                    </h1>

                    {/* Subtitle */}
                    <div className="subtitle">
                        <FontAwesomeIcon
                            icon={faExclamationTriangle}
                            className="mr-2"
                        />
                        <span>{t("noPermissionDescription")}</span>
                    </div>

                    {/* Description */}
                    <p className="description">
                        {t("noPermissionDescription")}
                    </p>

                    {/* Action Buttons */}
                    <div className="action-buttons">
                        <button
                            className="primary-button mb-4"
                            onClick={() => navigate(FullRoutes.Dashboard.Home)}
                        >
                            <FontAwesomeIcon icon={faHome} className="ml-2" />
                            {t("goToHome")}
                        </button>

                        <div className="button-grid">
                            <button
                                className="secondary-button"
                                onClick={() => navigate(-1)}
                            >
                                <FontAwesomeIcon
                                    icon={faArrowRight}
                                    className="ml-2"
                                />
                                {t("goBack")}
                            </button>

                            <button
                                className="contact-button"
                                onClick={handleContactAdmin}
                            >
                                <FontAwesomeIcon
                                    icon={faEnvelope}
                                    className="ml-2"
                                />
                                {t("contactAdmin")}
                            </button>
                        </div>
                    </div>

                    {/* Contact Success Message */}
                    {showContact && (
                        <div className="success-message">
                            <FontAwesomeIcon
                                icon={faEnvelope}
                                className="mr-2"
                            />
                            {t("contactAdminSuccess")}
                        </div>
                    )}

                    {/* Decorative Elements */}
                    <div className="decorative-section">
                        <div className="bouncing-dots">
                            <div className="dot bg-red-400"></div>
                            <div className="dot bg-orange-400"></div>
                            <div className="dot bg-yellow-400"></div>
                        </div>

                        {/* Error Code */}
                        <div className="error-code">
                            <span className="error-code-text">{t("errorCode")}:</span>
                            <span className="error-code-number">403</span>
                        </div>
                    </div>
                </div>

                {/* Additional Info Card */}
                <div className="info-card">
                    <div className="info-text">
                        <FontAwesomeIcon
                            icon={faUserLock}
                            className="info-icon"
                        />
                        <span>{t("contactAdminDescription")}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoPermission;
