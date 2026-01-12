import React, { useEffect, useState } from "react";
import male from "@assets/images/homeimages/users/male.png";

import DataTableTwo from "@/Dashboard/Shared/DataTableInfo/DataTableTwo";
import ButtonsActionShowEditDelete from "@/Dashboard/Shared/DataTableInfo/ActionsButtons/ButtonsActionShowEditDelete";
import ModalFilterPredecessorRequests from "@/Dashboard/Pages/Orders/Components/PredecessorRequests/ModalFilterPredecessorRequests";
import { useNavigate } from "react-router-dom";
import ModalDeleteEmployeeSystemPermanently from "@/Dashboard/Shared/ModalDeleteEmployeeSystemPermanently/ModalDeleteEmployeeSystemPermanently";
import axiosInstance from "@/utils/axios";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { Skeleton } from "@mui/material";
import theDateObj from "@/Dashboard/DateMonthDays";
import { FullRoutes } from "@/Routes/routes";
import { Loading } from "@/components";

import { MdVisibility } from "react-icons/md"; // لازم تكون عندك react-icons
import { Tooltip } from "flowbite-react";
import ExcelDrop from "@assets/Icons/excel-drop";
import CustomModal from "@/Dashboard/Shared/CustomModal/CustomModal";
import ImportExcel from "./ImportExcel";
import { withPermissions } from "@/hoc";
import { hasAnyPermission } from "@/utils/global";
import FiltersDropdown from "./FiltersDropdown";
import ModalShared from "@/Dashboard/Pages/Orders/Components/VacationsRequests/ModalFilterData/Components/ModalShared/ModalShared";

interface Employee {
  id: number;
  first_name: string;
  last_name: string;
  email: string | null;
  image: string | null;
  jobtitle: { title: string } | null;
  category_id: { title: string } | null;
  created_at: string;
  code: string;
  endservice: number;
}

const TableStaff = ({ permissions }: { permissions: any }) => {
  console.log({ permissions });
  const [openModalExcel, setOpenModalExcel] = useState(false);
  const buttonOpenModalExcel = () => {
    setOpenModalExcel(!openModalExcel);
  };

  const [openFilter, setOpenFilter] = useState(false);
  const showModalFilter = () => {
    setOpenFilter(!openFilter);
  };

  const navigate = useNavigate();
  const { t } = useTranslation("staffManagement");
  // SHOW MODAL
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [Datass, setData] = useState<Employee[]>([]);
  const [loading, setloading] = useState(true);
  const [refetch, setrefetch] = useState(false);
  const theadTrContent = [
    t("table.headers.employeeCode"),
    t("table.headers.employee"),
    t("table.headers.department"),
    t("table.headers.jobTitle"),
    t("table.headers.status"),
    t("table.headers.hiredOn"),
    ...(hasAnyPermission(permissions) ? [t("table.headers.actions")] : [])
  ];

  const refetchFunc = () => {
    setrefetch(!refetch);
  };

  const langgg = i18next.language;

  useEffect(() => {
    axiosInstance
      .get("/employee", {
        headers: {
          "Accept-Language": langgg
        }
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
  }, [refetch]);

  // DELETE DATA ITEMS
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null);
  // OPEN MODAL DELETE
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const buttonOpenModalDelete = () => {
    setOpenModalDelete(!openModalDelete);
  };

  // FUNCTION FOR DELETE
  const handleDeleteItem = () => {
    if (deleteItemId !== null) {
      // FILTER THE DATA TO REMOVE THE ITEMS WITH ID
      axiosInstance
        .delete(`/employee/${deleteItemId}`, {
          headers: {
            "Accept-Language": langgg // Replace "en" with your desired language code
          }
        })
        .then((res) => refetchFunc());
    }
  };

  // أضف هذا الاستيت
  const [copiedCodeId, setCopiedCodeId] = useState<number | null>(null);

  // دالة نسخ الكود
  const handleCopyCode = (code: string, id: number) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 1000);
  };

  // دالة إغلاق مودل Excel مع تحديث البيانات
  const handleCloseExcelModal = () => {
    setOpenModalExcel(false);
    refetchFunc(); // تحديث البيانات من API
  };

  // CONTENT OF ARRAY
  const tbodyContent = Datass.map((item) => [
    item.code === null ? (
      t("table.notFound")
    ) : (
      <Tooltip
        content={copiedCodeId === item.id ? "تم النسخ" : "انسخ الكود"}
        trigger="click"
        animation="duration-200"
      >
        <span
          className="cursor-pointer select-all hover:text-blue-600 transition-colors duration-200"
          onClick={() => handleCopyCode(item.code, item.id)}
        >
          {item.code}
        </span>
      </Tooltip>
    ),

    <div className="flex items-start gap-3" key={item.id}>
      {loading ? (
        <Skeleton variant="circular" width={40} height={40} />
      ) : (
        <img
          src={item.image || male}
          className="rounded-[50px] !w-[40px] !h-[40px] border border-lightColorWhite2"
          alt="img user"
          loading="eager"
        />
      )}

      {loading ? (
        <div className="space-y-2">
          <Skeleton variant="text" width={120} height={20} />
          <Skeleton variant="text" width={100} height={15} />
        </div>
      ) : (
        <div className="flex flex-col group relative">
          <div className="flex items-center gap-2">
            <div className="flex flex-col">
              <span
                className="text-font-dark font-medium cursor-pointer hover:text-blue-600 transition-colors duration-200"
                onClick={() =>
                  navigate(
                    FullRoutes.Dashboard.StaffManagement.StaffEmployeeInformationWithId(
                      { id: item?.id }
                    )
                  )
                }
              >
                {`${item.first_name} ${item.last_name}`}
              </span>
              <span className="text-sm text-gray-500">
                {item.jobtitle?.title}
              </span>
            </div>

            <div className="hidden group-hover:flex items-center">
              <Tooltip content={t("table.tooltips.view")}>
                <MdVisibility
                  className="cursor-pointer text-[#4f69b9] text-[18px] transition-all duration-200 transform hover:scale-125"
                  onClick={() =>
                    navigate(
                      FullRoutes.Dashboard.StaffManagement.StaffEmployeeInformationWithId(
                        {
                          id: item?.id
                        }
                      )
                    )
                  }
                />
              </Tooltip>
            </div>
          </div>
          {/* 
                    <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                        <MdEmail size={15} />
                        <span>{item.email || t("table.noEmail")}</span>
                    </div> */}
        </div>
      )}
    </div>,

    item.category_id === null ? t("table.notFound") : item.category_id.title,
    item.jobtitle?.title || t("table.notFound"),
    item.endservice == 0 ? (
      <span className="text-green-500">{t("table.active")}</span>
    ) : (
      <span className="text-red-500">{t("table.inactive")}</span>
    ),

    langgg == "ar"
      ? theDateObj.formatDataFunctionAR(item.created_at)
      : theDateObj.formatDataFunctionEN(item.created_at),

    ...(hasAnyPermission(permissions)
      ? [
          <div key={item.id}>
            <ButtonsActionShowEditDelete
              hideShowFunction={!permissions?.create}
              functionShow={() => {
                navigate(
                  FullRoutes.Dashboard.StaffManagement.StaffEmployeeInformationWithId(
                    { id: item?.id }
                  )
                );
              }}
              hideEdit={!permissions?.update}
              functionEdit={() => {
                navigate(
                  FullRoutes.Dashboard.StaffManagement.StepsAddEmployeeDataWithId(
                    {
                      id: item.id
                    }
                  )
                );
              }}
              hideDelete={!permissions?.delete}
              functionDelete={() => {
                setDeleteItemId(item.id); // REMOVE ITEM US ID
                buttonOpenModalDelete(); // OPEN MODAL DELETE
              }}
              showLinkCopy={false}
              functionLinkCopy={() => {}}
            />
          </div>
        ]
      : [])
  ]);
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <ModalDeleteEmployeeSystemPermanently
        openModalDelete={openModalDelete}
        hiddenModalDelete={buttonOpenModalDelete}
        onDelete={handleDeleteItem}
      />

      <ModalFilterPredecessorRequests open={open} hiddenModal={handleOpen} />

      <ModalShared open={openFilter} hiddenModal={showModalFilter}>
        <FiltersDropdown />
      </ModalShared>
      <div className="vacations-requests border-width-content mt-3">
        <DataTableTwo
          theadContent={theadTrContent}
          tbodyContent={tbodyContent}
          withCheckboxes={false}
          isShowContentFilterInfo={true}
          isShowModalButtonFilter={true}
          functionButtonFilter={() => {
            showModalFilter();
          }}
          isTrueButtonsModalContentRight={permissions?.create}
          functionButtonModalOne={() => {
            navigate(FullRoutes.Dashboard.StaffManagement.StepsAddNewEmployee);
          }}
          textContentButtonOne={t("table.actions.addEmployee")}
          isTrueButtonTwoModalContent={false}
          newClassButtonTwo=""
          functionModalButtonTwo={() => {}}
          textContetButtonTwo=""
          showDateFilter={false}
          onChangeDateFilter={() => {}}
          showButtonImportExcel={permissions?.create}
          actionButtonsDrop={[
            {
              label: "استيراد من اكسل",
              onClick: () => {
                buttonOpenModalExcel();
              },
              icon: <ExcelDrop />
            }
          ]}
        />
      </div>

      <CustomModal
        newClassModal={"md:!min-w-[740px] lg:!min-w-[920px]"}
        isOpen={openModalExcel}
        handleOpen={buttonOpenModalExcel}
        titleModal={``}
      >
        <ImportExcel onClose={handleCloseExcelModal} />
      </CustomModal>
    </>
  );
};

export default withPermissions(TableStaff, "employees", {
  isComponent: true
});
