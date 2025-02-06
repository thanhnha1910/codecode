    import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.jsx";
    import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion.jsx";
    import {Separator} from "@/components/ui/separator.jsx";
    import {Button} from "@/components/ui/button.jsx";
    import {Calendar, Heart, Info, User} from 'lucide-react'
    import {useEffect, useState} from "react";
    import tourApi from "@/services/TourService.js";
    import {Card, CardContent, CardHeader, CardImage, CardTitle} from "@/components/ui/card.jsx";
    import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.jsx";
    import moment from "moment";
    import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel.jsx";
    import TourPackage from "@/components/tour/tour-package.jsx";
    import { useParams, useNavigate } from "react-router-dom";

    export default function TourDetail({ isBookingView = false }) {
        const [tour, setTour] = useState({});
        const [recommended, setRecommended] = useState([]);
        let {tourId} = useParams();
        const navigate = useNavigate();

    const handleBookNow = () => {
        navigate(`/book?tourId=${tour.tourId}`);
    };
        const dateDiff = (start, end) => {
            try {
                let startDate = Date.parse(start);
                let endDate = Date.parse(end);
                return Math.floor((Math.abs(endDate - startDate) / (1000 * 60 * 60 * 24)));
            } catch (error) {
                console.log(error);
            }
        }
        useEffect(() => {
            const fetchTour = async () => {
                if (!tourId) {
                    console.log("No tour ID provided");
                    return;
                }
                try {
                    const data = await tourApi.getTourById(tourId);
                    setTour(data);
                } catch (error) {
                    console.error('Error fetching tours:', error);
                }
            }

            const fetchRecommended = async () => {
                if (!isBookingView) {  // Chỉ fetch recommended khi không ở chế độ booking
                let params = new URLSearchParams();
                try {
                    const data = await tourApi.getTours(params);
                    setRecommended(data);
                } catch (error) {
                    console.error('Error fetching tours:', error);
                }
                }
            };

            fetchTour();
            fetchRecommended();
        }, [tourId]);
        if (isBookingView) {
        return (
            <section className="container mx-auto">
                {/* Header */}
                <div className="flex justify-between py-12">
                    <div className="flex flex-col gap-6">
                        <h1>{tour.name}</h1>
                        <span className="text-lg font-semilight"><b>{tour.cityName}</b> &#183; <b>{dateDiff(tour.startDate, tour.endDate)}</b> days &#183; <b>4.5</b> (50 reviews)</span>
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
                        <img src="/images/home/destination-1.jpg" alt="Tour Image" className="rounded-lg max-h-[500px] object-cover w-full" />
                        <span className="text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aliquam architecto autem dolor dolorem doloribus earum et facilis officia rerum tempora veniam vitae, voluptas. Architecto corporis delectus deleniti minima soluta.</span>

                        <Separator className=""/>

                        <Tabs defaultValue="attraction">
                            <TabsList>
                                <TabsTrigger value="attraction">Places</TabsTrigger>
                                <TabsTrigger value="restaurant">Restaurants</TabsTrigger>
                                <TabsTrigger value="hotel">Hotels</TabsTrigger>
                            </TabsList>
                            <TabsContent value="attraction" className="pt-6">
                                <Carousel opts={{ align: "start" }}>
                                    <CarouselContent className="-ml-6">
                                        {tour.attractions && tour.attractions.map((attraction, index) => (
                                            <CarouselItem key={index} className="basis-1/3 pl-6">
                                                <Card className="border-0 rounded-none shadow-none flex flex-col gap-3">
                                                    <CardImage src="/images/home/destination-2.jpg" alt="Hotel Image" className="object-cover min-h-[200px] rounded-lg" />
                                                    <CardHeader className="p-0">
                                                        <CardTitle>{attraction.name}</CardTitle>
                                                    </CardHeader>
                                                </Card>
                                            </CarouselItem>
                                        ))}
                                        <CarouselItem className="basis-1/3 pl-6">
                                            <Card className="border-0 rounded-none shadow-none flex flex-col gap-3">
                                                <CardImage src="/images/home/destination-2.jpg" alt="Hotel Image" className="object-cover min-h-[200px] rounded-lg" />
                                                <CardHeader className="p-0">
                                                    <CardTitle>Test Attraction</CardTitle>
                                                </CardHeader>
                                            </Card>
                                        </CarouselItem>
                                        <CarouselItem className="basis-1/3 pl-6">
                                            <Card className="border-0 rounded-none shadow-none flex flex-col gap-3">
                                                <CardImage src="/images/home/destination-2.jpg" alt="Hotel Image" className="object-cover min-h-[200px] rounded-lg" />
                                                <CardHeader className="p-0">
                                                    <CardTitle>Test Attraction 2</CardTitle>
                                                </CardHeader>
                                            </Card>
                                        </CarouselItem>
                                    </CarouselContent>
                                    <CarouselPrevious className="left-3 z-10" />
                                    <CarouselNext className="right-3 z-10"/>
                                </Carousel>
                            </TabsContent>
                            <TabsContent value="restaurant" className="pt-6">
                                <Carousel opts={{ align: "start" }}>
                                    <CarouselContent className="-ml-6">
                                        {tour.restaurants && tour.restaurants.map((attraction, index) => (
                                            <CarouselItem key={index} className="basis-1/3 pl-6">
                                                <Card className="border-0 rounded-none shadow-none flex flex-col gap-3">
                                                    <CardImage src="/images/home/destination-3.jpg" alt="Hotel Image" className="object-cover min-h-[200px] rounded-lg" />
                                                    <CardHeader className="p-0">
                                                        <CardTitle>{attraction.name}</CardTitle>
                                                    </CardHeader>
                                                </Card>
                                            </CarouselItem>
                                        ))}
                                        <CarouselItem className="basis-1/3 pl-6">
                                            <Card className="border-0 rounded-none shadow-none flex flex-col gap-3">
                                                <CardImage src="/images/home/destination-2.jpg" alt="Hotel Image" className="object-cover min-h-[200px] rounded-lg" />
                                                <CardHeader className="p-0">
                                                    <CardTitle>Test Attraction</CardTitle>
                                                </CardHeader>
                                            </Card>
                                        </CarouselItem>
                                        <CarouselItem className="basis-1/3 pl-6">
                                            <Card className="border-0 rounded-none shadow-none flex flex-col gap-3">
                                                <CardImage src="/images/home/destination-1.jpg" alt="Hotel Image" className="object-cover min-h-[200px] rounded-lg" />
                                                <CardHeader className="p-0">
                                                    <CardTitle>Test Attraction 2</CardTitle>
                                                </CardHeader>
                                            </Card>
                                        </CarouselItem>
                                    </CarouselContent>
                                    <CarouselPrevious className="left-3 z-10" />
                                    <CarouselNext className="right-3 z-10"/>
                                </Carousel>
                            </TabsContent>
                            <TabsContent value="hotel" className="pt-6">
                                <Card className="border-0 rounded-none shadow-none flex flex-col gap-3 w-1/3">
                                    <CardImage src="/images/home/destination-2.jpg" alt="Hotel Image" className="object-cover min-h-[200px] rounded-lg" />
                                    <CardHeader className="p-0">
                                        <CardTitle>{tour.hotel && tour.hotel.name}</CardTitle>
                                    </CardHeader>
                                </Card>
                            </TabsContent>
                        </Tabs>

                        <Separator />

                        <div>
                            <h3 className="text-3xl pb-6">Itinerary</h3>
                            {/*  Itinerary  */}
                            <Accordion type="single" collapsible>
                                {tour.detail && JSON.parse(tour.detail).map((day, index) => (
                                    <AccordionItem key={index} value={`day-${day.day}`} className="relative flex after:bg-gray-300 after:w-px after:h-full after:absolute after:top-0 after:left-[16px] after:content-[''] last:after:hidden">
                                        <div className="z-10">
                                            <div className="rounded-full bg-primary p-2">
                                                <Info className="text-white" size={18}/>
                                            </div>
                                        </div>
                                        <div className="grow pt-1 pb-8 pl-4">
                                            <AccordionTrigger className="text-lg pt-0">
                                                <div>
                                                    <span className="text-muted-foreground pr-1">Day {day.day}: </span>
                                                    {day.title}
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent className="bg-white rounded-lg py-4 px-6 my-2 text-base">
                                                {day.detail}
                                            </AccordionContent>
                                        </div>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    </div>

                    {/*  Sticky Sidebar  */}
                    <div className="sticky top-6 bottom-2 w-1/3 h-fit rounded-lg bg-white p-10 mb-10">
                        <h4 className="text-3xl py-4">$100 <span className="text-muted-foreground text-sm font-light ">/night</span></h4>
                        <div className="grid grid-cols-2 border-2 border-muted rounded-lg">
                            <div className="col-span-1 flex items-center gap-3 p-4">
                                <Calendar />
                                <div>
                                    <h5>Check In</h5>
                                    <span>01/01/2000</span>
                                </div>
                            </div>
                            <div className="col-span-1 flex items-center gap-3 p-4">
                                <Calendar />
                                <div>
                                    <h5>Check Out</h5>
                                    <span>05/01/2000</span>
                                </div>
                            </div>
                            <div className="col-span-2 flex items-center gap-3 p-4">
                                <User />
                                <div>
                                    <h5>Guests</h5>
                                    <span>Guests</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Similar */}
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
                        <CarouselNext className="right-4 z-10 h-10 w-10 border-primary"/>
                    </Carousel>
                </div>

                <div className="py-12">
                    <h3 className="text-3xl pb-12">Reviews</h3>
                    <div className="flex">
                        <div className="w-1/3">
                            Test
                        </div>

                        {/* Reviews */}
                        <div className="w-2/3">
                            {tour.reviews && tour.reviews.map((review) => (
                                <Card key={review.reviewId} className="rounded-none border-x-0 border-y-gray-200 shadow-none py-4">
                                    <CardHeader className="flex">
                                        <CardTitle className="flex gap-3 items-center">
                                            <Avatar className="border-primary border-2 h-12 w-12">
                                                <AvatarImage src="/images/home/placeholder.svg" />
                                                <AvatarFallback>JD</AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col gap-0.5 justify-between">
                                                <h5 className="text-lg">{review.userName}</h5>
                                                <span className="font-light text-sm">{moment(review.reviewDate).format('MMMM Do, YYYY')}</span>
                                            </div>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>{review.feedback}</CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        )
        }
        
        
    
    }