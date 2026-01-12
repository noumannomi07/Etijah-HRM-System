import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";
import "./VerticalTabs.css"
type TabData = {
    label: string | React.ReactNode;
    value: string;
    desc: React.ReactNode;
    icon?: any;
};

type VerticalTabsProps = {
    tabsData: TabData[];
};

export function VerticalTabs({ tabsData }: VerticalTabsProps) {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const tab = searchParams.get("tab");

    const getTabFromQuery = () => {
        const params = new URLSearchParams(location.search);
        const tabFromUrl = params.get("tab");
        
        // Check if tab exists in current tabsData
        const tabExists = tabsData.some(t => t.value === tabFromUrl);
        
        // Return tab from URL if it exists, otherwise first tab
        return tabExists && tabFromUrl ? tabFromUrl : tabsData[0]?.value || "0";
    };

    const [activeTab, setActiveTab] = useState(getTabFromQuery);

    useEffect(() => {
        const newTab = getTabFromQuery();
        if (newTab !== activeTab) {
            setActiveTab(newTab);
        }
    }, [location.search, tabsData]);

    const handleTabChange = (value: string) => {
        setActiveTab(value);
        const params = new URLSearchParams(location.search);
        params.set("tab", value);
        navigate(`?${params.toString()}`, { replace: true });
    };

    const activeTabData = tabsData.find((tab) => tab.value === activeTab);

    return (
        <Tabs value={activeTab} orientation="vertical" className="custom-tabs">
            <TabsHeader
                data-aos="fade-left"
                className="w-64 all-tabs-buttons me-4 p-3 border-width-content gap-[10px] bg-lightColorWhite"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
            >
                {tabsData.map(({ label, value, icon }) => (
                    <Tab
                        key={value}
                        value={value}
                        onClick={() => handleTabChange(value)}
                        className={`tab-btn justify-start p-[12px] text-[15px] font-[600] !text-start ${activeTab === value ? "tab-active" : ""
              }`}
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                    >
                        <div className="title-tab item-center-flex">
                            {icon && <img src={icon} alt={typeof label === 'string' ? label : ''} className="mr-2" />}
                            {label}
                        </div>
                    </Tab>
                ))}
            </TabsHeader>

            <TabsBody
                data-aos="fade-right"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
            >
                {activeTabData && (
                    <TabPanel
                        key={activeTabData.value}
                        value={activeTabData.value}
                        className="tab-data p-[0_15px_0_0]"
                    >
                        {activeTabData.desc}
                    </TabPanel>
                )}
            </TabsBody>
        </Tabs>
    );
}

VerticalTabs.propTypes = {
    tabsData: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
            value: PropTypes.string.isRequired,
            desc: PropTypes.node.isRequired,
            icon: PropTypes.any,
        })
    ).isRequired,
};
