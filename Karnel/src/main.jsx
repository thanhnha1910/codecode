import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import "./index.css";
import {ToastContainer} from "react-toastify";
import Register from "./pages/auth/Register.jsx";
import VerifyEmail from "./pages/auth/VerifyEmail.jsx";
import RequestResetPassword from "./pages/auth/RequestResetPassword.jsx";
import HomeLayout from "./layouts/home-layout.jsx";
import Home from "./pages/home/home.jsx";
import Search from "./pages/tour/search.jsx";
import About from "./pages/home/about.jsx";
import Contact from "./pages/home/contact.jsx";
import "react-toastify/dist/ReactToastify.css";
import {UserProvider} from "@/contexts/UserProvider.jsx";
import Login from "./pages/auth/Login.jsx";
import Profile from "./pages/personal/profile.jsx";
import ProtectedRoute from "@/contexts/ProtectedRoute.jsx";
import InfoLayout from "./layouts/info-layout.jsx";
import Hotel from "./pages/info/hotel.jsx";
import StatisticsPage from "@/admin/StatisticsPage.jsx";
import TourDetail from "@/pages/tour/tour-detail.jsx";
import TourLayout from "@/layouts/tour-layout.jsx";
import ScrollToTop from "@/components/ui/scroll-to-top.jsx";
import AdminLayout from "@/admin/AdminLayout.jsx";
import TourCard from "@/components/info/tour-card.jsx";
import Payment from "./pages/BookPay/Payment";
import SuccessPage from "./pages/BookPay/SuccessPage";
import FailurePage from "./pages/BookPay/FailurePage";
import PaymentConfirmation from "./pages/BookPay/PaymentConfirmation";
import ResetPass from "./pages/auth/ResetPass";
import Book from "./pages/BookPay/Book";
import { FavoritesProvider } from "./contexts/FavoritesProvider";
import PassengerForms from "./pages/BookPay/PassengerForms";
import BookingList from "./pages/personal/BookingList";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <UserProvider>
          <FavoritesProvider>
            <BrowserRouter>
                <ToastContainer/>
                <ScrollToTop />
                <Routes>
                    <Route element={<HomeLayout/>}>
                        <Route index element={<Home/>}/>
                        <Route path="search" element={<Search/>}/>
                        <Route path="about" element={<About/>}/>
                        <Route path="contact" element={<Contact/>}/>
                        <Route path="/info">
                            <Route element={<InfoLayout/>}>
                                <Route path="hotels" element={<Hotel/>}/>
                            </Route>
                        </Route>
                    </Route>
                    <Route path="tours" element={<TourLayout />}>
                        <Route path=":tourId" element={<TourDetail />}/>
                    </Route>
                    <Route path="test" element={<TourCard />}/>

                    <Route path="login" element={<Login/>}/>
                    <Route path="register" element={<Register/>}/>
                    <Route
                        path="profile"
                        element={
                            <ProtectedRoute>
                                <Profile/>
                            </ProtectedRoute>
                        }
                    />
                    <Route path="verify-email" element={<VerifyEmail/>}/>
                    <Route path="reset-password" element={<ResetPass/>}/>
                    <Route
                        path="request-reset-password"
                        element={<RequestResetPassword/>}
                    />
                    <Route path="admin" element={<AdminLayout />}>
                        <Route path="stats" element={<StatisticsPage/>}/>
                    </Route>
                    <Route path="/book" element={<Book />} />
                    <Route path="/payment" element={<Payment />} />
  <Route path="/success" element={<SuccessPage />} />
  <Route path="/failure" element={<FailurePage />} />
  <Route path="/payment-confirmation" element={<PaymentConfirmation />} />
  <Route path="/passenger-info" element={<PassengerForms />} />
  <Route path="/Booklist" element={<BookingList />} />




                </Routes>
            </BrowserRouter>
            </FavoritesProvider>
        </UserProvider>
    </React.StrictMode>
);
