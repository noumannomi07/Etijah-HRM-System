import i18next from 'i18next';

export const getPerformanceIndicatorStatus = (status: string): string => {
    const t = (key: string) => i18next.t(key, { ns: 'performance' });
    
    switch (status) {
        case "in progress":
            return t('status.pending');
        case "not evaluated":
            return t('status.notEvaluated');
        default:
            return status;
    }
};

export const getCurrentQuarter = () => {
    const month = new Date().getMonth() + 1;
    if (month <= 3) return 1;
    if (month <= 6) return 2;
    if (month <= 9) return 3;
    return 4;
};

export const calculateScores = ({evaluationData}) => {
    const quarterScores = [0, 0, 0, 0];
    const quarterMaxScores = [0, 0, 0, 0];

    Object.values(evaluationData).forEach((row: any) => {
        for (let i = 0; i < 4; i++) {
            // Changed to 4 quarters
            if (row[i] !== undefined && row[i] !== null) {
                quarterScores[i] += parseFloat(row[i]) || 0;
                quarterMaxScores[i] += 5; // Each standard has max 5 points
            }
        }
    });

    // Calculate percentages for each quarter
    const quarterPercentages = quarterScores.map((score, i) =>
        quarterMaxScores[i] > 0
            ? Math.round((score / quarterMaxScores[i]) * 100)
            : 0
    );

    // Calculate overall percentage (average of all quarter percentages)
    const activeQuarters = quarterPercentages.filter((p) => p > 0).length;
    const overallPercentage =
        activeQuarters > 0
            ? quarterPercentages.reduce((sum, val) => sum + val, 0) /
              activeQuarters
            : 0;

    const t = (key: string) => i18next.t(key, { ns: 'performance' });
    
    return {
        quarterScores,
        quarterPercentages,
        overallPercentage,
        quarterMaxScores,
        overallPercentageText:
            overallPercentage >= 85
                ? t('evaluation.performanceExcellent')
                : overallPercentage >= 70
                ? t('evaluation.performanceVeryGood')
                : overallPercentage >= 50
                ? t('evaluation.performanceAcceptable')
                : t('evaluation.needsImprovement'),
    };
};


export const hasAnyPermission = (permissions: any) => {
    return permissions?.create || permissions?.update || permissions?.delete;
};





