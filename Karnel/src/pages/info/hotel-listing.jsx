import {useEffect, useState} from "react";
import PaginationNav from "@/components/ui/pagination-nav.jsx";
import {useNavigate, useSearchParams} from "react-router-dom";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";
import HotelCard from "@/components/info/hotel-card.jsx";
import hotelApi from "@/services/HotelService.js";
import {DateRangePicker} from "@mui/x-date-pickers-pro";

export default function HotelListing() {
    const [hotels, setHotels] = useState([]);
    const [searchParams] = useSearchParams();
    const [value, setValue] = useState([]);
    const [city, setCity] = useState("");
    const navigate = useNavigate();
    const handleSearch = () =>{
        searchParams.set("cityName", city);
        searchParams.set("checkIn", value[0].format("YYYY-MM-DD"));
        searchParams.set("checkOut", value[1].format("YYYY-MM-DD"));
        navigate({
            search: searchParams.toString(),
        })
    }
    useEffect(() => {
        const fetchHotels = async () => {
            if (!searchParams.get("checkIn") || !searchParams.get("checkOut")) return;
            try {
                const data = await hotelApi.getHotels(searchParams.toString());
                setHotels(data);
            } catch (error) {
                console.error('Error fetching hotels:', error);
            }
        }

        fetchHotels();
    }, [searchParams]);
    return (
        <section className="container mx-auto py-8 space-y-3">
            {/*  Title  */}
            <div className="py-4">
                <h2>Find your next stay</h2>
                <span className="text-gray-500">Explore top hotels</span>
            </div>

            <div className="flex gap-2 items-center">
                <Input type="text" placeholder="City Name" onChange={(e) => setCity(e.target.value)}/>
                <DateRangePicker localeText={{ start: 'Check-in', end: 'Check-out' }} onChange={(value) => setValue(value)} />
                <Button onClick={handleSearch}>Search</Button>
            </div>

            {/*  Hotels Listing*/}
            <div className="grid grid-cols-4 gap-5 pb-12">
                {hotels && hotels.map((hotel, index) => (
                    <HotelCard key={index} hotel={hotel}/>
                ))}
            </div>

            {/*<PaginationNav count={5} />*/}
        </section>
    )
}