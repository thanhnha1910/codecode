import DestinationCard from "@/components/info/destination-card.jsx";
import {useEffect, useState} from "react";
import cityApi from "@/services/CityService.js";
import {useLocation} from "react-router-dom";

export default function Destination() {
    const [destinations, setDestinations] = useState([]);
    let location = useLocation();
    const category = location.pathname;
    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                const data = await cityApi.getCities();
                setDestinations(data);
            } catch (error) {
                console.error('Error fetching tours:', error);
            }
        }

        fetchDestinations();
    }, []);
    return (
        <section className="container mx-auto py-12 flex flex-col gap-6">
            <div>
                <h2>Explore destinations around the world</h2>
                <span className="text-gray-500">Find things to do in cities around the world</span>
            </div>
            <div className="grid grid-cols-4 gap-5">
                {destinations && destinations.map((destination, index) => (
                    <DestinationCard key={index} destination={destination} type={category}/>
                ))}
            </div>
        </section>
    )
}