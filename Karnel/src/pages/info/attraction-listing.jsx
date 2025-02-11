import {useParams} from "react-router";
import AttractionCard from "@/components/info/attraction-card.jsx";
import {useEffect, useState} from "react";
import PaginationNav from "@/components/ui/pagination-nav.jsx";
import attractionApi from "@/services/AttractionService.js";
import {useSearchParams} from "react-router-dom";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage, BreadcrumbSeparator
} from "@/components/ui/breadcrumb.jsx";

export default function AttractionListing() {
    const [attractions, setAttractions] = useState([]);
    let {cityName} = useParams();
    let [searchParams] = useSearchParams();
    useEffect(() => {
        attractionApi.getAttractionsByCity(cityName, searchParams).then((data) => setAttractions(data));
        console.log(attractions)
    }, [cityName, searchParams]);
    return (
        <section className="container mx-auto py-8">
            {/*  Breadcrumb  */}
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/attractions">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{cityName}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            {/*  Title  */}
            <div className="py-4">
                <h2>Top Attractions in {cityName}</h2>
                <span className="text-gray-500">Explore top attractions in {cityName}</span>
            </div>

            {/*  Attractions Listing*/}
            <div className="grid grid-cols-4 gap-5 pb-12">
                {attractions && attractions.map((attraction, index) => {
                    return (
                        <AttractionCard key={index} attraction={attraction}/>
                    )
                })}
            </div>

            {/*<PaginationNav count={5} />*/}
        </section>
    )
}