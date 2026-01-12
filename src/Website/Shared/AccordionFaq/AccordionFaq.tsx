import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const AccordionFaq = ({
  items,
  hideTitleHeaderAccordion,
  titleCardAccordion
}) => {
  const [openIndex, setOpenIndex] = useState(null); // THIS FOR INDEX OF ACCORDION ICLIKED
  const contentRefs = useRef([]); // THIS FOR THE ACCORDION I CLIKE TO GIVE SMOOTH OPEN AND CLOSE AND HEIGHT OF ACCORDION

  // TOGGLE OPEN AND CLOSE ACCORDION
  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // THIS TO OPEN ACCORFION HEIGHT OF CONTNET IN ACCORDION DISCRIPTION
  useEffect(() => {
    contentRefs.current.forEach((ref, index) => {
      if (ref) {
        ref.style.maxHeight =
          openIndex === index ? `${ref.scrollHeight}px` : "0px";
      }
    });
  }, [openIndex]);

  return (
    <>
      {!hideTitleHeaderAccordion && (
        <h2 className="title-accordion--1 text-font-dark text-[16px] sm:text-[20px] mb-3">
          {titleCardAccordion}
        </h2>
      )}
      {items.map((item, index) => {
        return (
          <>
            {" "}
            <div key={item.id || index} className="border-b border-slate-200">
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex justify-between items-center py-5 text-slate-800"
              >
                <span className="title-faq-accordion text-font-dark text-[14px] sm:text-[16px]">
                  {item.title}
                </span>
                <span className="text-slate-800 transition-transform duration-300">
                  {openIndex === index ? (
                    <FontAwesomeIcon icon={faMinus} className="w-4 h-4" />
                  ) : (
                    <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
                  )}
                </span>
              </button>
              <div
                ref={(el) => (contentRefs.current[index] = el)}
                className="overflow-hidden transition-all duration-500 ease-in-out"
                style={{
                  maxHeight:
                    openIndex === index
                      ? `${contentRefs.current[index]?.scrollHeight}px`
                      : "0px"
                }}
              >
                <div className="pb-5 text-font-gray text-[13px] sm:text-[15px]">
                  {item.content}
                </div>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
};

AccordionFaq.propTypes = {
  hideTitleHeaderAccordion: PropTypes.bool,
  titleCardAccordion: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired
    })
  ).isRequired
};

export default AccordionFaq;
