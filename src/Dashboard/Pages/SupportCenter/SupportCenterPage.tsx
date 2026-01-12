import HelmetInfo from "@components/HelmetInfo/HelmetInfo";
import { withPermissions } from "@/hoc";
import SupportCenterMain from "./components/SupportCenterMain";

const SupportCenterPage = ({ permissions }: { permissions: any }) => {
    return (
        <>
            <HelmetInfo titlePage={"مركز الدعم"} />
            <div>
                    <SupportCenterMain permissions={permissions} />
                  </div>
        </>
    );
};

export default withPermissions(SupportCenterPage, "employees_setting");
