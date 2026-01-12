const ScopeLevelCurrentFacility = () => {
  const limitedProgress = Math.min(50, 100);
  // CALC HOW MUCH COLOR SHOULD FILLED OVERALL PROGRESS
  const redWidth = Math.min(limitedProgress, 33);
  const yellowWidth = Math.min(Math.max(limitedProgress - 33, 0), 33);
  const greenWidth = Math.min(Math.max(limitedProgress - 66, 0), 34);
  return (
    <div className="all-scope-card border-width-content">
      <h2 className="title text-font-dark text-[20px] mb-5">
        مستوى نطاق المنشأة الحالية
      </h2>
      {/* ================== START ALL MAIN SCOPE ================== */}
      <div className="all-main-scope">
        {/* =================== START ALL PROGRESS BAR ================= */}
        <div className="progress-bar-container mb-5">
          <div
            className="progress-segment tooltip color-b"
            style={{ width: `${redWidth}%` }}
            data-tooltip={`بلاتيني`}
          />
          <div
            className="progress-segment tooltip color-c"
            style={{ width: `${yellowWidth}%` }}
            data-tooltip={`بلاتيني`}
          />
          <div
            className="progress-segment tooltip color-g"
            style={{ width: `${greenWidth}%` }}
            data-tooltip={`بلاتيني`}
          />
        </div>
        {/* =================== END ALL PROGRESS BAR ================= */}

        {/* ================= START HEAD TOP ================= */}
        <div className="head-top flex-between-wrap mb-3">
          <h2 className="title text-font-gray text-[14px] sm:text-[22px]">نسبة السعودة</h2>
          <p className="num-info text-font-dark text-[20px] sm:text-[25px]">40%</p>
        </div>
        {/* ================= END HEAD TOP ================= */}
        {/* ================= START HEAD TOP ================= */}
        <div className="head-top flex-between-wrap mb-3">
          <h2 className="title text-font-gray text-[14px] sm:text-[22px]">
            الحصة المسموح بها
          </h2>
          <p className="num-info text-font-dark text-[14px] sm:text-[18px]">
            43 موظف غير سعودي إضافي
          </p>
        </div>
        {/* ================= END HEAD TOP ================= */}
        <h2 className="title-head text-font-dark mt-3">
          الجهة تحقق الامتثال للتشريعات ونظام العمل
        </h2>
        {/* ================ START LIST CONTENT ================ */}
        <ul className="list-content pr-5 flex flex-col gap-3 w-full mt-3">
          <li className="text-font-gray list-disc text-[16px] sm:text-[18px]">
            إمكانية التقدم بطلب تأشيرات جديدة ضمن رصيدك المتاح
          </li>
          <li className="text-font-gray list-disc text-[16px] sm:text-[18px]">
            القدرة على تغيير المهن للعمالة الوافدة ما عدا المخصصة للسعوديين
          </li>
          <li className="text-font-gray list-disc text-[16px] sm:text-[18px]">
            تجديد رخص العمل بكل يسر
          </li>
        </ul>
        {/* ================ END LIST CONTENT ================ */}
      </div>
      {/* ================== END ALL MAIN SCOPE ================== */}
    </div>
  );
};

export default ScopeLevelCurrentFacility;
