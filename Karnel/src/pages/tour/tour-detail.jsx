import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.jsx";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion.jsx";
import { Separator } from "@/components/ui/separator.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Calendar, Heart, Info, StarIcon, User } from 'lucide-react'
import { useEffect, useState } from "react";
import tourApi from "@/services/TourService.js";
import { useParams } from "react-router";
import { Card, CardContent, CardHeader, CardImage, CardTitle } from "@/components/ui/card.jsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.jsx";
import moment from "moment";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel.jsx";
import TourPackage from "@/components/tour/tour-package.jsx";
import reviewApi from "@/services/ReviewService.js";
import { Rating } from "@mui/material";
import { Progress } from "@/components/ui/progress.jsx";
import Book from '../BookPay/Book';

const rateScale = [
    { star: 5, label: 'Excellent' },
    { star: 4, label: 'Good' },
    { star: 3, label: 'Average' },
    { star: 2, label: 'Poor' },
    { star: 1, label: 'Terrible' },
]

export default function TourDetail() {
    const [tour, setTour] = useState({});
    const [rateValue, setRateValue] = useState(0);
    const [max, setMax] = useState();
    const [recommended, setRecommended] = useState([]);
    const [reviews, setReviews] = useState([]);
    let { tourId } = useParams();
    

    function roundHalf(num) {
        return Math.floor(num * 2) / 2;
    }

    const findMax = (data) => {
        return data.reduce(function (prev, current) {
            return (prev && prev.count > current.count) ? prev : current
        })
    }

    useEffect(() => {
        const fetchTour = async () => {
            try {
                const data = await tourApi.getTourById(tourId);
                setTour(data);
                // setRateValue(roundHalf(data.reviews.averageRating));
                if (data && data.reviews) {
                    setRateValue(roundHalf(data.reviews.averageRating));
                }
            } catch (error) {
                console.error('Error fetching tours:', error);
            }
        }

        const fetchRecommended = async () => {
            let params = new URLSearchParams();
            try {
                const data = await tourApi.getTours(params);
                setRecommended(data.tours);
            } catch (error) {
                console.error('Error fetching tours:', error);
            }
        }

        const fetchReviews = async () => {
            try {
                const data = await reviewApi.getReviewsForTour(tourId);
                setReviews(data);
                setMax(findMax(data.ratings).count)
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        }

        fetchTour();
        fetchRecommended();
        fetchReviews();
    }, [tourId]);
    const safeJSONParse = (jsonString) => {
        try {
            return JSON.parse(jsonString);
        } catch (error) {
            console.error('Error parsing JSON:', error);
            return null;
        }
    };
    return (
        <section className="container mx-auto">
            {tour ? (
                <div>
                    {/* Header */}
                    <div className="flex justify-between py-12">
                        <div className="flex flex-col gap-6">
                            <h1>{tour.name}</h1>
                            <span className="text-lg font-semilight"><b>{tour.cityName} </b> &#183;
                                <b> {tour.duration}</b> days &#183; {tour.reviews &&
                                    <b>{tour.reviews.averageRating} <StarIcon
                                        className="fill-primary stroke-none inline-block mb-[6px]" />
                                    </b>} ({tour.reviews && tour.reviews.totalReviews} reviews)</span>
                        </div>
                        <div>
                            <Button variant="outline" className="rounded-3xl py-5">
                                <Heart /> Save
                            </Button>
                        </div>
                    </div>

                    <div className="flex gap-8">
                        {/* Main Content */}
                        <div className="w-2/3 flex flex-col gap-10">
                            <img src="/images/home/destination-1.jpg" alt="Tour Image"
                                className="rounded-lg max-h-[500px] object-cover w-full" />
                            <span className="text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aliquam architecto autem dolor dolorem doloribus earum et facilis officia rerum tempora veniam vitae, voluptas. Architecto corporis delectus deleniti minima soluta.</span>

                            <Separator className="" />

                            <Tabs defaultValue="attraction">
                                <TabsList>
                                    <TabsTrigger value="attraction">Attraction</TabsTrigger>
                                    <TabsTrigger value="restaurant">Restaurants</TabsTrigger>
                                    <TabsTrigger value="hotel">Hotels</TabsTrigger>
                                    <TabsTrigger value="hotel">Resort</TabsTrigger>

                                </TabsList>
                                <TabsContent value="attraction" className="pt-6">
                                    <Carousel opts={{ align: "start" }}>
                                        <CarouselContent className="-ml-6">
                                            {tour.attractions && tour.attractions.map((attraction, index) => (
                                                <CarouselItem key={index} className="basis-1/3 pl-6">
                                                    <Card
                                                        className="border-0 rounded-none shadow-none flex flex-col gap-3">
                                                        <CardImage src="/images/home/destination-2.jpg"
                                                            alt="Hotel Image"
                                                            className="object-cover min-h-[200px] rounded-lg" />
                                                        <CardHeader className="p-0">
                                                            <CardTitle>{attraction.name}</CardTitle>
                                                        </CardHeader>
                                                    </Card>
                                                </CarouselItem>
                                            ))}
                                        </CarouselContent>
                                        <CarouselPrevious className="left-3 z-10" />
                                        <CarouselNext className="right-3 z-10" />
                                    </Carousel>
                                </TabsContent>
                                <TabsContent value="restaurant" className="pt-6">
                                    <Carousel opts={{ align: "start" }}>
                                        <CarouselContent className="-ml-6">
                                            {tour.restaurants && tour.restaurants.map((attraction, index) => (
                                                <CarouselItem key={index} className="basis-1/3 pl-6">
                                                    <Card
                                                        className="border-0 rounded-none shadow-none flex flex-col gap-3">
                                                        <CardImage src="/images/home/destination-3.jpg"
                                                            alt="Hotel Image"
                                                            className="object-cover min-h-[200px] rounded-lg" />
                                                        <CardHeader className="p-0">
                                                            <CardTitle>{attraction.name}</CardTitle>
                                                        </CardHeader>
                                                    </Card>
                                                </CarouselItem>
                                            ))}
                                        </CarouselContent>
                                        <CarouselPrevious className="left-3 z-10" />
                                        <CarouselNext className="right-3 z-10" />
                                    </Carousel>
                                </TabsContent>
                                <TabsContent value="hotel" className="pt-6">
                                    <Card className="border-0 rounded-none shadow-none flex flex-col gap-3 w-1/3">
                                        <CardImage src="/images/home/destination-2.jpg" alt="Hotel Image"
                                            className="object-cover min-h-[200px] rounded-lg" />
                                        <CardHeader className="p-0">
                                            <CardTitle>{tour.hotel && tour.hotel.name}</CardTitle>
                                        </CardHeader>
                                    </Card>
                                </TabsContent>
                            </Tabs>

                            <Separator />

                            <div>
                                <h3 className="text-3xl pb-6">Itinerary</h3>
                                <Accordion type="single" collapsible>
                                    {tour.detail && (() => {
                                        const parsedDetail = safeJSONParse(tour.detail);
                                        if (!parsedDetail || !parsedDetail.itinerary) return null;

                                        return parsedDetail.itinerary.map((day, index) => (
                                            <AccordionItem
                                                key={index}
                                                value={`day-${index + 1}`}
                                                className="relative flex after:bg-gray-300 after:w-px after:h-full after:absolute after:top-0 after:left-[16px] after:content-[''] last:after:hidden"
                                            >
                                                <div className="z-10">
                                                    <div className="rounded-full bg-primary p-2">
                                                        <Info className="text-white" size={18} />
                                                    </div>
                                                </div>
                                                <div className="grow pt-1 pb-8 pl-4">
                                                    <AccordionTrigger className="text-lg pt-0">
                                                        <div>
                                                            <span className="text-muted-foreground pr-1">Day {index + 1}: </span>
                                                            {day.title || 'Itinerary'}
                                                        </div>
                                                    </AccordionTrigger>
                                                    <AccordionContent className="bg-white rounded-lg py-4 px-6 my-2 text-base">
                                                        {day.detail}
                                                    </AccordionContent>
                                                </div>
                                            </AccordionItem>
                                        ));
                                    })()}
                                </Accordion>
                            </div>
                        </div>

                        {/*  Sticky Sidebar  */}
                        <div className="sticky top-6 w-1/3">
  <div className="bg-white rounded-lg shadow-lg p-6">
  {console.log("Tour data being passed to Book:", tour)}
    {tour && <Book tour={tour} />}
  </div>
</div>
                    </div>

                    {/* Recommended */}
                    <div>
                        <h3 className="text-3xl pb-6">Recommended</h3>
                        <Carousel opts={{ align: "start" }}>
                            <CarouselContent className="-ml-6">
                                {recommended && recommended.map((recommend, index) => (
                                    <CarouselItem key={index} className="basis-1/4 pl-6">
                                        <TourPackage tourPackage={recommend} />
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="left-4 z-10 h-10 w-10 border-primary" />
                            <CarouselNext className="right-4 z-10 h-10 w-10 border-primary" />
                        </Carousel>
                    </div>

                    <div className="py-12">
                        <h3 className="text-3xl pb-12">Reviews</h3>
                        {(reviews && reviews.length !== 0) ? (
                            // Reviews
                            <div className="flex gap-6">
                                <div className="w-2/3">
                                    {reviews.reviews && reviews.reviews.map((review) => (
                                        <Card key={review.reviewId}
                                            className="rounded-none border-x-0 border-y-gray-300 shadow-none">
                                            <CardHeader className="flex">
                                                <CardTitle className="flex gap-3 items-center">
                                                    <Avatar className="h-12 w-12">
                                                        <AvatarImage src="/images/home/placeholder.svg" />
                                                        <AvatarFallback>JD</AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex flex-col gap-0.5 justify-between">
                                                        <h5 className="text-lg">{review.userName}</h5>
                                                        <span
                                                            className="font-light text-sm">{moment(review.reviewDate).format('MMMM Do, YYYY')}</span>
                                                    </div>
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent>{review.feedback}</CardContent>
                                        </Card>
                                    ))}
                                </div>

                                {tour.reviews && (
                                    <div className="w-1/3 flex flex-col">
                                        <div className="flex gap-2 pb-4">
                                            <span className="text-xl font-bold">{tour.reviews.averageRating}</span>
                                            <Rating classes={{ iconFilled: "[&>svg]:fill-primary" }} precision={0.5}
                                                value={rateValue} readOnly />
                                            <span className="text-gray-500 font-medium">{tour.reviews.totalReviews} reviews</span>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            {rateScale.map((scale, index) => (
                                                <div key={scale.star} className="flex gap-2 items-center">
                                                    <span className="text-sm min-w-[60px]">{scale.label}</span>
                                                    <Progress value={(reviews.ratings[index].count / max) * 100} />
                                                    <span>{reviews.ratings[index].count}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : <h2>No Reviews yet. Be the first to leave a review</h2>}
                    </div>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </section>
    )
}