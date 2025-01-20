import tourApi from "@/services/TourService.js";
import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import TourPackage from "@/components/tour/tour-package.jsx";
import PaginationNav from "@/components/ui/pagination-nav.jsx";

export default function Search() {
    const [tours, setTours] = useState([]);
    const [count, setCount] = useState(0);
    const [searchParams] = useSearchParams();
    useEffect(() => {
        const fetchTours = async () => {
            try {
                const data = await tourApi.getTours(searchParams);
                const countData = await tourApi.getTourCount();
                setTours(data);
                setCount(Math.ceil(countData / 20));
            } catch (error) {
                console.error('Error fetching tours:', error);
            }
        }

        fetchTours();
    }, [tours, count, searchParams]);

    return (
        <section className="container mx-auto py-12">
            {tours ? (
                    <>
                        <div className="grid grid-cols-4 gap-x-4 gap-y-5">
                            {tours.map((tour) => (
                                <TourPackage key={tour.tourId} tourPackage={tour}/>
                            ))}
                        </div>
                        <div className="pt-12">
                            <PaginationNav count={count}/>
                        </div>
                    </>)
                : <h3 className="text-center font-normal">There was an error getting the tours</h3>
                }
        </section>
    )
}