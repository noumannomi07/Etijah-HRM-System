import Chart from "react-apexcharts";
import "./TableEvaluativeStandard.css";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const EvaluationChart = ({ evaluationData, tbodyContentInfo }) => {
    const { t } = useTranslation('performance');
    
    // CHART OPTIONS FOR COLUMN CHART WITH MARKERS
    const chartOptions = {
        chart: {
            type: "bar",
            height: 350,
        },
        plotOptions: {
            bar: {
                columnWidth: "85%", // ADJUSTS THE WIDTH OF THE BARS
                distributed: true,
                barHeight: "100%", // HEIGHT OF THE BARS, CAN BE ADJUSTED FOR APPEARANCE
                borderRadius: 5, // OPTIONAL: ADDS ROUNDED CORNERS TO BARS
                dataLabels: {
                    position: "top", // POSITION OF THE DATA LABELS
                },
            },
        },
        markers: {
            size: 5, // SIZE OF THE MARKERS
        },
        xaxis: {
            categories: tbodyContentInfo, // Set dynamically
        },
        yaxis: {
            title: {
                text: t('evaluation.rating'), // TITLE FOR THE Y-AXIS
            },
            labels: {
                formatter: (value, index) => {
                    const headers = [
                        t('quarters.first'),
                        t('quarters.second'),
                        t('quarters.third'),
                        t('quarters.fourth'),
                    ];
                    return headers[index] || ""; // RETURN HEADER OR ORIGINAL VALUE IF INDEX EXCEEDS HEADERS
                },
            },
        },
        dataLabels: {
            enabled: true,
            formatter: (val) => val, // FORMAT DATA LABELS
            style: {
                fontSize: "12px",
            },
        },
    };
    // Prepare chart series data dynamically from evaluationData
    const chartSeries = Object.keys(evaluationData)
        .slice(0, 8) // Take first 8 rows (skipping percentage rows)
        .map((key) => ({
            name: tbodyContentInfo[key],
            data: evaluationData[key].slice(0, 4), // Show scores for Q1 to Q4
        }));

    return (
        <div className="mt-7 main-chart-info">
            <div className="main-chart-bar">
                <Chart
                    options={chartOptions}
                    series={chartSeries}
                    type="bar"
                    height={350}
                />
            </div>
        </div>
    );
};

EvaluationChart.propTypes = {
    evaluationData: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.number))
        .isRequired,
    tbodyContentInfo: PropTypes.arrayOf(PropTypes.string).isRequired, // Changed to array
};

export default EvaluationChart;
