import DetailsInfoDiv from "@/Dashboard/Pages/Orders/Components/ModalsOrder/ModalVacationDetails/DetailsInfoDiv";

import React from "react";
import { useTranslation } from "react-i18next";

const JobEmployeeInfo = ({ dataApplicants }: { dataApplicants: any }) => {
  const { t } = useTranslation('employment');

  const jobInfo = [
    {
      titleDetails: t('candidateFile.professionalData.job'),
      textDetails: dataApplicants?.job_title || t('candidateFile.professionalData.notAvailable'),
      isLink: false,
  },
  {
    titleDetails: t('candidateFile.professionalData.jobType'),
    textDetails: dataApplicants?.job_type || t('candidateFile.professionalData.notAvailable'),
    isLink: false,
  },
  {
    titleDetails: t('candidateFile.professionalData.experience'),
    textDetails: dataApplicants?.experience || t('candidateFile.professionalData.notAvailable'),
    isLink: false,
  },
 

  {
    titleDetails: t('candidateFile.professionalData.education'),
    textDetails: dataApplicants?.education || t('candidateFile.professionalData.notAvailable'),
    isLink: false,
  },
  {
    titleDetails: t('candidateFile.professionalData.skills'),
    textDetails: dataApplicants?.skills || t('candidateFile.professionalData.notAvailable'),
    isLink: false,
  },
  {
    titleDetails: t('candidateFile.professionalData.cv'),
    textDetails: dataApplicants?.cv || t('candidateFile.professionalData.notAvailable'),
    link: dataApplicants?.cv,
    isLink: true,
  }
    
  ]
 

  return (
    <div className="all-data-user grid-cards-2 padding-t-3 gap-0">
        {jobInfo.map((detail, index) => (
            <DetailsInfoDiv
                key={index}
                newClassName=""
                titleDetails={detail.titleDetails}
                textDetails={detail.textDetails}
                isLink={detail.isLink}
                link={detail.link}
            />
        ))}
    </div>
);
};

export default JobEmployeeInfo;
