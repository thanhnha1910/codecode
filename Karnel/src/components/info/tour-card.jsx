import {Card, CardContent, CardDescription, CardHeader, CardImageCarousel, CardTitle} from "@/components/ui/card.jsx";
import {MapPin, Star, User} from "lucide-react"
import {NavLink} from "react-router";
import {Button} from "@/components/ui/button.jsx";

export default function TourCard({tour}) {
    return (
        <Card className="flex">
            <CardImageCarousel images={tour.images} url={`/tours/${tour.tourId}`} className="h-full min-w-[300px]"/>
            <CardHeader className="gap-4 flex-1">
                <CardTitle className="flex flex-col gap-2">
                    <NavLink to={`/tours/${tour.tourId}`} className="text-xl hover:underline w-fit h-full">{tour.name}</NavLink>
                    {tour.reviews === null ? (
                        <span className="mb-[2px]">No reviews yet</span>
                    ) : (
                        <span className="flex items-center gap-1 font-light">
                            <Star className="fill-primary stroke-none mb-[1px]"/>
                            <span className="font-bold">{tour.reviews.averageRating.toFixed(1)}</span>
                            ({tour.reviews.totalReviews} reviews)
                        </span>
                    )}
                </CardTitle>
                <CardDescription>{tour.description}</CardDescription>
                <div className="flex flex-col gap-2">
                    <span className="flex gap-1 text-sm"><MapPin size={20} /> {tour.cityName}</span>
                    <span className="flex gap-1 text-sm"><User size={20}/> {tour.availableSlots} People</span>
                </div>
            </CardHeader>
            <CardContent className="pt-6 flex flex-col gap-6">
                <div className="flex justify-between">
                    <div className="flex flex-col">
                        <span className="font-light">Duration</span>
                        <span className="font-bold">{tour.duration} days</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-light">From</span>
                        <span className="font-bold text-2xl">${tour.price}</span>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <Button asChild className="rounded-full py-5 px-7 text-sm font-bold">
                        <NavLink to={`/tours/${tour.tourId}`}>View Details</NavLink>
                    </Button>
                    <Button className="rounded-full py-5 px-7 text-sm font-bold" variant="secondary">Download Brochure</Button>
                </div>
            </CardContent>
        </Card>
    );
}