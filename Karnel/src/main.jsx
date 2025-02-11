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
import TourDetail from "@/pages/tour/tour-detail.jsx";
import TourLayout from "@/layouts/tour-layout.jsx";
import ScrollToTop from "@/components/ui/scroll-to-top.jsx";
import TourCard from "@/components/info/tour-card.jsx";
import Payment from "./pages/BookPay/Payment";
import SuccessPage from "./pages/BookPay/SuccessPage";
import FailurePage from "./pages/BookPay/FailurePage";
import PaymentConfirmation from "./pages/BookPay/PaymentConfirmation";
import ResetPass from "./pages/auth/ResetPass";
import Book from "./pages/BookPay/Book";
import {FavoritesProvider} from "./contexts/FavoritesProvider";
import PassengerForms from "./pages/BookPay/PassengerForms";
import BookingList from "./pages/personal/BookingList";
import AdminLayout from "@/admin/AdminLayout";
import Destination from "./pages/info/destination";
import AttractionListing from "./pages/info/attraction-listing";
import AttractionDetails from "./pages/info/attraction-details";
import HotelListing from "./pages/info/hotel-listing";
import HotelDetails from "./pages/info/hotel-details";
import ResortListing from "./pages/info/resort-listing";
import ResortDetails from "./pages/info/resort-details";
import RestaurantListing from "./pages/info/restaurant-listing";
import RestaurantDetails from "./pages/info/restaurant-details";

import Cities from "@/admin/Cities";
import Hotels from "@/admin/Hotels";
import Restaurants from "@/admin/Restaurants";
import Attractions from "@/admin/Attractions";
import Transportations from "@/admin/Transportations";
import Tours from "@/admin/Tours";
import TourAttraction from "@/admin/TourAttractions";
import TourRestaurant from "@/admin/TourRestaurants";
import HotelImages from "@/admin/HotelImages";
import RestaurantImages from "@/admin/RestaurantImages";
import AttractionImages from "@/admin/AttractionImages";
import TransportationImages from "@/admin/TransportationImages";
import AdminProtectedRoute from "@/contexts/AdminProtectedRoute";
import RevenueDashBoard from "./admin/RevenueDashboard";
<<<<<<< Updated upstream
import TourImages from "./admin/TourImages";
import CitiesImages from "./admin/CitiesImages";
import UserManagement from "./admin/UserManagement";
import TermsAndConditions from "./pages/tour/TermsAndConditions";

=======
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterMoment } from '@mui/x-date-pickers-pro/AdapterMoment'
>>>>>>> Stashed changes

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <LocalizationProvider dateAdapter={AdapterMoment}>
        <UserProvider>
            <FavoritesProvider>
                <BrowserRouter>
                    <ToastContainer/>
                    <ScrollToTop/>
                    <Routes>
                        <Route element={<HomeLayout/>}>
                            <Route index element={<Home/>}/>
                            <Route path="search" element={<Search/>}/>
                            <Route path="about" element={<About/>}/>
                            <Route path="contact" element={<Contact/>}/>
                        </Route>
                        <Route element={<TourLayout/>}>
                            <Route path="tours/:tourId" element={<TourDetail/>}/>
                            <Route path="attractions" element={<Destination/>}/>
                            <Route path="attractions/:cityName" element={<AttractionListing/>}/>
                            <Route path="attractions/:cityName/:attractionName" element={<AttractionDetails/>}/>

                            <Route path="hotels" element={<HotelListing/>}/>
                            <Route path="hotels/:hotelName" element={<HotelDetails />}/>

<<<<<<< Updated upstream
        {/* Detail routes */}
        <Route path="attractions/:cityName/:attractionName" element={<AttractionDetails />} />
        <Route path="hotels/:hotelName" element={<HotelDetails />} />
        <Route path="resorts/:resortName" element={<ResortDetails />} />
        <Route path="restaurants/:cityName/:restaurantName" element={<RestaurantDetails />} />
    </Route>
    <Route path="term" element={<TermsAndConditions />} />

</Route>

                    </Route>
                    <Route path="tours" element={<TourLayout />}>
                        <Route path=":tourId" element={<TourDetail />}/>
                    </Route>
                    <Route path="test" element={<TourCard />}/>
=======
                            <Route path="resorts" element={<ResortListing/>}/>
                            <Route path="resorts/:resortName" element={<ResortDetails />}/>
>>>>>>> Stashed changes

                            <Route path="restaurants" element={<Destination/>}/>
                            <Route path="restaurants/:cityName" element={<RestaurantListing/>}/>
                            <Route path="restaurants/:cityName/:restaurantName" element={<RestaurantDetails />}/>

                            <Route path="transportations" element={<Destination/>}/>
                        </Route>
                        <Route path="tours" element={<TourLayout/>}>
                            <Route path=":tourId" element={<TourDetail/>}/>
                        </Route>
                        <Route path="test" element={<TourCard/>}/>

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
                        {/* <Route path="admin" element={<AdminLayout />}>
                        <Route path="stats" element={<Staticpa/>}/>
                    </Route> */}
                        <Route path="/book" element={<Book/>}/>
                        <Route path="/payment" element={<Payment/>}/>
                        <Route path="/success" element={<SuccessPage/>}/>
                        <Route path="/failure" element={<FailurePage/>}/>
                        <Route path="/payment-confirmation" element={<PaymentConfirmation/>}/>
                        <Route path="/passenger-info" element={<PassengerForms/>}/>
                        <Route path="/Booklist" element={<BookingList/>}/>


                        <Route
                            path="/admin"
                            element={
                                <AdminProtectedRoute>
                                    <AdminLayout/>
                                </AdminProtectedRoute>
                            }
                        >

<<<<<<< Updated upstream
  <Route path="cities" element={<Cities />} />
  <Route path="hotels" element={<Hotels />} />
  <Route path="restaurants" element={<Restaurants />} />
  <Route path="attractions" element={<Attractions />} />
  <Route path="transportations" element={<Transportations />} />
  <Route path="tours" element={<Tours />} />
  <Route path="tourattraction" element={<TourAttraction />} />
  <Route path="tourrestaurant" element={<TourRestaurant />} />
  <Route path="revenue" element={<RevenueDashBoard />} />
  <Route path="user" element={<UserManagement />} />


  
  {/* Routes for image management */}
  <Route path="hotel-images/:id" element={<HotelImages />} />
  <Route path="restaurant-images/:id" element={<RestaurantImages />} />
  <Route path="attraction-images/:id" element={<AttractionImages />} />
  <Route path="transportation-images/:id" element={<TransportationImages />} />
  <Route path="tour-images/:id" element={<TourImages />} />
  <Route path="cities-images/:id" element={<CitiesImages />} />


</Route>
=======
                            <Route path="cities" element={<Cities/>}/>
                            <Route path="hotels" element={<Hotels/>}/>
                            <Route path="restaurants" element={<Restaurants/>}/>
                            <Route path="attractions" element={<Attractions/>}/>
                            <Route path="transportations" element={<Transportations/>}/>
                            <Route path="tours" element={<Tours/>}/>
                            <Route path="tourattraction" element={<TourAttraction/>}/>
                            <Route path="tourrestaurant" element={<TourRestaurant/>}/>
                            <Route path="revenue" element={<RevenueDashBoard/>}/>

>>>>>>> Stashed changes

                            {/* Routes for image management */}
                            <Route path="hotel-images/:id" element={<HotelImages/>}/>
                            <Route path="restaurant-images/:id" element={<RestaurantImages/>}/>
                            <Route path="attraction-images/:id" element={<AttractionImages/>}/>
                            <Route path="transportation-images/:id" element={<TransportationImages/>}/>
                        </Route>

                    </Routes>
                </BrowserRouter>
            </FavoritesProvider>
        </UserProvider>
        </LocalizationProvider>
    </React.StrictMode>
);
