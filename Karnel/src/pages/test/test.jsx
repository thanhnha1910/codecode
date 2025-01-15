import NavigationBar from "@/components/home/nav-bar.jsx";
import HeroSection from "@/components/home/hero-section.jsx";
import Footer from "@/components/home/footer.jsx";
import TourPackage from "@/components/home/tour-package.jsx";

const tourPackage = {
    tourId: 1,
    name: "Package 1",
    description: "Tempor erat elitr rebum clita dolor diam ipsum sit diam amet diam eos erat ipsum et lorem et sit sed stet lorem sit",
    detail: "Detail 1",
    price: 100,
    availableSlots: 30,
    startDate: "2023-08-01",
    endDate: "2023-08-15",
    cityName: "Paris",
    hotelName: "Hotel A",
}

export default function Test() {
    return (
        <div>
            <NavigationBar />
            <HeroSection />
            <div className="container mx-auto">
                <div className="grid grid-cols-4 gap-2">
                    <TourPackage tourPackage={tourPackage}/>
                    <TourPackage tourPackage={tourPackage}/>
                    <TourPackage tourPackage={tourPackage}/>
                    <TourPackage tourPackage={tourPackage}/>
                </div>
            </div>
        </div>
    )
}