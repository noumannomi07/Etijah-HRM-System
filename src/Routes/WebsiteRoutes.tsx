import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "@/Website/Layout/Layout";
import { RelativeRoutes } from "@/Routes/routes";
import {
    HomeWebsite,
    AboutUs,
    SubmitSubscriptionRequestWeb,
    AboutApp,
    PackagesPage,
    FaqEtijah,
    BlogsEtijah,
    MainBlogPage,
    SingleBlogPage,
    ContactUs,
    ServicesPage,
    JobApplication,
    AttendanceDepartureManagementPage,
    PayrollBenefitsManagement,
    OrderManagementServices,
    RecruitmentManagementServices,
    FollowUpPerformance,
    SmartRangeCalculator,
    PrivacyUsagePolicy,
    Login,
} from "@/Website";

const WebsiteRoutes = () => {
    return (
        <Routes>
            {/* نغلف كل الصفحات داخل Layout هنا */}
            <Route path="/" element={<Layout />}>
                <Route index element={<HomeWebsite />} />
                <Route
                    path={RelativeRoutes.Website.About}
                    element={<AboutUs />}
                />
                <Route
                    path={RelativeRoutes.Website.SubmitSubscriptionRequestWeb}
                    element={<SubmitSubscriptionRequestWeb />}
                />
                <Route
                    path={RelativeRoutes.Website.AboutApp}
                    element={<AboutApp />}
                />
                <Route
                    path={RelativeRoutes.Website.PackagesPage}
                    element={<PackagesPage />}
                />
                <Route
                    path={RelativeRoutes.Website.FaqEtijah}
                    element={<FaqEtijah />}
                />
                <Route
                    path={RelativeRoutes.Website.BlogsEtijah.Base}
                    element={<BlogsEtijah />}
                >
                    <Route
                        path={RelativeRoutes.Website.BlogsEtijah.All}
                        element={<MainBlogPage />}
                    />
                    <Route
                        path={RelativeRoutes.Website.BlogsEtijah.SingleBlog}
                        element={<SingleBlogPage />}
                    />
                </Route>
                <Route
                    path={RelativeRoutes.Website.ContactUs}
                    element={<ContactUs />}
                />
                <Route
                    path={RelativeRoutes.Website.ServicesPage}
                    element={<ServicesPage />}
                />
                <Route
                    path={RelativeRoutes.Website.JobApplication}
                    element={<JobApplication />}
                />
                <Route
                    path={
                        RelativeRoutes.Website.AttendanceDepartureManagementPage
                    }
                    element={<AttendanceDepartureManagementPage />}
                />
                <Route
                    path={RelativeRoutes.Website.PayrollBenefitsManagement}
                    element={<PayrollBenefitsManagement />}
                />
                <Route
                    path={RelativeRoutes.Website.OrderManagementServices}
                    element={<OrderManagementServices />}
                />
                <Route
                    path={RelativeRoutes.Website.RecruitmentManagementServices}
                    element={<RecruitmentManagementServices />}
                />
                <Route
                    path={RelativeRoutes.Website.FollowUpPerformance}
                    element={<FollowUpPerformance />}
                />
                <Route
                    path={RelativeRoutes.Website.SmartRangeCalculator}
                    element={<SmartRangeCalculator />}
                />
                <Route
                    path={RelativeRoutes.Website.PrivacyUsagePolicy}
                    element={<PrivacyUsagePolicy />}
                />
            </Route>

            <Route path={RelativeRoutes.Website.LoginWeb} element={<Login />} />
        </Routes>
    );
};

export default WebsiteRoutes;
