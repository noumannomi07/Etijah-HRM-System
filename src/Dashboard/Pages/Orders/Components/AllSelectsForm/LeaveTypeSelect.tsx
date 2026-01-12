import SelectBox from "@/Dashboard/Shared/SelectBox/SelectBox";
import { useLeaveManagement } from "@/hooks/api/system-settings";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const LeaveTypeSelect = ({ setFieldValue, field, error }) => {
    const { queryAll } = useLeaveManagement();
    const {t} =useTranslation("orders")

    return (
        <SelectBox
            isShowLabel={true}
            label={t("permissionRequests.details.permissionType")}
            options={queryAll?.data?.map((item: any) => ({
                value: item.id,
                label: item.title,
            }))}
            onChange={(option) => setFieldValue("leaveType", option)}
            placeholder="-إختر-"
            isSearchable={false}
            isMulti={false}
            field={field}
            error={error}
        />
    );
};

LeaveTypeSelect.propTypes = {
    setFieldValue: PropTypes.func.isRequired,
    field: PropTypes.object.isRequired,
    error: PropTypes.string,
};

export default LeaveTypeSelect;
