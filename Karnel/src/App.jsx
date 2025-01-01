import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './component/auth/Login';
import Register from './component/auth/Register';
import VerifyEmail from './component/auth/VerifyEmail';
import ResetPassWord from "./component/auth/ResetPassWord";
import RequestResetPassword from "./component/auth/RequestResetPassword";

function App() {
  
  return (
    <BrowserRouter>
    <ToastContainer />
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/reset-password" element={<ResetPassWord />} />
        <Route path="/request-reset-password" element={<RequestResetPassword />} />
        

    </Routes>
</BrowserRouter>
  )
}

export default App
