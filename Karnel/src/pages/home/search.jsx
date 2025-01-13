import tourApi from "@/services/TourService.js";
import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";

export default function Search() {
    const [tours, setTours] = useState([]);
    const [searchParams] = useSearchParams();
    const fetchTours = async () => {
        try {
            if (searchParams.get("query") !== null) {
                const data = await tourApi.searchTours(searchParams.get("query"));
                setTours(data);
            } else {
                const data = await tourApi.getTours();
                setTours(data);
            }
        } catch (error) {
            console.error('Error fetching tours:', error);
        }
    }

    useEffect(() => {
        fetchTours();
    }, [tours]);

    return (
        <div className="flex flex-wrap justify-center mx-auto gap-4">
            {tours !== null && tours.map((tour) => (
                <div
                    className="max-w-sm w-full bg-white overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-2xl"
                    key={tour.tourId}>
                    <div className="relative">
                        <img className="w-full h-64 object-cover"
                             src="https://images.unsplash.com/photo-1540206395-68808572332f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                             alt="Nature scene"/>
                        <div
                            className="absolute top-0 right-0 bg-teal-500 text-white px-2 py-1 m-2 rounded-md text-sm font-semibold">
                            Featured
                        </div>
                    </div>
                    <div className="p-6">
                        <h2 className="text-2xl font-bold mb-2 text-gray-800">{tour.tourName}</h2>
                        <p className="text-gray-600 mb-4">{tour.description}</p>
                        <div className="flex items-center mb-4">
                            <svg className="h-5 w-5 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                </path>
                            </svg>
                            <span className="text-gray-600 ml-1">4.9 (128 reviews)</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-2xl font-bold text-gray-800">${tour.price}</span>
                            <button
                                className="px-4 py-2 bg-[#86B817] text-white font-semibold rounded-lg shadow-md hover:bg-[#628811] focus:outline-none focus:ring-2 focus:ring-[#ade633] focus:ring-opacity-75 transition duration-300 ease-in-out">
                                Book Now
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}