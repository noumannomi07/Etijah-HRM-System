import { useState } from "react";

const AllCardsContent = () => {
  // LIST OF CHECKBOX LABELS (CONTENT)
  const content = ["عرض", "تعديل", "حذف"];

  // LIST OF CARD TITLES
  const cardTitles = [
    "الطلبات",
    "إدارة الموظفين",
    "الحضور والإنصراف",
    "التقويم",
    "مسيرات الرواتب",
    "تعديلات الرواتب",
    "إدارة المخالفات",
    "التوظيف",
    "الأقسام",
    "مستندات الشركة",
    "الهيكل التنظيمي",
    "مؤشر الاداء",
    "المهام",
    "المكافأة",
    "التقارير"
  ];

  // STATE TO CHECK INPUT FOR EACH CARD
  const [checkedItems, setCheckedItems] = useState(
    new Array(cardTitles.length)
      .fill(null)
      .map(() => new Array(content.length).fill(false))
  );
  const [isAllChecked, setIsAllChecked] = useState(
    new Array(cardTitles.length).fill(false)
  );

  // HANDLE CHECK ROW CHECKBOX CHANGE (INDIVIDUAL CHECKBOXES)
  const handleCheckboxChange = (cardIndex, checkboxIndex) => {
    const updatedCheckedItems = [...checkedItems];
    updatedCheckedItems[cardIndex][checkboxIndex] =
      !checkedItems[cardIndex][checkboxIndex]; // TOGGLE THE CHECKED STATE FOR THE CLICKED CHECKBOX
    setCheckedItems(updatedCheckedItems);

    // IF ALL CHECKBOXES IN THE CARD ARE CHECKED, SET "SELECT ALL" TO CHECKED, OTHERWISE UNCHECK IT
    const allChecked = updatedCheckedItems[cardIndex].every(
      (item) => item === true
    );
    const newIsAllChecked = [...isAllChecked];
    newIsAllChecked[cardIndex] = allChecked;
    setIsAllChecked(newIsAllChecked);
  };

  // HANDLE "SELECT ALL" CHECKBOX CHANGE (HEADER CHECKBOX)
  const handleSelectAllChange = (cardIndex) => {
    const newCheckedState = !isAllChecked[cardIndex];
    const updatedCheckedItems = [...checkedItems];
    updatedCheckedItems[cardIndex] = new Array(content.length).fill(
      newCheckedState
    ); // UPDATE "SELECT ALL" CHECKBOX STATE FOR THE SPECIFIC CARD
    setCheckedItems(updatedCheckedItems); // UPDATE CHECKED ITEMS STATE
    setIsAllChecked((prev) => {
      const newState = [...prev];
      newState[cardIndex] = newCheckedState; // SET ALL CHECKBOXES IN THE CARD TO THE NEW STATE
      return newState;
    });
  };

  return (
    <>
      {/* ==================== START ALL CARD CONTENT ======================= */}
      <div className="all-cards-content grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cardTitles.map((title, cardIndex) => (
          <div key={cardIndex} className="card-one border rounded-[12px]">
            {/* ================ START HEADER CARD ============== */}
            <div className="heaer-card bg-lightGrayColor2 px-5 rounded-[12px_12px_0_0]">
              {/* ================ START CHECK LABEL ================ */}
              <label className="custom-checkbox-container w-full p-3">
                <h2 className="title-header text-font-dark text-[17px] ms-[18px]">
                  {title}
                </h2>
                <div>
                  <input
                    type="checkbox"
                    className="custom-checkbox"
                    checked={isAllChecked[cardIndex]}
                    onChange={() => handleSelectAllChange(cardIndex)}
                  />
                  <span className="custom-checkmark mt-[5px] left-[initial] right-0"></span>
                </div>
              </label>
              {/* ================ END CHECK LABEL ================ */}
            </div>
            {/* ================ END HEADER CARD ============== */}
            {/* ================ START CARD CONTENT ============= */}
            <div className="card-content pt-4 px-5">
              {content.map((label, checkboxIndex) => (
                <label
                  key={checkboxIndex}
                  className="custom-checkbox-container mb-3 w-full"
                >
                  <h2 className="title-header text-font-dark text-[15px] ms-[35px]">
                    {label}
                  </h2>
                  <div>
                    <input
                      type="checkbox"
                      className="custom-checkbox"
                      checked={checkedItems[cardIndex][checkboxIndex]}
                      onChange={() =>
                        handleCheckboxChange(cardIndex, checkboxIndex)
                      }
                    />
                    <span className="custom-checkmark mt-[5px] left-[initial] right-0"></span>
                  </div>
                </label>
              ))}
            </div>
            {/* ================ END CARD CONTENT ============= */}
          </div>
        ))}
      </div>
      {/* ==================== END ALL CARD CONTENT ======================= */}
    </>
  );
};

export default AllCardsContent;
