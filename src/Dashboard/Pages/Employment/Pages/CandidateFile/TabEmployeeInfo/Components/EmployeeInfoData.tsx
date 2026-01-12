import theDateObj from "@/Dashboard/DateMonthDays";
import DetailsInfoDiv from "@/Dashboard/Pages/Orders/Components/ModalsOrder/ModalVacationDetails/DetailsInfoDiv";
import { useTranslation } from "react-i18next";

const EmployeeInfoData = ({ dataApplicants }) => {
    const { t, i18n } = useTranslation('employment');

    const details = [
        {
            titleDetails: t('candidateFile.personalData.fullName'),
            textDetails: dataApplicants?.name || t('candidateFile.personalData.notAvailable'),
        },
        {
            titleDetails: t('candidateFile.personalData.jobApplied'),
            textDetails: dataApplicants?.job?.title || t('candidateFile.personalData.notAvailable'),
        },
        {
            titleDetails: t('candidateFile.personalData.jobType'),
            textDetails:
                dataApplicants?.job?.type === "inhouse"
                    ? t('candidateFile.personalData.fullTimeOnsite')
                    : dataApplicants?.job?.type || t('candidateFile.personalData.notAvailable'),
        },
        {
            titleDetails: t('candidateFile.personalData.email'),
            textDetails: dataApplicants?.email || t('candidateFile.personalData.notAvailable'),
        },
        {
            titleDetails: t('candidateFile.personalData.phone'),
            textDetails: dataApplicants?.phone || t('candidateFile.personalData.notAvailable'),
        },
        {
            titleDetails: t('candidateFile.personalData.address'),
            textDetails: dataApplicants?.address || t('candidateFile.personalData.notAvailable'),
        },
        {
            titleDetails: t('candidateFile.personalData.requestStatus'),
            textDetails:
                dataApplicants?.status === "pending"
                    ? t('candidateFile.personalData.pending')
                    : dataApplicants?.status || t('candidateFile.personalData.notAvailable'),
        },
        {
            titleDetails: t('candidateFile.personalData.applicationDate'),
            textDetails:
                i18n.language === "ar"
                    ? theDateObj.formatDataFunctionAR(dataApplicants.created_at)
                    : theDateObj.formatDataFunctionEN(
                          dataApplicants.created_at
                      ) || t('candidateFile.personalData.notAvailable'),
        },
        {
            titleDetails: t('candidateFile.personalData.announcedSalary'),
            textDetails: dataApplicants?.job?.salary
                ? `${dataApplicants.job.salary} ر.س`
                : t('candidateFile.personalData.notAvailable'),
        },
        {
            titleDetails: t('candidateFile.personalData.cv'),
            textDetails: dataApplicants?.cv ? t('candidateFile.personalData.uploaded') : t('candidateFile.personalData.notAvailable'),
            isLink: !!dataApplicants?.cv,
            link: dataApplicants?.cv,
        },
    ];

    return (
        <div className="all-data-user grid-cards-2 padding-t-3 gap-0">
            {details.map((detail, index) => (
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

export default EmployeeInfoData;
