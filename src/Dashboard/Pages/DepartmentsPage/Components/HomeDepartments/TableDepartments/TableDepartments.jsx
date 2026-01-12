import React from "react";
import DataTableTwo from "@/Dashboard/Shared/DataTableInfo/DataTableTwo";
import ToggleSwitchCheck from "@/Dashboard/Shared/ToggleSwitch/ToggleSwitchCheck";
import { useEffect, useState } from "react";
import ButtonsActionDepartments from "./ButtonsActionDepartments";
import ModalFilterDepartments from "./ModalFilterDepartments";
import { useNavigate } from "react-router-dom";
import ModalDeleteEmployeeSystemPermanently from "@/Dashboard/Shared/ModalDeleteEmployeeSystemPermanently/ModalDeleteEmployeeSystemPermanently";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Spinner, Table } from "flowbite-react";
import CustomModal from "@/Dashboard/Shared/CustomModal/CustomModal";
import NotDataFound from "@/Dashboard/Shared/NotDataFound/NotDataFound";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import axiosInstance from "@/utils/axios";
import { toast } from "react-toastify";
import i18next from "i18next";
import InputField from "@/Dashboard/Shared/Forms/InputField";
import ButtonsFormSendCancel from "@/Dashboard/Pages/Orders/Components/ReusablePageAddNewContent/ButtonsFormSendCancel/ButtonsFormSendCancel";
import { Form, Formik, Field } from "formik";
import { Loading } from "@/components";
import theDateObj from "@/Dashboard/DateMonthDays";
import EmployeeSelect from "@/Dashboard/Pages/Orders/Components/AllSelectsForm/EmployeeSelect";
// import arrowDown from "@fortawesome/fontawesome-svg-core";
const TableDepartments = () => {
  const navigate = useNavigate();
  const langgg = i18next.language;
  // SHOW MODAL
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [showJobDetails, setShowJobDetails] = useState(false);
  const [loading2, setloading2] = useState(true);

  const [showJobDetailsData, setShowJobDetailsDate] = useState({});
  const [showJobDetailsDataAPI, setShowJobDetailsDateAPI] = useState({});
  const functionToShowDetails = (item) => {
    console.log(loading2);
    console.log(item.id);
    axiosInstance
      .get(`/employee-categories/${item.id}`, {
        headers: {
          "Accept-Language": langgg, // Replace "en" with your desired language code
        },
      })
      .then((res) => {
        setShowJobDetailsDateAPI(res.data.data); // تحديث البيانات
        console.log(res.data.data);
        console.log(loading2);
        setloading2(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        // setloading2(false); // إخفاء مؤشر التحميل
      });
  };
  const theadTrContent = [
    "#",
    "الأقسام",
    "المدير",
    "عدد الموظفين", 
    "تاريخ الإنشاء",
    ""
  ];

  // DELETE DATA ITEMS
  // const [deleteItemId, setDeleteItemId] = useState(null);
  // OPEN MODAL DELETE

  // تهيئة البيانات كمصفوفة
  const [DepartmentsData, setDepartmentsData] = useState([]);
  const [loading, setloading] = useState(true);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openEditDepartments, setopenEditDepartments] = useState(false);
  const [refetch, setrefetch] = useState(false);
  const [EditDepartmentsData, setEditDepartmentsData] = useState({});

  const buttonOpenModalDelete = () => {
    setOpenModalDelete(!openModalDelete);
  };

  const refetchFunc = () => {
    setrefetch(Math.random() * 100000000);
  };

  const deleteItmeDepartments = (id) => {
    axiosInstance
      .delete(`/employee-categories/${id}`, {
        headers: {
          "Accept-Language": langgg, // Replace "en" with your desired language code
        },
      })
      .then((res) => {
        console.log(res.data.data);
        refetchFunc();
      });
  };

  // init values
  const initialValues = {
    ar: {
      title: EditDepartmentsData.title, // Arabic title
    },
    en: {
      title: EditDepartmentsData.title, // English title
    },
    manager_id: EditDepartmentsData.manager_id,
  };

  const handleSubmit = (values, { setTouched, resetForm }) => {
    setTouched({
      "ar.title": true,
      "en.title": true,
    });



    console.log("Form values:", values);

    values.manager_id = values.manager_id?.id;

    // Perform API call
    axiosInstance
      .put(`/employee-categories/${EditDepartmentsData.id}`, values, {
        headers: {
          "Accept-Language": langgg, // Replace "en" with your desired language code
        },
      })
      .then((res) => {
        console.log(res.data.data);
        toast.success("تم تعديل القسم بنجاح"); // Success message in Arabic
        setopenEditDepartments(false); // Update state or perform other necessary actions
        resetForm(); // Reset form after successful submission if needed
        refetchFunc();
      })
      .catch((error) => {
        console.error("Error updating Departments:", error);
        toast.error("حدث خطأ أثناء تعديل القسم"); // Error message in Arabic
      });
  };

  const cancelAdd = () => {
    toast.success("تم الالغاء بنجاح.");
    setopenEditDepartments(false);
  };

  useEffect(() => {
    axiosInstance
      .get("/employee-categories", {
        headers: {
          "Accept-Language": langgg, // Replace "en" with your desired language code
        },
      })
      .then((res) => {
        setDepartmentsData(res.data.data); // تحديث البيانات
        console.log(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setloading(false); // إخفاء مؤشر التحميل
      });
  }, [refetch]);

  // إذا كانت البيانات قيد التحميل

  if (loading) {
    return (
      <Loading />
    );
  }


  // CONTENT OF ARRAY
  const tbodyContent = DepartmentsData.map((item) => [
    item.id,
    item.title,
    <div key={item.id}>
      {item.manager ? `${item.manager.first_name} ${item.manager.last_name}` : 'لا يوجد مدير'}
    </div>,
    <div key={item.id}>{item.employees_count} موظف</div>,
    <div key={item.created_at}>
      {langgg == "ar"
        ? theDateObj.formatDataFunctionAR(item.created_at)
        : theDateObj.formatDataFunctionEN(item.created_at)}
    </div>,
    <div key={item.id}>
      <ButtonsActionDepartments
        functionEdit={() => {
          setopenEditDepartments(true);
          setEditDepartmentsData(item);
          console.log(item);
        }}
        functionDelete={() => {
          buttonOpenModalDelete();
          setEditDepartmentsData(item);
        }}
      />
    </div>,
  ]);

  return (
    <>
      <ModalFilterDepartments open={open} hiddenModal={handleOpen} />
      <ModalDeleteEmployeeSystemPermanently
        openModalDelete={openModalDelete}
        hiddenModalDelete={buttonOpenModalDelete}
        titleModal="حذف من النظام نهائيا ؟"
        textModal="هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى."
        onDelete={() => {
          deleteItmeDepartments(EditDepartmentsData.id);
        }}
      />
      <div className="table-employment-requests border-width-content">
        <DataTableTwo
          theadContent={theadTrContent}
          allDataTable={DepartmentsData}
          tbodyContent={tbodyContent}
          withCheckboxes={false}
          isShowContentFilterInfo={true}
          isShowModalButtonFilter={false}
          functionButtonFilter={() => {
            handleOpen();
          }}
          isTrueButtonsModalContentRight={true}
          functionButtonModalOne={() => {
            navigate("/dashboard/departments-page/add-new-departments");
          }}
          textContentButtonOne={"إضافة قسم جديد"}
          isTrueButtonTwoModalContent={false}
          newClassButtonTwo={false}
          functionModalButtonTwo={false}
          textContetButtonTwo={false}
        />
      </div>
      {loading2 ? (
        <CustomModal
          isOpen={showJobDetails}
          titleModal={` معلومات الوظائف في : ${showJobDetailsData.title}`}
          handleOpen={() => {
            setShowJobDetails(false);
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100px",
              // transition: "3s",
            }}
          >
            <Spinner />
          </div>
        </CustomModal>
      ) : (
        <CustomModal
          isOpen={showJobDetails}
          titleModal={` معلومات الوظائف في : ${showJobDetailsData.title}`}
          handleOpen={() => {
            setShowJobDetails(false);
          }}
        >
          <button
            onClick={() =>
              navigate("/dashboard/departmentsPage/addNewJobTitle")
            }
            className="btn-main py-[10px]"
            style={{ margin: "20px 0" }}
          >
            <FontAwesomeIcon icon={faPlus} /> إضافة وظيفة جديدة
          </button>
          <div className="overflow-x-auto">
            <Table striped hoverable>
              <Table.Head className="text-center">
                <Table.HeadCell>إسم القسم</Table.HeadCell>
                <Table.HeadCell>المدير</Table.HeadCell>
                <Table.HeadCell>عدد الوظائف</Table.HeadCell>
                <Table.HeadCell>الحالة</Table.HeadCell>
              </Table.Head>
              <Table.Body>
                <Table.Row className="text-center">
                  <Table.Cell>{showJobDetailsDataAPI.title}</Table.Cell>
                  <Table.Cell>
                    {showJobDetailsData.employees_count} وظيفة
                  </Table.Cell>
                  <Table.Cell>
                    <ToggleSwitchCheck
                      id={showJobDetailsDataAPI.id}
                      state={showJobDetailsDataAPI.status}
                    />
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
          <span
            style={{
              borderTop: "1px solid #4c6cb2",
              width: "100%",
              display: "block",
              margin: "20px auto",
            }}
          ></span>
          {!showJobDetailsData.jopTitle ? (
            <NotDataFound />
          ) : (
            <div className="overflow-x-auto">
              <Table striped hoverable>
                <Table.Head className="text-center">
                  <Table.HeadCell>المسمى الوظيفي</Table.HeadCell>
                  <Table.HeadCell>عدد المسمى الوظيفي </Table.HeadCell>
                  <Table.HeadCell>الحالة</Table.HeadCell>
                </Table.Head>
                <Table.Body>
                  {console.log(showJobDetailsData.jopTitle)}
                  {showJobDetailsData?.jopTitle?.map((el, index) => {
                    return (
                      <Table.Row className="text-center" key={index}>
                        <Table.Cell>{el.name}</Table.Cell>
                        <Table.Cell>{el.count}</Table.Cell>
                        <Table.Cell>
                          <ToggleSwitchCheck
                            id={showJobDetailsData.id}
                            state={showJobDetailsDataAPI.status}
                          />
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
                </Table.Body>
              </Table>
            </div>
          )}
        </CustomModal>
      )}
      <CustomModal
        isOpen={openEditDepartments}
        titleModal={`التعديل علي قسم الـ '${EditDepartmentsData.title}'`}
        handleOpen={() => {
          setopenEditDepartments(false);
        }}
      >
        <h1>{EditDepartmentsData.title}</h1>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ handleSubmit, errors, touched, setFieldValue }) => (
            <Form>
              <div className="all-forms-grid grid-cards-2">
                <div className="input-one-details">
                  <InputField
                    isShowLabel={true}
                    label={"إسم القسم باللغة العربية"}
                    name={"ar.title"}
                    type={"text"}
                    placeholder={"إسم القسم باللغة العربية"}
                    success
                    error={touched.ar?.title && errors.ar?.title}
                  />
                </div>
                <div className="input-one-details">
                  <InputField
                    isShowLabel={true}
                    label={"إسم القسم باللغة الإنجليزية"}
                    name={"en.title"}
                    type={"text"}
                    placeholder={"إسم القسم باللغة الإنجليزية"}
                    success
                    error={touched.en?.title && errors.en?.title}
                  />
                </div>

                <div className="input-one-details"> 
                  <Field name="manager_id">
                    {({ field }) => (
                      <EmployeeSelect
                        setFieldValue={setFieldValue}
                        field={field}
                        error={touched.manager_id && errors.manager_id}
                        labelText="المدير"
                      />
                    )}
                  </Field>
                </div>
              </div>

              <ButtonsFormSendCancel
                cancelAdd={cancelAdd}
                submitButton={() => handleSubmit()}
              />
            </Form>
          )}
        </Formik>
      </CustomModal>
    </>
  );
};

export default TableDepartments;
