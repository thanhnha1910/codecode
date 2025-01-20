import {Outlet} from "react-router";
import NavigationBar from "@/components/home/nav-bar.jsx";
import Footer from "@/components/home/footer.jsx";
import HeroSection from "@/components/home/hero-section.jsx";
import {useLocation} from "react-router-dom";

export default function HomeLayout() {
    return (
        <div>
            <NavigationBar/>
            <HeroSection />
            <Outlet/>
            <Footer/>
        </div>
    );
}
