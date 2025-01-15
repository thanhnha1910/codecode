import {useEffect, useState} from "react";
import tourApi from "@/services/TourService.js";
import TourPackage from "@/components/home/tour-package.jsx";

export default function PackageSection() {
    const [tours, setTours] = useState([]);
    useEffect(() => {
        const fetchTours = async () => {
            try {
                const data = await tourApi.getTopTours();
                setTours(data);
            } catch (error) {
                console.error('Error fetching tours:', error);
            }
        }

        fetchTours();
    }, []);
    return (
        <section className="container mx-auto py-12">
            <div className="animate-in fade-in slide-in-from-bottom duration-800">
                <h1 className="text-center mb-5">Awesome Packages</h1>
            </div>

            <div className="grid grid-cols-4 gap-x-4 gap-y-5">
                {tours && tours.map((tour) => (
                    <TourPackage key={tour.tourId} tourPackage={tour}/>
                ))}
            </div>
        </section>
)
}