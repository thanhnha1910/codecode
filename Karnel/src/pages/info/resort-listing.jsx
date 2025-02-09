import {useEffect, useState} from "react";
import PaginationNav from "@/components/ui/pagination-nav.jsx";
import {useNavigate, useSearchParams} from "react-router-dom";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";
import resortApi from "@/services/ResortService.js";
import {DateRangePicker} from "@mui/x-date-pickers-pro";
import ResortCard from "@/components/info/resort-card.jsx";

export default function ResortListing() {
    const [resorts, setResorts] = useState([]);
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
        const fetchResorts = async () => {
            if (!searchParams.get("checkIn") || !searchParams.get("checkOut")) return;
            try {
                const data = await resortApi.getResorts(searchParams.toString());
                setResorts(data);
            } catch (error) {
                console.error('Error fetching resorts:', error);
            }
        }

        fetchResorts();
    }, [searchParams]);
    return (
        <section className="container mx-auto py-8">
            {/*  Title  */}
            <div className="py-4">
                <h2>Find your next stay</h2>
                <span className="text-gray-500">Explore top resorts</span>
            </div>

            <div className="flex gap-2 items-center">
                <Input type="text" placeholder="City Name" onChange={(e) => setCity(e.target.value)}/>
                <DateRangePicker localeText={{ start: 'Check-in', end: 'Check-out' }} onChange={(value) => setValue(value)} />
                <Button onClick={handleSearch}>Search</Button>
            </div>

            {/*  resorts Listing*/}
            <div className="grid grid-cols-4 gap-5 pb-12">
                {resorts && resorts.map((resort, index) => (
                    <ResortCard key={index} resort={resort}/>
                ))}
            </div>

            {/*<PaginationNav count={5} />*/}
        </section>
    )
}
