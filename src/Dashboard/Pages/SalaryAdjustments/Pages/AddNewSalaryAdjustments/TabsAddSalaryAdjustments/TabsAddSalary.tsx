import Form from "./Form";
import { useTranslation } from "react-i18next";

const TabsAddSalary = () => {
    const { t } = useTranslation('salaryAdjustments');

    return (
        <div className="form-add-new-request border-width-content mt-5">
            {/* <h2 className="title-head-form text-font-dark pt-3">{t('addNewTitle')}</h2> */}

            <div className="mt-5">
                <Form />
            </div>
        </div>
    );
};

export default TabsAddSalary;
