import { BrowserRouter } from "react-router-dom";
import "./App.css";
import RoutesConfig from "./Routes/Routers";
import "./assets/GoogleFont/balooBhaijaan.css";
import "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ToastContainerApp from "./components/ToastContainerApp/ToastContainerApp";
import { HelmetProvider } from "react-helmet-async";
import ScrollToTopPage from "./components/ScrollToTopPage/ScrollToTopPage";
import WindowLoader from "./Website/Components/WindowLoader/WindowLoader";
import ButtonScroll from "./Website/Components/ButtonScroll/ButtonScroll";
import "../i18n";
import "./assets/styles/ltr.css";
import React from "react";
import EnableLazyLoadingForImages from "@/components/EnableLazyLoadingForImages";
import { UserProvider } from "./contexts";

function App() {
    return (
        <BrowserRouter>
            <UserProvider>
                <WindowLoader />
                <ButtonScroll />

                <HelmetProvider>
                    <ToastContainerApp />
                    <EnableLazyLoadingForImages />
                    <RoutesConfig />
                    <ScrollToTopPage />
                </HelmetProvider>
            </UserProvider>
        </BrowserRouter>
    );
}

export default App;
