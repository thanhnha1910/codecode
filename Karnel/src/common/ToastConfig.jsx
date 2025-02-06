import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ToastConfig() {

    return (
        <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            limit={3}
        />
    );
}

export default ToastConfig; 