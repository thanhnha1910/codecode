import {
    Breadcrumb,
    BreadcrumbItem, BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb.jsx";
import {useEffect, useState} from "react";
import {useParams} from "react-router";
import {useSearchParams} from "react-router-dom";
import restaurantApi from "@/services/RestaurantService.js";
import PaginationNav from "@/components/ui/pagination-nav.jsx";
import RestaurantCard from "@/components/info/restaurant-card.jsx";

export default function RestaurantListing() {
    const [restaurants, setRestaurants] = useState([]);
    let {cityName} = useParams();
    let [searchParams] = useSearchParams();
    useEffect(() => {
        restaurantApi.getRestaurantsByCity(cityName, searchParams).then((data) => setRestaurants(data));
    }, [cityName, searchParams]);
    return (
        <section className="container mx-auto py-8">
            {/*  Breadcrumb  */}
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/restaurants">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{cityName}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            {/*  Title  */}
            <div className="py-4">
                <h2>Top Restaurants in {cityName}</h2>
                <span className="text-gray-500">Explore top restaurants in {cityName}</span>
            </div>

            {/*  Restaurants Listing*/}
            <div className="grid grid-cols-4 gap-5 pb-12">
                {restaurants && restaurants.map((restaurant) => (
                    <RestaurantCard key={restaurant.position} restaurant={restaurant} />
                ))}
            </div>

            {/*<PaginationNav count={5} />*/}
        </section>
    )
}