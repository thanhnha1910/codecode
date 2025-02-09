import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel.jsx";
import {MenuItem, Rating, Select} from "@mui/material";
import {Card, CardDescription, CardHeader, CardImage, CardTitle} from "@/components/ui/card.jsx";
import {ChartContainer} from "@/components/ui/chart.jsx";
import {BarChart, Bar, CartesianGrid, XAxis} from "recharts";
import moment from "moment";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList, BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb.jsx";
import restaurantApi from "@/services/RestaurantService.js";

export default function RestaurantDetails() {
    const restaurantName = useParams().restaurantName;
    const cityName = useParams().cityName;
    const [restaurant, setRestaurant] = useState({});
    const [day, setDay] = useState(moment().format("dddd").toLowerCase());
    const handleDayChange = (event) => {
        setDay(event.target.value);
    }

    const chartConfig = {
        busyness_score: {
            label: "Busyness Score",
            color: "#60a5fa",
        },
    }

    useEffect(() => {
        const fetchRestaurant = async () => {
            const data = await restaurantApi.getRestaurantByName(restaurantName);
            setRestaurant(data);
        }

        const setChartDataFill = () => {
            restaurant.popular_times && restaurant.popular_times.graph_results[day].map((result) => {
                if (result.time === currentHour) {
                    result.fill = "#000000";
                } else {
                    result.fill = "#60a5fa";
                }
            })
        }

        const currentHour = moment().format("h A");

        fetchRestaurant();
        setChartDataFill();
    }, [restaurantName]);

    return (
        <>
            {restaurant ? (
                <section className="container mx-auto py-8 space-y-3">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/restaurants">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href={`/restaurants/${cityName}`}>{cityName}</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>{restaurantName}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <h3 className="text-4xl">{restaurant.title}</h3>
                    <div className="flex flex-col gap-3 pb-4">
                        <div className="flex gap-1.5">
                            <Rating classes={{iconFilled: "[&>svg]:fill-primary"}} value={restaurant.rating}
                                    precision={0.5}
                                    readOnly/>
                            {restaurant.type && restaurant.type.map((t, index) => (
                                <span key={index}>&#183; {t}</span>
                            ))}
                        </div>
                        <span className="font-bold tracking-wider">{restaurant.open_state}</span>
                    </div>
                    <Carousel>
                        <CarouselContent>
                            {restaurant.images && restaurant.images.map((img, index) => (
                                <CarouselItem key={index}>
                                    <img src={img.thumbnail} alt={img.title}
                                         className="w-full object-cover max-h-[700px]"/>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-3 z-10"/>
                        <CarouselNext className="right-3 z-10"/>
                    </Carousel>
                    <div className="flex gap-4 pt-4">
                        {/*  Main  */}
                        <div className="w-2/3 flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <p>{restaurant.description}</p>
                                <span><b>Address: </b>{restaurant.address}</span>
                                <span><b>Phone: </b>{restaurant.phone}</span>
                            </div>

                            <div className="space-y-3">
                                <h3>Details</h3>
                                {restaurant.type && (
                                    <div>
                                        <h5 className="font-bold">CUISINES</h5>
                                        {restaurant.type.join(", ")}
                                    </div>
                                )}
                                {restaurant.extensions && (
                                    <>
                                        <div>
                                            <h5 className="font-bold">MEALS</h5>
                                            {restaurant.extensions[4].dining_options.join(", ")}
                                        </div>
                                        <div>
                                            <h5 className="font-bold">FEATURES</h5>
                                            {restaurant.extensions[3].offerings.join(", ")}
                                        </div>
                                        <div>
                                            <h5 className="font-bold">HIGHLIGHTS</h5>
                                            {restaurant.extensions[1].highlights.join(", ")}
                                        </div>
                                        <div>
                                            <h5 className="font-bold">SERVICES</h5>
                                            {restaurant.extensions[0].service_options.join(", ")}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/*  Sticky  */}
                        <div className="w-1/3 sticky top-0 space-y-2">
                            <h3>Popular Times</h3>
                            <div className="flex justify-between">
                                <Select size="small" variant="standard" value={day} onChange={handleDayChange}>
                                    <MenuItem value="sunday">Sunday</MenuItem>
                                    <MenuItem value="monday">Monday</MenuItem>
                                    <MenuItem value="tuesday">Tuesday</MenuItem>
                                    <MenuItem value="wednesday">Wednesday</MenuItem>
                                    <MenuItem value="thursday">Thursday</MenuItem>
                                    <MenuItem value="friday">Friday</MenuItem>
                                    <MenuItem value="saturday">Saturday</MenuItem>
                                </Select>
                                {restaurant.hours && (
                                    <span className="font-semibold">{restaurant.hours.find(obj => day in obj)[day]}</span>
                                )}
                            </div>

                            {restaurant.popular_times && (
                                <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                                    <BarChart accessibilityRole="presentation" data={restaurant.popular_times.graph_results[day]}>
                                        <CartesianGrid vertical={false} />
                                        <XAxis dataKey="time" tickLine={false} tickMargin={10} axisLine={false} />
                                        <Bar dataKey="busyness_score" fill="var(--color-business_score)" />
                                    </BarChart>
                                </ChartContainer>
                            )}
                        </div>
                    </div>
                </section>) : <h3>Loading...</h3>
            }
        </>
    )
};
