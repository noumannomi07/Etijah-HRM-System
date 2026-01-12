import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastContainerApp = () => {
    return (
        <>
            <div className="toast-One">
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={true}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                    className="toast-container-app"
                    style={{ zIndex: 9999995454999 }}
                />
            </div>
        </>
    );
};

export default ToastContainerApp;
