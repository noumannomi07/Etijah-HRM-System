import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import ButtonsFormSendCancel from "../../../../ReusablePageAddNewContent/ButtonsFormSendCancel/ButtonsFormSendCancel";
import EmployeeSelect from "../../../../AllSelectsForm/EmployeeSelect";
import CustomModal from "@/Dashboard/Shared/CustomModal/CustomModal";
import { Skeleton } from "@mui/material";
import { FullRoutes } from "@/Routes/routes";
import { useTranslation } from "react-i18next";
import axiosInstance from "@/utils/axios";
import SpinnerLoader from "@/Dashboard/Shared/SpinnerLoader/SpinnerLoader";
import endpoints from "@/api/endpoints";
import { queryClient } from "@/utils/queryClient";

// Define type for values
interface FormValues {
    employee_id: number | null;
}

// Define type for FormikHelpers
interface FormikHelpers {
    setTouched: (fields: Record<string, boolean>) => void;
    resetForm: () => void;
}

const TabRoundTripRefund = ({ employeeId }: { employeeId: number }) => {
    const { t } = useTranslation("orders");
    const [openModal, setOpenModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const initialValues: FormValues = {
        employee_id: employeeId,
    };

    const validationSchema = Yup.object({
        employee_id: Yup.number().required(t("validation.employeeRequired")),
    });

    const [employeeData, setEmployeeData] = useState(null);
    useEffect(() => {
        const fetch = async () => {
            try {
                const { data } = await axiosInstance(
                    endpoints.employee.manage.tickets.show(
                        employeeId.toString()
                    )
                );
                setEmployeeData(data?.data);
            } catch (error) {
                toast.error(t("toasts.error"));
            }
        };
        openModal && fetch();
    }, [openModal, employeeId]);

    const handleSubmit = ({ setTouched }: FormikHelpers) => {
        setTouched({
            employee_id: true,
        });
    };

    // NAVIGATE CANCEL
    const navigate = useNavigate();

    const cancelAdd = () => {
        toast.success(t("toasts.cancelSuccess"));
        navigate(FullRoutes.Dashboard.Orders.All);
    };

    const [isLoading, setIsLoading] = useState(false);
    const handleSubmitSend = async (employeeId: number) => {
        try {
            setIsLoading(true);
            axiosInstance
                .post("/ticketrequests", {
                    employee_id: employeeId,
                    has_tax: 0,
                    request_type: "refund",
                })
                .then((data) => {
                    queryClient.invalidateQueries({
                        queryKey: ["airline-tickets"],
                    });

                    toast.success(t("toasts.requestAddedSuccess"));
                    navigate(-1);
                })
                .catch((error) => {
                    toast.error(t("toasts.error"));
                })
                .finally(() => {
                    setIsLoading(false);
                });
        } catch (error) {}
    };

    return (
        <>
            {/* ================= START MAIN FORM NEW ================ */}

            <div className="main-form-new">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ setFieldValue, errors, touched }) => {
                        return (
                            <Form>
                                {/* ================ START ALL FORM GRID =============== */}
                                <div className="input-one-details">
                                    <Field name="employee_id">
                                        {({ field }: { field: any }) => {
                                            return (
                                                <EmployeeSelect
                                                    defaultEmployee={
                                                        +employeeId
                                                    }
                                                    isDisabled={true}
                                                    setFieldValue={(
                                                        name,
                                                        value
                                                    ) => {
                                                        setFieldValue(
                                                            name,
                                                            value
                                                        );
                                                        setSelectedEmployee(
                                                            value
                                                        ); // 🔹 Update state on selection
                                                    }}
                                                    field={field}
                                                    error={
                                                        touched.employee_id &&
                                                        (errors.employee_id as string)
                                                    }
                                                />
                                            );
                                        }}
                                    </Field>
                                </div>
                                {/* ================ END ALL FORM GRID =============== */}

                                <ButtonsFormSendCancel
                                    cancelAdd={cancelAdd}
                                    submitButton={() => setOpenModal(true)}
                                />
                            </Form>
                        );
                    }}
                </Formik>
                <CustomModal
                    isOpen={openModal}
                    handleOpen={() => setOpenModal(false)}
                    titleModal={t("airlineTicket.confirmRefundRequest")}
                >
                    <div style={{ fontSize: "18px" }}>
                        {t("airlineTicket.refundRequestText")}{" "}
                        {employeeData !== null ? (
                            <>
                                <span className="font-bold text-darkColor pr-1 pl-1">
                                    SAR {employeeData?.amount || 0}
                                </span>{" "}
                            </>
                        ) : (
                            <Skeleton
                                className=" d-inline-block"
                                variant="text"
                                width={20}
                                height={20}
                            />
                        )}
                        {t("airlineTicket.forEmployee")}{" "}
                        <span className="font-bold text-darkColor pr-1 pl-1">
                            {selectedEmployee === null ? (
                                <Skeleton
                                    variant="text"
                                    width={120}
                                    height={20}
                                />
                            ) : (
                                `${selectedEmployee?.name}`
                            )}
                        </span>
                    </div>
                    <div>
                        <div className="buttons-form item-center-flex mt-6 justify-end">
                            <button
                                type="button"
                                className="w-full sm:w-auto button-transparent hover:bg-redColor01 hover:border-redColor01 height--50"
                                onClick={() => setOpenModal(false)}
                            >
                                {isLoading ? (
                                    <SpinnerLoader />
                                ) : (
                                    t("buttons.cancel")
                                )}
                            </button>
                            <button
                                type="button"
                                disabled={isLoading}
                                className="w-full sm:w-auto btn-main height--50"
                                onClick={() =>
                                    handleSubmitSend(selectedEmployee?.value)
                                }
                            >
                                {isLoading ? (
                                    <SpinnerLoader />
                                ) : (
                                    t("buttons.confirm")
                                )}
                            </button>
                        </div>
                    </div>
                </CustomModal>
            </div>

            {/* ================= END MAIN FORM NEW ================ */}
        </>
    );
};

export default TabRoundTripRefund;
