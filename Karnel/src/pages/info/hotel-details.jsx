import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList, BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb.jsx";
import {Rating} from "@mui/material";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel.jsx";
import {useEffect, useState} from "react";
import hotelApi from "@/services/HotelService.js";
import {useParams} from "react-router";
import {useSearchParams} from "react-router-dom";
import {Progress} from "@/components/ui/progress.jsx";
import {Card, CardContent, CardDescription, CardHeader, CardImage, CardTitle} from "@/components/ui/card.jsx";

export default function HotelDetails() {
    const [hotel, setHotel] = useState({});
    const hotelName = useParams().hotelName;
    const [searchParams] = useSearchParams();
    useEffect(() => {
        const fetchHotel = async () => {
            const data = await hotelApi.getHotelByName(hotelName, searchParams);
            setHotel(data);
        }

        fetchHotel();
    }, [hotelName, searchParams]);
    return (
        <>
            {hotel ? (
                <section className="container mx-auto py-8 space-y-3">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/hotels">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>{hotelName}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <h3 className="text-4xl">{hotel.name}</h3>
                    <div className="flex flex-col gap-3 pb-4">
                        <div className="flex gap-1.5 items-center">
                            <Rating classes={{iconFilled: "[&>svg]:fill-primary"}} value={hotel.overall_rating}
                                    precision={0.5}
                                    readOnly/>
                            <span className="mt-[5px] font-bold">&#183; {hotel.hotel_class}</span>
                        </div>
                        <div className="flex gap-1.5">
                            <span className="font-bold tracking-wider">Check In: {hotel.check_in_time}</span>
                            <span className="font-bold tracking-wider">&#183; Check Out: {hotel.check_out_time}</span>
                        </div>
                    </div>
                    <Carousel>
                        <CarouselContent>
                            {hotel.images && hotel.images.map((img, index) => (
                                <CarouselItem key={index}>
                                    <img src={img.thumbnail} alt={img.title}
                                         className="w-full object-cover max-h-[700px]"/>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-3 z-10"/>
                        <CarouselNext className="right-3 z-10"/>
                    </Carousel>
                    <div className="flex gap-8 pt-4">
                        {/*  Main  */}
                        <div className="w-2/3 flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <p>{hotel.description}</p>
                                <span><b>Website: </b><a href={hotel.link} className="underline">{hotel.link}</a></span>
                            </div>

                            <div className="space-y-3">
                                <h3>Nearby Places</h3>
                                <Carousel>
                                    <CarouselContent>
                                        {hotel.nearby_places && hotel.nearby_places.slice(0, 6).map((place, index) => (
                                            <CarouselItem key={index} className="basis-1/3">
                                                <Card>
                                                    <CardImage className="object-cover h-[200px]" src={place.thumbnail} alt={`Image of ${place.name}`} />
                                                    <CardHeader className="px-2 pb-2 grid grid-rows-6">
                                                        <CardTitle className="text-xl row-span-2">{place.name}</CardTitle>
                                                        <CardDescription className="flex flex-col gap-2 row-span-4">
                                                            <div className="flex gap-2 items-center">
                                                                <Rating classes={{iconFilled: "[&>svg]:fill-primary"}} size="small" precision={0.5} defaultValue={place.rating} readOnly />
                                                                <span>{place.reviews}</span>
                                                            </div>
                                                            <span className="text-foreground text-base">{place.description}</span>
                                                        </CardDescription>
                                                    </CardHeader>
                                                    <CardContent className="p-2">
                                                        {place.transportations.map((item, index) => (
                                                            <div key={index}>
                                                                <span className="font-bold">{item.type} - </span>
                                                                <span>{item.duration}</span>
                                                            </div>
                                                        ))}
                                                    </CardContent>
                                                </Card>
                                            </CarouselItem>
                                        ))}
                                    </CarouselContent>
                                    <CarouselPrevious className="left-3 z-10"/>
                                    <CarouselNext className="right-3 z-10"/>
                                </Carousel>
                            </div>
                        </div>

                        {/*  Sticky  */}
                        <div className="w-1/3 sticky top-0 space-y-2">
                            <h3>About</h3>
                            <div className="space-y-1">
                                {hotel.reviews_breakdown && hotel.reviews_breakdown.map((item, index) => (
                                    <div key={index} className="flex gap-1.5 items-center">
                                        <span className="min-w-[100px]">{item.name}</span>
                                        <Progress value={(item.positive / item.total_mentioned) * 100} />
                                        <span>{((item.positive / item.total_mentioned) * 100 / 20).toFixed(1)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>) : <h3>Loading...</h3>
            }
        </>
    )
}