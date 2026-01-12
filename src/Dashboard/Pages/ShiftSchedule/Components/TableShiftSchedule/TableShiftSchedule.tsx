import ButtonsActionShowEditDelete from "@/Dashboard/Shared/DataTableInfo/ActionsButtons/ButtonsActionShowEditDelete";

import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import DataTableTwo from "@/Dashboard/Shared/DataTableInfo/DataTableTwo";
import FilterTableShiftSchedule from "./FilterTableShiftSchedule";
import ModalDeleteEmployeeSystemPermanently from "@/Dashboard/Shared/ModalDeleteEmployeeSystemPermanently/ModalDeleteEmployeeSystemPermanently";
import i18next from "i18next";
import axiosInstance from "@/utils/axios";
import { toast } from "react-toastify";
import theDateObj from "@/Dashboard/DateMonthDays";
import CustomModal from "@/Dashboard/Shared/CustomModal/CustomModal";
import { FullRoutes } from "@/Routes/routes";
import { Loading } from "@/components";

const TableShiftSchedule = () => {
  // SHOW MODAL
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [Datass, setData] = useState([]);
  const [loading, setloading] = useState(true);
  const [refetch, setrefetch] = useState(false);
  const theadTrContent = [
    "اسم الوردية",
    "الفترة",
    "تاريخ الإنشاء",
    "توقيت بداية العمل",
    "توقيت نهاية العمل",
    "تفاصيل",
    "",
  ];

  const Days = {
    daysar: [
   
      "الأحد",
      "الإثنين",
      "الثلاثاء",
      "الأربعاء",
      "الخميس",
      "الجمعة",
      "السبت",
    ],
    daysen: [
      
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
  };

  const refetchFunc = () => {
    setrefetch(Math.random() * 100000000);
  };


  const langgg = i18next.language;

  useEffect(() => {
    axiosInstance
      .get("/worktime", {
        headers: {
          "Accept-Language": langgg,
        },
      })
      .then((res) => {
        setData(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setloading(false);
      });
  }, [refetch, langgg]);
  
  const [deleteItemId, setDeleteItemId] = useState(null);
  // OPEN MODAL DELETE
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const buttonOpenModalDelete = () => {
    setOpenModalDelete(!openModalDelete);
  };
  // TODO: check if loading is true return loading component
  // if (loading) {
  //   return <Loading />;
  // }
  // FUNCTION FOR DELETE
  const handleDeleteItem = () => {
    if (deleteItemId !== null) {
      // FILTER THE DATA TO REMOVE THE ITEMS WITH ID
      axiosInstance
        .delete(`/worktime/${deleteItemId}`, {
          headers: {
            "Accept-Language": langgg, // Replace "en" with your desired language code
          },
        })
        .then((res) => {
          refetchFunc();
        })
        .catch((error) => {
          if (
            error.response.data.message ===
            "Worktime is already assigned to an employee"
          ) {
            toast.error("لا يمكن حذف الوردية لأنها مرتبطة مع موظف");
          }
        });
    }
  };

  // Add these state variables at the top with other useState declarations
  const [openModalDetails, setOpenModalDetails] = useState(false);
  const [selectedShift, setSelectedShift] = useState({});

  const hidenOpenModalDetails = () => {
    setOpenModalDetails(false);
    setSelectedShift({});
  };

  // Update the formatTime function
  const formatTime = (time) => {
    if (!time) return "";

    const [hours, minutes] = time.split(":");
    let hour = parseInt(hours);
    const period =
      hour >= 12
        ? langgg === "ar"
          ? "م"
          : "PM"
        : langgg === "ar"
          ? "ص"
          : "AM";

    // Convert to 12-hour format
    if (hour > 12) {
      hour -= 12;
    } else if (hour === 0) {
      hour = 12;
    }

    // Pad single digit hours with leading zero
    const formattedHour = hour.toString().padStart(2, "0");

    return `${formattedHour}:${minutes} ${period}`;
  };

  // Update the tbodyContent mapping
  const tbodyContent = Datass.map((item) => [
    item.title,
    item.period,
    langgg == "ar"
      ? theDateObj.formatDataFunctionAR(item.created_at)
      : theDateObj.formatDataFunctionEN(item.created_at),
    formatTime(item.time_from),
    formatTime(item.time_to),
    <button
      className="btn-main py-[10px] m-auto"
      key={item.id}
      onClick={() => {
        setSelectedShift(item);
        setOpenModalDetails(true);
      }}
    >
      تفاصيل
    </button>,

    <div key={item.id}>
      <ButtonsActionShowEditDelete
        hideShowFunction={true}
        functionEdit={() => {
          navigate(FullRoutes.Dashboard.ShiftSchedule.AddShiftScheduleWithId({ id: item?.id }));
        }}
        functionDelete={() => {
          setDeleteItemId(item.id); // REMOVE ITEM US ID
          buttonOpenModalDelete(); // OPEN MODAL DELETE
        }}
      />
    </div>,
  ]);

  const navigate = useNavigate();
  return (
    <>
      <ModalDeleteEmployeeSystemPermanently
        openModalDelete={openModalDelete}
        hiddenModalDelete={buttonOpenModalDelete}
        onDelete={handleDeleteItem}
      />

      <FilterTableShiftSchedule open={open} hiddenModal={handleOpen} />

      <div className="vacations-requests border-width-content">
        <DataTableTwo
          theadContent={theadTrContent}
          tbodyContent={tbodyContent}
          withCheckboxes={false}
          isShowContentFilterInfo={true}
          // isShowModalButtonFilter={true}
          functionButtonFilter={() => {
            handleOpen();
          }}
          isTrueButtonsModalContentRight={true}
          functionButtonModalOne={() => {
            navigate(FullRoutes.Dashboard.ShiftSchedule.AddShiftSchedule);
          }}
          textContentButtonOne={"إضافة جدول العمل"}
          isTrueButtonTwoModalContent={false}
          newClassButtonTwo={false}
          functionModalButtonTwo={false}
          textContetButtonTwo={false}
        />
      </div>
      <CustomModal
        newClassModal={"modern-modal vacation-details-modal"}
        isOpen={openModalDetails}
        handleOpen={hidenOpenModalDetails}
        titleModal={`تفاصيل الوردية : ${selectedShift.title}`}
      >
        <div className="p-4 bg-gray-50/30">
          <div className="space-y-3">
            {/* رأس المودال مع معلومات أساسية */}
            <div className="flex items-center gap-5 p-4 bg-white rounded-xl shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-primary"></div>
              <div className="w-14 h-14 flex items-center justify-center bg-primary/10 text-primary rounded-2xl">
                <i className="fas fa-user-clock text-2xl"></i>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-2xl font-semibold text-gray-900">{selectedShift.title}</h3>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-[14px] font-medium rounded-full">{selectedShift.period}</span>
                </div>
                <div className="flex items-center gap-4 text-[14px] text-gray-600 font-medium">
                  <div className="flex items-center gap-2">
                    <i className="fas fa-clock"></i>
                    <span>{formatTime(selectedShift.time_from)} - {formatTime(selectedShift.time_to)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* معلومات الوقت */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3 bg-white rounded-xl shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 flex items-center justify-center bg-green-100 text-green-600 rounded-xl">
                    <i className="fas fa-play-circle text-xl"></i>
                  </div>
                  <div>
                    <p className="text-[14px] font-medium text-gray-500 mb-0.5">وقت البدء</p>
                    <p className="text-[16px] font-semibold text-gray-900">{formatTime(selectedShift.time_from)}</p>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-white rounded-xl shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 flex items-center justify-center bg-red-100 text-red-600 rounded-xl">
                    <i className="fas fa-stop-circle text-xl"></i>
                  </div>
                  <div>
                    <p className="text-[14px] font-medium text-gray-500 mb-0.5">وقت الانتهاء</p>
                    <p className="text-[16px] font-semibold text-gray-900">{formatTime(selectedShift.time_to)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* فترة الراحة */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3 bg-white rounded-xl shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 flex items-center justify-center bg-teal-100 text-teal-600 rounded-xl">
                    <i className="fas fa-coffee text-xl"></i>
                  </div>
                  <div>
                    <p className="text-[14px] font-medium text-gray-500 mb-0.5">فترة الراحة</p>
                    <p className="text-[16px] font-semibold text-gray-900">{selectedShift.break} دقيقة</p>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-white rounded-xl shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 flex items-center justify-center bg-yellow-100 text-yellow-600 rounded-xl">
                    <i className="fas fa-exclamation-triangle text-xl"></i>
                  </div>
                  <div>
                    <p className="text-[14px] font-medium text-gray-500 mb-0.5">احتساب الغياب بعد</p>
                    <p className="text-[16px] font-semibold text-gray-900">{selectedShift.absent_after} دقيقة</p>
                  </div>
                </div>
              </div>
            </div>

            {/* مرونة الوردية */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3 bg-white rounded-xl shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 flex items-center justify-center bg-purple-100 text-purple-600 rounded-xl">
                    <i className="fas fa-sliders-h text-xl"></i>
                  </div>
                  <div>
                    <p className="text-[14px] font-medium text-gray-500 mb-0.5">مرونة الوردية</p>
                    <p className="text-[16px] font-semibold text-gray-900">
                      {selectedShift.flexible === 1 ? "مرنة" : "غير مرنة"}
                    </p>
                  </div>
                </div>
              </div>

              {selectedShift.flexible === 1 && (
                <div className="p-3 bg-white rounded-xl shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-xl">
                      <i className="fas fa-hourglass-half text-xl"></i>
                    </div>
                    <div>
                      <p className="text-[14px] font-medium text-gray-500 mb-0.5">الوقت المتاح للتأخير</p>
                      <p className="text-[16px] font-semibold text-gray-900">{selectedShift.flexible_time} دقيقة</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* أيام الإجازة */}
            <div className="p-3 bg-white rounded-xl shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 flex items-center justify-center bg-pink-100 text-pink-600 rounded-xl">
                  <i className="fas fa-calendar-alt text-xl"></i>
                </div>
                <div>
                  <p className="text-[14px] font-medium text-gray-500">أيام الإجازة</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedShift?.vacation_days?.map((holiday) => (
                  <div
                    key={holiday.id}
                    className="px-3 py-1 bg-pink-50 text-pink-600 text-[14px] font-medium rounded-full flex items-center gap-1.5"
                  >
                    <i className="fas fa-sun text-[12px]"></i>
                    {i18next.language === "ar"
                      ? Days.daysar[holiday]
                      : Days.daysen[holiday]}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CustomModal>
    </>
  );
};

export default TableShiftSchedule;
