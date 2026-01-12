import { ViolationStatusResponse } from "@/hooks/financial/violations";
import { Violation, ViolationRule } from "@/types/Financial";
import { t } from "i18next";

export const getViolationText = (violation: Violation): string => {
    if (!violation || !violation.violation_rule) return t("violations:violationText.noData");

    const { times, violation_rule } = violation;

    // Map times to the correct type and value
    const timeKey = `${times}_type` as keyof ViolationRule;
    const valueKey = `${times}_value` as keyof ViolationRule;

    const deductionType = violation_rule[timeKey]; // e.g., "percent" or "days"
    const deductionValue = violation_rule[valueKey]; // e.g., "1" or "2"

    if (!deductionType || !deductionValue) return t("violations:violationText.noPenalty");

    if (deductionType === "percent") {
        return t("violations:violationText.dailySalaryDeduction", { value: deductionValue });
    } else if (deductionType === "days") {
        return deductionValue === "1"
            ? t("violations:violationText.singleDayDeduction")
            : t("violations:violationText.multipleDaysDeduction", { value: deductionValue });
    } else if (deductionType === "warning") {
        return t("violations:violationText.warning");    
    
    } else if (deductionType === "text") {
        return deductionValue as string;
    }

    

    else {
        return t("violations:violationText.unknownPenaltyType");
    }
};

export const getViolationTextForCheck = (
    violation: ViolationStatusResponse
): string => {
    if (!violation) return t("violations:violationText.noData");

    const { times, type, value } = violation;

    // Get the text for the violation count
    const timesText = t(`violations:violationText.violationCount.${times}`);

    // Handle different violation types
    if (!type || !value) return t("violations:violationText.noPenalty");

    const penaltyText = (() => {
        switch (type) {
            case "percent":
                return t("violations:violationText.dailySalaryDeduction", { value });
            case "days":
                return value === "1"
                    ? t("violations:violationText.singleDayDeduction")
                    : t("violations:violationText.multipleDaysDeduction", { value });
            case "warning":
                return t("violations:violationText.warning");
            case "text":
                return value as string;
            default:
                return t("violations:violationText.unknownPenaltyType");
        }
    })();

    return `${penaltyText} (${timesText})`;
};

export const ordinalToNumber = (ordinal: string): number | null => {
    const ordinalMap: Record<string, number> = {
        first: 1,
        second: 2,
        third: 3,
        fourth: 4,
        fifth: 5,
        sixth: 6,
        seventh: 7,
        eighth: 8,
        ninth: 9,
        tenth: 10,
    };

    return ordinalMap[ordinal.toLowerCase()] ?? null;
};

export const monthKeys = [
    'january',
    'february',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december'
] as const;

export const getMonthName = (monthNumber: number): string => {
    if (monthNumber < 1 || monthNumber > 12) {
        return '';
    }
    return monthKeys[monthNumber - 1];
};
