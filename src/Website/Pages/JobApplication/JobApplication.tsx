import HelmetInfo from "@/components/HelmetInfo/HelmetInfo";
import Logo from "@/components/Logo/Logo";
import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaBriefcase, FaClock } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import axiosInstance from "@/utils/axios";
import JobApplicationOverview from "./components/View";
import JobApplicationApply from "./components/Apply";
import { Loading } from "@/components";
import ContainerMedia from "@/Website/Components/ContainerMedia/ContainerMedia";

// {
//     "data": {
//         "id": 2,
//         "title": "title",
//         "ar_title": "title",
//         "en_title": "title",
//         "content": "Content content",
//         "type": "inhouse",
//         "salary": "1500",
//         "image": "https://backend.etijah.sa/images/jobs/1744925679.mp4",
//         "link": "http://localhost/job/Mg==/bWFuZ2VyOQ==",
//         "status": "open",
//         "created_at": "2025-04-17T21:34:39.000000Z",
//         "applicants": 3,
//         "employee": null,
//         "location": null
//     }
// }

function JobApplication() {
  const { id, slug } = useParams();

  const { t } = useTranslation("jobApplication");
  const [activeTab, setActiveTab] = React.useState("overview");

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      setLoading(true);
      const response = await axiosInstance.get(
        `https://backend.etijah.sa/website/job/${id}/${slug}`
      );
      setJob(response.data.data);
      setLoading(false);
    };
    fetchJob();
  }, []);
  if (loading) {
    // return skeleton
    return <Loading />;
  }
  return (
    <>
      <HelmetInfo titlePage={"التقديم للوظيفة"} />
      <>
        <div className="min-h-screen bg-gray-50">
          {/* Header Section */}
          <div className="bg-white py-10 border-b  border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <div className="w-20 h-20 mt-[70px] md:mt-[120px] mx-auto ">
                  <Logo />
                </div>
                <h1 className="text-[25px] font-bold text-primaryColor mb-2">
                  Etijah
                </h1>
                <h2 className="text-[25px] font-bold text-primaryColor mb-5">
                  {t("jobApplication.jobTitle")}
                </h2>
                <div className="flex justify-center gap-8 text-gray-600">
                  <span className="flex items-center gap-2 text-[15px] font-[600] text-darkColor_02">
                    <FaMapMarkerAlt className="text-gray-500" />
                    <p className="text-darkColor_02 d-block"> {t("jobApplication.jobLocation")}</p>
                  </span>
                    <p className="text-darkColor_02 d-block"> {job?.location}</p>
                  <span className="flex items-center gap-2  text-[15px] font-[600] text-darkColor_02">
                    <FaBriefcase className="text-gray-500" />
                   <p className="text-darkColor_02 d-block"> {t("jobApplication.jobType")}</p>
                  </span>
                   <p className="text-darkColor_02 d-block"> {job?.type}</p>
                  {/* <span className="flex items-center gap-2  text-[15px] font-[600] text-darkColor_02">
                    <FaClock className="text-gray-500" />
                    {t("jobApplication.createdAt")}
                    {job?.created_at}
                  </span> */}
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
            <div className=" rounded-lg shadow-sm  mb-10">
              <div className="">
                <div className="flex gap-5 justify-center items-center px-4 md:px-8 -mb-px">
                  <button
                    className={`py-4 px-4 border-b-2 font-bold ${
                      activeTab === "overview"
                        ? "border-blue-600 text-blue-600"
                        : " text-[17px]  text-darkColor_02"
                    }`}
                    onClick={() => setActiveTab("overview")}
                  >
                    Overview
                  </button>
                  <button
                    className={`py-4 px-4 border-b-2 font-bold ${
                      activeTab === "application"
                        ? "border-blue-600 text-blue-600"
                        : " text-[17px] font-bold text-darkColor_02"
                    }`}
                    onClick={() => setActiveTab("application")}
                  >
                    Application
                  </button>
                </div>
              </div>

              <div className="py-8 px-4 md:p-8 bg-[#f9fafb]">
                {activeTab === "overview" ? (
                  <JobApplicationOverview
                    job={job}
                    setActiveTab={setActiveTab}
                  />
                ) : (
                  <JobApplicationApply job={job} setActiveTab={setActiveTab} />
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
}

export default JobApplication;
