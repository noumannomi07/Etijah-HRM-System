import React from "react";
import RatingTab from "@/Dashboard/Pages/Employment/Components/AddNewEmployee/TabsAddNewEmployee/RatingTab/RatingTab";
import DetailsInfoDiv from "@/Dashboard/Pages/Orders/Components/ModalsOrder/ModalVacationDetails/DetailsInfoDiv";
import CustomModal from "@/Dashboard/Shared/CustomModal/CustomModal";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useJobRate } from "@/hooks/api/system-settings";
import axiosInstance from "@/utils/axios";
import { toast } from "react-toastify";
import { Loading } from "@/components";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { useTranslation } from "react-i18next";


interface ApplicantData {
    id: number;
    [key: string]: any;
}

const RateEmployeeInfo = ({
    dataApplicants,
    refetch
}: {
    dataApplicants: ApplicantData;
    refetch: any;
}) => {
    console.log({ dataApplicants });
    const { t } = useTranslation('employment');
    const { id } = dataApplicants;

    const { queryAll } = useJobRate();

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [resetRatings, setResetRatings] = useState(false);
    const [ratings, setRatings] = useState<Record<number, number>>({});

    const handleRatingChange = (id: number, rating: number) => {
        setRatings((prev) => ({
            ...prev,
            [id]: rating,
        }));
    };

    const [isLoading, setIsLoading] = useState(false);
    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append("applicant_id", id.toString());

            // Create an array of rating objects
            const ratingEntries = Object.entries(ratings);
            ratingEntries.forEach(([rateId, stars], idx) => {
                formData.append(`rate[${idx}][id]`, rateId);
                formData.append(`rate[${idx}][stars]`, stars.toString());
            });

            await axiosInstance.post(`/applicantrate`, formData);
            toast.success(t('candidateFile.rating.editRateSuccess'));
            setModalIsOpen(false);
            refetch();
        } catch (error) {
            toast.error(t('candidateFile.rating.editRateError'));
        } finally {
            setIsLoading(false);
        }
    };

    if (queryAll?.isLoading) {
        return <Loading />;
    }

    return (
        <div className="all-candidate-valuation relative">
            <div className="all-buttn-edit mb-4 flex justify-end">
                <button
                    onClick={() => {
                        setModalIsOpen(true);
                    }}
                    className="edit-rate btn-main height--50 w-full sm:w-auto"
                >
                    <FontAwesomeIcon icon={faEdit} /> {t('candidateFile.rating.editRate')}
                </button>
            </div>
            <div className="all-candidate-rating grid-cards-2 gap-0">
                {dataApplicants?.rates?.map((detail: any, index: any) => (
                    <DetailsInfoDiv
                        key={index}
                        newClassName=""
                        titleDetails={detail?.rate?.title}
                        newClassTextDetails={
                            detail?.rate?.title === "النتيجة"
                                ? "bg-primaryLightColor text-primaryColor p-[9px_25px] rounded-[50px] text-center w-max"
                                : ""
                        }
                        textDetails={
                            <div className="flex items-center gap-2">
                                {Array.from({ length: detail?.stars }).map(
                                    (star: any, index: any) => (
                                        <StarFilledIcon
                                            className="text-[#FFD700]"
                                            key={index}
                                        />
                                    )
                                )}
                            </div>
                        }
                    />
                ))}
            </div>

            {modalIsOpen && (
                <CustomModal
                    newClassModal=""
                    isOpen={modalIsOpen}
                    handleOpen={() => setModalIsOpen(false)}
                    titleModal={t('candidateFile.rating.editRate')}
                    classBodyContent=""
                >
                    <>
                        {queryAll?.data?.map((system: any) => (
                            <div key={system.id}>
                                <h1 className="text-font-dark text-[16px] mb-2">
                                    {system.title}
                                </h1>
                                <RatingTab
                                    onRatingChange={(rating) =>
                                        handleRatingChange(system.id, rating)
                                    }
                                    reset={resetRatings}
                                    initialRating={
                                        ratings[system.id] !== undefined
                                            ? ratings[system.id]
                                            : (
                                                dataApplicants.rates?.find((r: any) => r.rate?.id === system.id)?.stars ?? 0
                                            )
                                    }
                                    disabled={false}
                                />
                            </div>
                        ))}
                        <div className="flex justify-end gap-4">
                            <button
                                disabled={
                                    isLoading || !Object.keys(ratings)?.length
                                }
                                className="btn-main"
                                onClick={handleSubmit}
                            >
                                {isLoading ? t('candidateFile.rating.submitting') : t('candidateFile.rating.submit')}
                            </button>
                            <button
                                disabled={isLoading}
                                className="button-danger text-whiteColor rounded-lg"
                                onClick={() => setModalIsOpen(false)}
                            >
                                {t('candidateFile.rating.cancel')}
                            </button>
                        </div>
                    </>
                </CustomModal>
            )}
        </div>
    );
};

export default RateEmployeeInfo;
