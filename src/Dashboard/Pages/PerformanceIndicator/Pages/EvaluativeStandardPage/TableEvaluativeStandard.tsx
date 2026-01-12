import React, { useEffect, useState } from "react";
import EvaluationChart from "./EvaluationChart";
import { useStandard } from "@/hooks/api/system-settings";
import { Loading } from "@/components";
import { usePerformance } from "@/hooks/api";
import { toast } from "react-toastify";
import { calculateScores, getCurrentQuarter } from "@/utils/global";
import { useTranslation } from "react-i18next";

const TableEvaluativeStandard = ({
    employeeData,
    evaluative_employees = [],
    isEmployeePage = false,
}: {
    employeeData: any;
    evaluative_employees: any;
    isEmployeePage: boolean;
}) => {
    const { t } = useTranslation('performance');
    const { createItem, isCreating } = usePerformance();
    const { queryAll: queryAllStandard, error: errorStandard } = useStandard();

    const currentQuarter = getCurrentQuarter();
    
    // ARRAY FOR THE HEAD CONTENT
    const headers = [
        t('evaluation.standard'),
        t('evaluation.firstQuarterRating'),
        t('evaluation.secondQuarterRating'),
        t('evaluation.thirdQuarterRating'),
        t('evaluation.fourthQuarterRating'),
        t('evaluation.notes'),
    ];

    const tbodyContentInfo = queryAllStandard?.data?.map((item) => item.title);
    const [evaluationData, setEvaluationData] = useState({});
    const [isEditing, setIsEditing] = useState(false);

    // Toggle Edit Mode
    const toggleEditAll = async () => {
        if (isEditing) {
            try {
                const standard = queryAllStandard?.data?.map((item, index) => {
                    const currentEvaluation = evaluationData[index] || [];

                    return {
                        id: item?.id,
                        ...(currentQuarter >= 1
                            ? {
                                  first_quarter:
                                      currentQuarter >= 1
                                          ? currentEvaluation[0] || 0
                                          : 0,
                              }
                            : {}),
                        ...(currentQuarter >= 2
                            ? {
                                  second_quarter:
                                      currentQuarter >= 2
                                          ? currentEvaluation[1] || 0
                                          : 0,
                              }
                            : {}),
                        ...(currentQuarter >= 3
                            ? {
                                  third_quarter:
                                      currentQuarter >= 3
                                          ? currentEvaluation[2] || 0
                                          : 0,
                              }
                            : {}),
                        ...(currentQuarter >= 4
                            ? {
                                  fourth_quarter:
                                      currentQuarter >= 4
                                          ? currentEvaluation[3] || 0
                                          : 0,
                              }
                            : {}),
                        comment: currentEvaluation[4] || "",
                    };
                });

                const payload = {
                    employee_id: employeeData.id,
                    year: new Date().getFullYear(),
                    standard,
                };

                await createItem(payload);
                setIsEditing(false);
                toast.success(t('messages.updateSuccess'));
            } catch (error) {
                toast.error(error?.response?.data?.message || t('messages.updateError'));
            }
        } else {
            setIsEditing(true);
        }
    };

    // Handle Input Change
    const handleInputChange = (rowIndex, colIndex, value) => {
        if (colIndex < currentQuarter || colIndex == 4) {
            // Prevent changes to future quarters
            setEvaluationData((prevData) => {
                const updatedData = { ...prevData };
                updatedData[rowIndex][colIndex] =
                    colIndex === 4 ? value : Math.min(Number(+value), 5);
                return updatedData;
            });
        }
    };

    useEffect(() => {
        if (!queryAllStandard?.isLoading) {
            setEvaluationData(
                queryAllStandard?.data?.reduce((acc, item, index) => {
                    const selected = evaluative_employees?.find(
                        (employee) => employee.standard_id == item.id
                    ) || {
                        first_quarter: 0,
                        second_quarter: 0,
                        third_quarter: 0,
                        fourth_quarter: 0,
                        comment: "",
                    };

                    acc[index] = [
                        selected?.first_quarter,
                        selected?.second_quarter,
                        selected?.third_quarter,
                        selected?.fourth_quarter,
                        selected?.comment,
                    ];

                    return acc;
                }, {}) || {}
            );
        }
    }, [queryAllStandard?.isLoading]);

    if (errorStandard) {
        return (
            <div className="error-message">
                <p>
                    {errorStandard?.message ||
                        t('messages.errorFetchingData')}
                </p>
            </div>
        );
    }

    if (queryAllStandard?.isLoading) {
        return <Loading />;
    }

    const {
        quarterScores,
        quarterPercentages,
        overallPercentage,
        overallPercentageText,
        quarterMaxScores,
    } = calculateScores({ evaluationData });

    return (
        <>
            {/* EDIT BUTTON */}
 
            {!isEmployeePage && (
                <>
                    <div className="flex justify-end mb-4 gap-2">
                        <button
                            disabled={isCreating}
                            onClick={toggleEditAll}
                            className={`btn-main height--50 ${
                                isEditing ? "button-danger" : ""
                            }`}
                        >
                            {isEditing
                                ? isCreating
                                    ? t('buttons.saving')
                                    : t('buttons.save')
                                : t('buttons.editEvaluation')}
                        </button>
                        {isEditing && (
                            <button
                                className="btn-main height--50 btn-main-danger"
                                onClick={toggleEditAll}
                            >
                                {t('buttons.cancel')}
                            </button>
                        )}
                    </div>
                </>
            )}

            {/* EVALUATION TABLE */}
            <div className="overflow-x-auto scrollbarChange">
                <table className="table-auto w-max sm:w-full border-collapse border border-lightColorWhite2">
                    <thead className="bg-[#F2F7FF]">
                        <tr>
                            {headers.map((header, index) => (
                                <th
                                    key={index}
                                    className="text-font-dark text-[14px] sm:text-[16px] border border-lightColorWhite2 p-4"
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {tbodyContentInfo?.map((tbodyContent, rowIndex) => (
                            <tr key={rowIndex} className="text-center">
                                <td className="text-font-dark text-[14px] sm:text-[16px] border bg-[#F2F7FF] border-lightColorWhite2 p-4">
                                    {tbodyContent}
                                </td>
                                {evaluationData[rowIndex]
                                    ?.slice(0, 4)
                                    .map((value, colIndex) => (
                                        <td
                                            key={colIndex}
                                            className="text-font-dark text-[16px] border border-lightColorWhite2 p-4"
                                        >
                                            {!isEditing ? (
                                                value || 0
                                            ) : (
                                                <input
                                                    type="number"
                                                    min={0}
                                                    disabled={
                                                        colIndex >=
                                                        currentQuarter
                                                    }
                                                    title={
                                                        colIndex >=
                                                        currentQuarter
                                                            ? t('evaluation.cannotEditNow')
                                                            : ""
                                                    }
                                                    value={value}
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            rowIndex,
                                                            colIndex,
                                                            e.target.value
                                                        )
                                                    }
                                                    className="border border-gray-300 p-2 rounded disabled:bg-gray-200"
                                                />
                                            )}
                                        </td>
                                    ))}
                                <td className="text-font-dark text-[16px] border border-lightColorWhite2 p-4">
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={
                                                evaluationData[rowIndex]?.[4]
                                            }
                                            onChange={(e) =>
                                                handleInputChange(
                                                    rowIndex,
                                                    4,
                                                    e.target.value
                                                )
                                            }
                                            className="border border-gray-300 p-2 rounded"
                                        />
                                    ) : (
                                        evaluationData[rowIndex]?.[4]
                                    )}
                                </td>
                            </tr>
                        ))}

                        <tr>
                            <td className="text-font-dark text-[14px] sm:text-[16px] border bg-[#F2F7FF] border-lightColorWhite2 p-4">
                                {t('evaluation.percentage')}
                            </td>
                            {quarterPercentages.map((percentage, index) => (
                                <td
                                    key={index}
                                    className="text-font-dark text-[16px] border border-lightColorWhite2 p-4 text-center"
                                >
                                    {quarterScores[index]}/
                                    {quarterMaxScores[index]} ({percentage}%)
                                </td>
                            ))}
                            <td className="text-font-dark text-[16px] border border-lightColorWhite2 p-4 text-center">
                                {quarterPercentages.every((p) => p >= 85)
                                    ? t('evaluation.goodRate')
                                    : t('evaluation.needsImprovement')}
                            </td>
                        </tr>

                        {/* Overall percentage row */}
                        <tr className="font-bold ">
                            <td className="text-font-dark text-[14px] sm:text-[16px] border bg-[#F2F7FF] border-lightColorWhite2 p-4">
                                {t('evaluation.finalPercentage')}
                            </td>
                            <td
                                colSpan={4}
                                className="text-font-dark text-[16px] border border-lightColorWhite2 p-4 text-center"
                            >
                                {overallPercentage.toFixed(2)}%
                            </td>
                            <td className="text-font-dark text-[16px] border border-lightColorWhite2 p-4 text-center">
                                {overallPercentageText}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <EvaluationChart
                evaluationData={evaluationData}
                tbodyContentInfo={tbodyContentInfo}
            />
        </>
    );
};

export default TableEvaluativeStandard;
