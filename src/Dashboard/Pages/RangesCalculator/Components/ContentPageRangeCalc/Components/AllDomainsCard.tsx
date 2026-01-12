import "./styleConent.css";
const AllDomainsCard = () => {
  const rowData = [
    {
      colorClass: "bg-red-500",
      label: "أحمر",
      saudiRate: "0% - 4.82%",
      reachInfo: "--"
    },
    {
      colorClass: "bg-yellow-500",
      label: "أصفر",
      saudiRate: "5% - 11.82%",
      reachInfo: "--"
    },
    {
      colorClass: "bg-green-500",
      label: "أخضر",
      saudiRate: "12% - 100%",
      reachInfo: "النطاق الحالي"
    }
  ];
  return (
    <div className="all-domains-card border-width-content">
      <h2 className="title text-font-dark text-[20px] mb-5">جميع النطاقات</h2>
      <div className="custom-table">
        {/* ================ START HEADER =============== */}
        <div className="custom-table-header">
          <div className="text-head text-right">النطاق</div>
          <div className="text-head">نسبة السعودة</div>
          <div className="text-head">كيف تصل للنطاق</div>
        </div>
        {/* ================ END HEADER =============== */}

        {/* ================ START ROW =============== */}
        {rowData.map((row, index) => (
          <div className="custom-table-row" key={index}>
            <div className="td-one flex items-center gap-3 text-font-dark">
              <span
                className={`bg-color w-[35px] h-[35px] flex justify-center items-center rounded-[8px] ${row.colorClass}`}
              ></span>
              {row.label}
            </div>
            <div className="td-one text-font-dark">{row.saudiRate}</div>
            <div className="td-one text-font-dark">{row.reachInfo}</div>
          </div>
        ))}
        {/* ================ END ROW =============== */}
      </div>
    </div>
  );
};

export default AllDomainsCard;
