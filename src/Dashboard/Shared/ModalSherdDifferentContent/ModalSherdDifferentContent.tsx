import PropTypes from "prop-types";
import { useState } from "react";
import CustomModal from "../CustomModal/CustomModal";
import SpinnerLoader from "../SpinnerLoader/SpinnerLoader";

const ModalSherdDifferentContent = ({
    openModalDifferentContent,
    hiddenModalDifferentContent,
    iconTop,
    titleModal,
    textModal,
    newBgButtonColorClass,
    textButtonOne,
    functionButtonOne: functionButtonOneProp,
}) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleButtonClick = async () => {
        setIsLoading(true); // ADD TRUE FOR LOADER

        // ADD TIME TO SHW LOADER
        try {
            await functionButtonOneProp(); // FUNCTION SEND
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false); // STOP LOADER AFTER SUCCESS CLIKED
        }
    };

    // REMOVE SETIME OUT AFTER WORK

    return (
        <CustomModal
            newClassModal={"modal-delete small-modal"}
            isOpen={openModalDifferentContent}
            handleOpen={hiddenModalDifferentContent}
            titleModal={<>{iconTop}</>}
            classBodyContent={""}
        >
            <div className="content-delete-modal">
                <h2 className="title text-font-dark text-[17px] sm:text-[20px]">
                    {titleModal}
                </h2>
                <p className="text text-font-gray text-[15px] sm:text-[17px] pt-2">
                    {textModal}
                </p>
                <div className="all-buttons-modal-bottom item-center-flex justify-end w-full mt-5">
                    <button
                        onClick={handleButtonClick}
                        className={`btn-main height--50 w-full sm:w-auto ${newBgButtonColorClass}`}
                        disabled={isLoading}
                    >
                        {isLoading ? <SpinnerLoader /> : textButtonOne}
                    </button>
                    <button
                        onClick={hiddenModalDifferentContent}
                        className="button-transparent height--50 w-full sm:w-auto"
                    >
                        لا , رجوع
                    </button>
                </div>
            </div>
        </CustomModal>
    );
};

ModalSherdDifferentContent.propTypes = {
    openModalDifferentContent: PropTypes.bool.isRequired,
    hiddenModalDifferentContent: PropTypes.func.isRequired,
    iconTop: PropTypes.node.isRequired,
    titleModal: PropTypes.string.isRequired,
    textModal: PropTypes.string.isRequired,
    newBgButtonColorClass: PropTypes.string.isRequired,
    textButtonOne: PropTypes.string.isRequired,
    functionButtonOne: PropTypes.func.isRequired,
};

export default ModalSherdDifferentContent;
