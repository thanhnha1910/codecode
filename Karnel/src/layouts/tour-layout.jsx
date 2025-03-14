import NavigationBar from "@/components/home/nav-bar.jsx";
import {Outlet} from "react-router";
import Footer from "@/components/home/footer.jsx";

export default function TourLayout() {
    return (
        <div>
            <NavigationBar/>
            <Outlet/>
            <Footer/>
        </div>
    );
}