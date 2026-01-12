import { useState } from "react";
import PropTypes from "prop-types";
import "./HorizontalTabs.css";
import React from "react";

type TabData = {
    label: React.ReactNode;
    content: React.ReactNode;
};

type HorizontalTabsProps = {
    newClassName?: string;
    isBgTabButton?: boolean;
    tabsData: TabData[];
    onChangeTab?: (tab: TabData) => void;
};

const HorizontalTabs = (props: HorizontalTabsProps) => {
    const { isBgTabButton, newClassName, tabsData, onChangeTab } = props;
    const [activeTabIndex, setActiveTabIndex] = useState(
        props.activeTabIndex || 0
    );

    return (
        <>
            {/* =============== START ALL TABS ================= */}
            <div
                data-aos="fade-up"
                className={`all-tabs-horizontal ${newClassName} ${
                    isBgTabButton === true ? "tab-bg" : ""
                }`}
            >
                {/* ============= START TABS BUTTONS ================ */}
                <div className="tabs-buttons flex gap-y-[10px]  gap-x-[30px] border-b flex-wrap w-full">
                    {!props?.disabledTabs
                        ? tabsData.map((tab, idx) => {
                              return (
                                  <button
                                      type="button"
                                      key={idx}
                                      className={`button-tab-hor text-center justify-center flex items-center gap-2 py-1 border-b-[3px] shadow-none outline-none text-font-gray !text-[15px] rounded-[2px]  transition-colors duration-300 ${
                                          idx === activeTabIndex
                                              ? "active-bg border-primaryColor text-primaryColor"
                                              : "border-transparent hover:border-gray-200"
                                      }`}
                                      onClick={() => {
                                          onChangeTab?.(tab);
                                          setActiveTabIndex(idx);
                                      }}
                                  >
                                      {tab.label}
                                  </button>
                              );
                          })
                        : ""}
                </div>
                {/* ============= END TABS BUTTONS ================ */}

                {/* ================= START CONTENT TAB =================== */}
                <div className="content-tab-horizontal py-4">
                    {tabsData[activeTabIndex].content}
                </div>
                {/* ================= END CONTENT TAB =================== */}
            </div>
            {/* =============== END ALL TABS ================= */}
        </>
    );
};
HorizontalTabs.propTypes = {
    newClassName: PropTypes.string.isRequired,
    isBgTabButton: PropTypes.bool.isRequired,
    tabsData: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.element.isRequired,
            content: PropTypes.element.isRequired,
        })
    ).isRequired,
};

export default HorizontalTabs;
