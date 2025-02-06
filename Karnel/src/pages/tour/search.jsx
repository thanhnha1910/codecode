import tourApi from "@/services/TourService.js";
import {useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import PaginationNav from "@/components/ui/pagination-nav.jsx";
import TourCard from "@/components/info/tour-card.jsx";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.jsx";
import {Label} from "@/components/ui/label.jsx";
import {MenuItem, Rating, Select} from "@mui/material";
import RangeSlider from "@/components/ui/range-slider.jsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.jsx";
import {PaginationEllipsis} from "@/components/ui/pagination.jsx";
import {Button} from "@/components/ui/button.jsx";

const sortOptions = [
    {value: "rating-high-to-low", label: "Rating: Highest rated first"},
    {value: "rating-low-to-high", label: "Rating: Lowest rated first"},
    {value: "price-high-to-low", label: "Price: Highest to lowest"},
    {value: "price-low-to-high", label: "Price: Lowest to highest"},
    {value: "duration-high-to-low", label: "Duration: Longest first"},
    {value: "duration-low-to-high", label: "Duration: Shortest first"},
]

export default function Search() {
    const [tours, setTours] = useState([]);
    const [count, setCount] = useState(0);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const onRatingChange = (value) => {
        searchParams.set("minRating", value);
        navigate({
            search: searchParams.toString(),
        });
    }

    const onSortChange = (event) => {
        searchParams.set("sort", event.target.value);
        navigate({
            search: searchParams.toString(),
        });
    }

    useEffect(() => {
        const fetchTours = async () => {
            try {
                const data = await tourApi.getTours(searchParams);
                setTours(data.tours);
                setCount(Math.ceil(data.total / 10));
            } catch (error) {
                console.error('Error fetching tours:', error);
            }
        }

        fetchTours();
    }, [searchParams]);

    return (
        <section className="container mx-auto py-12">
            <div className="flex gap-10">
                {/* Filter */}
                <div className="w-1/4 rounded-lg p-4 flex flex-col gap-4">
                    <Select variant="outlined" size="small" onChange={onSortChange} label="Sort" className="">
                        {sortOptions.map((option, index) => (
                            <MenuItem key={index} value={option.value}>{option.label}</MenuItem>
                        ))}
                    </Select>

                    <div>
                        <h4 className="font-bold">Duration</h4>
                        <RangeSlider category="Duration" min={1} max={21}/>
                    </div>

                    <div className="space-y-2">
                        <h4 className="font-bold">Price</h4>
                        <RangeSlider category="Price" min={0} max={1000}/>
                    </div>

                    <div className="space-y-2">
                        <h4 className="font-bold">Rating</h4>
                        <RadioGroup onValueChange={onRatingChange}>
                            {[5, 4, 3].map((rating, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <RadioGroupItem value={rating} id={`rating-${rating}`}/>
                                    <Label htmlFor={`rating-${rating}`}>
                                        {rating === 5 ? (
                                            <Rating classes={{iconFilled: "[&>svg]:fill-primary"}} defaultValue={rating}
                                                    readOnly/>
                                        ) : (
                                            <div className="flex items-center gap-1.5">
                                                <Rating classes={{iconFilled: "[&>svg]:fill-primary"}}
                                                        defaultValue={rating} readOnly/>
                                                <span className="mt-[4px]">& up</span>
                                            </div>
                                        )}
                                    </Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>
                </div>

                {/* Listing */}
                {tours ? (
                    <div className="w-3/4 flex flex-col gap-4">
                        {tours.map((tour => (
                            <TourCard key={tour.tourId} tour={tour} className=""/>
                        )))}
                        <PaginationNav count={count}/>
                    </div>) : (
                    <h3 className="text-center font-normal">There was an error getting the tours</h3>
                )}
            </div>
        </section>
    )
}