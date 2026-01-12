import React from "react";
import { AttendanceItem } from "../../types";
import { useTranslation } from "react-i18next";

export default function AttendanceCell({ attendance }: { attendance?: AttendanceItem }) {
  const { t } = useTranslation('attendance');
  if (!attendance) return;
  return (
    <div className="flex flex-col items-center gap-1">

      <p className="text-black">
        {`${attendance?.attend_time} ${attendance?.place?.title ? `- ${attendance?.place?.title}` : ''}`}
      </p>

      {attendance?.is_late ?
        <div className="bg-red-200 text-red-500 rounded-xl px-2 py-1">
          {t('attend_late')}
        </div>
        : <div className="status-success rounded-xl px-2 py-1">
          {t('attend_on_time')}
        </div>
      }

    </div>
  );
}