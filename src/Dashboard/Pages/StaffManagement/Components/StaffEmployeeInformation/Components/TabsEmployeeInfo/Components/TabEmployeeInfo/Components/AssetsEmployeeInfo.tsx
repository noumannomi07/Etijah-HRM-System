import DataTableTwo from "@/Dashboard/Shared/DataTableInfo/DataTableTwo";
import DownloadImagePdf from "@/Dashboard/Shared/DownloadImagePdf/DownloadImagePdf";
import {
  useCreateEmployeeAsset,
  useEmployeeAssets
} from "@/hooks/employee/manage/assets";
import React, { useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomModal from "@/Dashboard/Shared/CustomModal/CustomModal";
import CustomFileUploader from "@/Dashboard/Shared/FileUploader/CustomFileUploader";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import SpinnerLoader from "@/Dashboard/Shared/SpinnerLoader/SpinnerLoader";
import DatePickerComponent from "@/Dashboard/Shared/DatePickerComponent/DatePickerComponent";
import { FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import ControlledInput from "@/Dashboard/Shared/Forms/ControlledInput";
import { formatDateToYmd } from "@/utils/date";
import { useTranslation } from "react-i18next";
import ActionData from "@/Dashboard/Shared/DataTableInfo/ActionData";
import TrashIcon from "@/Dashboard/Shared/DataTableInfo/Icons/TrashIcon";
import EditIcon from "@/Dashboard/Shared/DataTableInfo/Icons/EditIcon";
import axiosInstance from "@/utils/axios";

interface AssetFormValues {
  title: string;
  content: string;
  deliver_date: string;
  image: File | null;
}

const AssetsEmployeeInfo = () => {
  const { t } = useTranslation("staffManagement");
  const { id } = useParams<{ id: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<any | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // DELETE ASSET FUNCTION
  const deleteEmployeeAsset = async (employeeId: string, assetId: string) => {
    return axiosInstance.delete(`/employeeassets/${employeeId}/${assetId}`);
  };

  const getMenuItems = (asset: any) => {
    return [
      {
        id: 1,
        icon: <EditIcon />,
        label: t("common.edit"),
        onClick: () => {
          setSelectedAsset(asset);
          setIsModalOpen(true);
        }
      },
      {
        id: 2,
        icon: <TrashIcon />,
        label: t("common.delete"),
        onClick: async () => {
          if (!id) return;
          try {
            await deleteEmployeeAsset(id, asset.id);
            toast.success(t("messages.successDelete1"));
            refetchAssets();
          } catch (error) {
            toast.error(t("messages.errorDelete"));
          }
        }
      }
    ];
  };
  // FETCH EMPLOYEE ASSETS
  const {
    data: assets,
    isPending: isLoadingAssets,
    refetch: refetchAssets
  } = useEmployeeAssets();
  const validationSchema = Yup.object().shape({
    title: Yup.string().required(t("validation.required")),
    content: Yup.string().required(t("validation.required")),
    deliver_date: Yup.string().required(t("validation.required")),
    image: Yup.mixed().when([], {
      is: () => !selectedAsset,
      then: (schema) => schema.required(t("validation.required")),
      otherwise: (schema) => schema.nullable()
    })
  });
  // CREATE ASSET FUNCTION
  const { mutate: createAsset, isPending: isCreating } = useCreateEmployeeAsset(
    {
      onSuccess: () => {
        setIsModalOpen(false);
        setSelectedAsset(null);
        formik.resetForm();
        toast.success(t("messages.successAdd"));
        refetchAssets();
      },
      onError: (error) => {
        console.error("Error creating asset:", error);
        toast.error(t("messages.error"));
      }
    }
  );

  const formik = useFormik<AssetFormValues>({
    enableReinitialize: true,
    initialValues: {
      title: selectedAsset?.title || "",
      content: selectedAsset?.content || "",
      deliver_date: selectedAsset?.deliver_date || formatDateToYmd(new Date()),
      image: null
    },
    validationSchema,
    onSubmit: async (values) => {
      if (!id) {
        toast.error(t("assets.employeeIdNotAvailable"));
        return;
      }

      // IF SELECTED ASSET EXISTS, UPDATE IT
      if (selectedAsset) {
        setIsUpdating(true);
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("content", values.content);
        formData.append("deliver_date", values.deliver_date);

        // CHECK TO ADD IMAGE IF UPLOAD NEW IMAGW
        if (values.image) {
          formData.append("image", values.image);
        }

        try {
          // SEND POST REQUEST TO UPDATE ASSET
          await axiosInstance.post(
            `/employeeassets/${id}/${selectedAsset.id}`,
            formData,
            {
              headers: { "Content-Type": "multipart/form-data" }
            }
          );
          toast.success(t("messages.successEdit"));
          setIsModalOpen(false);
          setSelectedAsset(null);
          formik.resetForm();
          refetchAssets();
        } catch (error) {
          toast.error(t("messages.error"));
        } finally {
          setIsUpdating(false);
        }
      } else {
        // ADD NEW ASSET
        createAsset({
          id,
          title: values.title,
          content: values.content,
          deliver_date: values.deliver_date,
          image: values.image!
        });
      }
    }
  });

  const theadTrContent = [
    t("assets.assetName"),
    t("assets.description"),
    t("assets.deliveryDate"),
    t("assets.assetImage"),
    ""
  ];

  const tbodyContent = (assets ?? []).map((asset) => [
    asset.title,
    asset.content,
    asset.deliver_date,
    asset.image ? (
      <div key={asset.id} className="text-right">
        <DownloadImagePdf
          image={asset.image}
          typeImage={""}
          timeNow={""}
          newClassName={"justify-center items-start gap-0"}
        />
      </div>
    ) : (
      "-"
    ),
    <ActionData menuItems={getMenuItems(asset)} key={asset.id} />
  ]);

  if (!id) {
    return null;
  }
  const isSubmitting = isCreating || isUpdating;
  return (
    <div className="all-data-info-assets">
      <div className="flex justify-end mb-4 ">
        <button
          type="button"
          onClick={() => {
            setSelectedAsset(null);
            setIsModalOpen(true);
          }}
          className="btn-main height--50"
        >
          {t("assets.addNewAsset")} <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>

      <CustomModal
        isOpen={isModalOpen}
        handleOpen={() => {
          setIsModalOpen(!isModalOpen);
          if (isModalOpen) {
            setSelectedAsset(null);
            formik.resetForm();
          }
        }}
        titleModal={
          selectedAsset ? t("assets.editAsset") : t("assets.addNewAsset")
        }
        classBodyContent="!p-0"
      >
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-col">
              <div className="p-6 space-y-6">
                <ControlledInput<AssetFormValues>
                  fieldName="title"
                  label={t("assets.assetName")}
                  placeholder={t("assets.enterAssetName")}
                />

                <ControlledInput<AssetFormValues>
                  fieldName="content"
                  label={t("assets.description")}
                  placeholder={t("assets.enterAssetDescription")}
                />

                <div className="input-one-details">
                  <DatePickerComponent
                    label={t("assets.deliveryDate")}
                    addTextPlaceHolder="--/--/--"
                    onDateChange={(date) =>
                      formik.setFieldValue("deliver_date", date)
                    }
                  />
                </div>

                <div className="input-one-details">
                  <label className="block text-[15px] font-medium text-font-gray mb-2">
                    {t("assets.assetImage")}
                  </label>
                  <CustomFileUploader
                    textLabel=""
                    name="image"
                    dragDropText={t("assets.dragDropText")}
                    onFileSelect={(file: File) => {
                      formik.setFieldValue("image", file);
                    }}
                  />
                  {formik.touched.image && formik.errors.image && (
                    <div className="error-text">
                      {String(formik.errors.image)}
                    </div>
                  )}
                  {selectedAsset &&
                    selectedAsset.image &&
                    !formik.values.image && (
                      <div className="mt-4 ">
                        <img
                          src={selectedAsset.image}
                          alt="image"
                          className="w-24 h-24 object-cover rounded"
                        />
                      </div>
                    )}

                  {formik.values.image && (
                    <div className="mt-4">
                      <img
                        src={URL.createObjectURL(formik.values.image)}
                        alt="preview"
                        className="w-24 h-24 object-cover rounded"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-between gap-2 p-4 mt-4 border-t">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setSelectedAsset(null);
                  }}
                  className="btn-secondary height--50 !min-w-[120px]"
                  disabled={isSubmitting}
                >
                  {t("common.cancel")}
                </button>
                <button
                  type="submit"
                  className="btn-main height--50 !min-w-[120px]"
                  disabled={!formik.isValid || !formik.dirty || isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <SpinnerLoader />
                      {t("common.saving")}
                    </div>
                  ) : (
                    t("common.save")
                  )}
                </button>
              </div>
            </div>
          </form>
        </FormikProvider>
      </CustomModal>

      <DataTableTwo
        isLoading={isLoadingAssets}
        theadContent={theadTrContent}
        tbodyContent={tbodyContent}
        withCheckboxes={false}
        isShowContentFilterInfo={false}
        isShowModalButtonFilter={false}
        functionButtonFilter={() => {}}
        isTrueButtonsModalContentRight={false}
        functionButtonModalOne={() => {}}
        textContentButtonOne=""
        isTrueButtonTwoModalContent={false}
        functionModalButtonTwo={() => {}}
        textContetButtonTwo=""
        newClassButtonTwo=""
        showDateFilter={false}
        onChangeDateFilter={() => {}}
      />
    </div>
  );
};

export default AssetsEmployeeInfo;
