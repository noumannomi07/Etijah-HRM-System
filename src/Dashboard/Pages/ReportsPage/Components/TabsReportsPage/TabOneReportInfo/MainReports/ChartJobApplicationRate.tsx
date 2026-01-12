import { Progress } from "@material-tailwind/react";
import { colors } from "@material-tailwind/react/types/generic";
import React from "react";
import { useTranslation } from "react-i18next";
import { TopViolation } from "@/types/Reports";

type ChartJobApplicationRateProps = {
  topViolations: TopViolation[]
};

const ChartJobApplicationRate = ({ topViolations }: ChartJobApplicationRateProps) => {
  const { t } = useTranslation('staffManagement');

  const progressData = topViolations.map((violation, index) => ({
    color: ["teal", "amber", "blue", "red", "green"][index % 5] as colors,
    completed: violation.count,
    label: violation.title
  })) || [];

  return (
    <div className="chart-info chart-employee border border-lightColorWhite2 rounded-[8px] py-3">
      <div className="header-top-chart flex justify-between items-center flex-wrap px-3 mt-2">
        <h2 className="title text-[16px] text-darkColor font-[600]">
          {t("reports.topViolations.title")}
        </h2>
      </div>

      <div className="all-progress pt-4 px-2 sm:px-3">
        {progressData.map((item, idx) => (
          <div key={idx} className="mb-4 flex items-center gap-3 w-full">
            <Progress
              value={item.completed}
              label={item.label}
              color={item.color}
              className="rounded-[8px] progress-bar-item w-full"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            />
            <span className="hidden text-font-dark text-[16px] sm:flex items-center gap-1 w-max">
              {item.completed}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChartJobApplicationRate;
