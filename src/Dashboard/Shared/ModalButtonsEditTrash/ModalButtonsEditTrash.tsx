import TrashIcon from "../DataTableInfo/Icons/TrashIcon";
import PropTypes from "prop-types";
import EditIcon from "../DataTableInfo/Icons/EditIcon";
import EditIconModal from "@assets/Icons/EditIconModal.svg";
import { Link } from "react-router-dom";
const ModalButtonsEditTrash = ({
    openModalDeleteFunction,
    openModalEditFunction,
    routePageAdd,
    showEdit,
}) => {
    return (
        <div className="buttons-edit-trash item-center-flex">
            <button
                onClick={openModalDeleteFunction}
                className=" button-transparent hover:bg-transparent w-[45px] h-[45px] sm:w-[50px] sm:h-[50px] rounded-[8px] hover:border-redColor01"
            >
                <div>
                    <TrashIcon />
                </div>
            </button>
            {showEdit ? (
                <>
                    {routePageAdd ? (
                        <Link
                            to={routePageAdd}
                            className=" button-transparent hover:bg-transparent w-[45px] h-[45px] sm:w-[50px] sm:h-[50px] rounded-[8px] hover:border-primaryColor"
                        >
                            <div>
                                <img src={EditIconModal} alt="edit" />
                            </div>
                        </Link>
                    ) : (
                        <button
                            onClick={openModalEditFunction}
                            className=" button-transparent hover:bg-transparent w-[45px] h-[45px] sm:w-[50px] sm:h-[50px] rounded-[8px] "
                        >
                            <div>
                                <EditIcon />
                            </div>
                        </button>
                    )}
                </>
            ) : null}
        </div>
    );
};
ModalButtonsEditTrash.propTypes = {
    openModalDeleteFunction: PropTypes.func.isRequired,
    routePageAdd: PropTypes.string.isRequired,
};
export default ModalButtonsEditTrash;
