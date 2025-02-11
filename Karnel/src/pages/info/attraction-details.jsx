import {useParams} from "react-router";
import {useEffect, useState} from "react";
import attractionApi from "@/services/AttractionService.js";
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

export default function AttractionDetails() {
    const attractionName = useParams().attractionName;
    const cityName = useParams().cityName;
    const [attraction, setAttraction] = useState({});
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
        const fetchAttraction = async () => {
            const data = await attractionApi.getAttractionByName(cityName, attractionName);
            setAttraction(data);
        }

        const setChartDataFill = () => {
            attraction.popular_times && attraction.popular_times.graph_results[day].map((result) => {
                if (result.time === currentHour) {
                    result.fill = "#000000";
                } else {
                    result.fill = "#60a5fa";
                }
            })
        }

        const currentHour = moment().format("h A");

        fetchAttraction();
        setChartDataFill();
        console.log(attraction)
    }, [attractionName]);

    return (
        <>
            {attraction ? (
                <section className="container mx-auto py-8 space-y-3">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/attractions">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href={`/attractions/${cityName}`}>{cityName}</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>{attractionName}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <h3 className="text-4xl">{attraction.title}</h3>
                    <div className="flex flex-col gap-3 pb-4">
                        <div className="flex gap-1.5">
                            {attraction.rating && (
                                <Rating classes={{iconFilled: "[&>svg]:fill-primary"}} defaultValue={attraction.rating}
                                        precision={0.5}
                                        readOnly/>
                            )}
                            {attraction.types && attraction.types.map((t, index) => (
                                <span key={index}>&#183; {t}</span>
                            ))}
                        </div>
                        <span className="font-bold tracking-wider">{attraction.open_state}</span>
                    </div>
                    {attraction.images && (
                        <Carousel>
                            <CarouselContent>
                                {attraction.images.map((img, index) => (
                                    <CarouselItem key={index}>
                                        <img src={img.thumbnail} alt={img.title}
                                             className="w-full object-cover max-h-[700px]"/>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="left-3 z-10"/>
                            <CarouselNext className="right-3 z-10"/>
                        </Carousel>
                    )}
                    <div className="flex gap-4 pt-4">
                        {/*  Main  */}
                        <div className="w-2/3 flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <p>{attraction.description}</p>
                                <span><b>Address: </b>{attraction.address}</span>
                                <span><b>Phone: </b>{attraction.phone}</span>
                                <span><b>Website: </b><a className="underline" target="_blank" href={attraction.website}>{attraction.website}</a></span>
                            </div>

                            {attraction.experiences && (
                                <div className="space-y-3">
                                    <h3>Experiences</h3>
                                    <Carousel>
                                        <CarouselContent>
                                            {attraction.experiences && attraction.experiences.map((ex, index) => (
                                                <CarouselItem key={index} className="basis-1/4">
                                                    <Card>
                                                        <CardImage src={ex.thumbnail}
                                                                   className="max-h-[150px] object-cover"/>
                                                        <CardHeader className="p-4 grid grid-rows-4">
                                                            <CardTitle
                                                                className="row-span-3 leading-6">{ex.title}</CardTitle>
                                                            <CardDescription className="row-span-1 flex items-center gap-2">
                                                                <Rating classes={{iconFilled: "[&>svg]:fill-primary"}}
                                                                        value={ex.rating} precision={0.5} readOnly/>
                                                                <span className="mt-[4px]">{ex.rating}</span>
                                                            </CardDescription>
                                                        </CardHeader>
                                                    </Card>
                                                </CarouselItem>
                                            ))}
                                        </CarouselContent>
                                        <CarouselPrevious className="left-3 z-10"/>
                                        <CarouselNext className="right-3 z-10"/>
                                    </Carousel>
                                </div>
                            )}
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
                                {attraction.operating_hours && (
                                    <span className="font-semibold">{attraction.operating_hours[day]}</span>
                                )}
                            </div>

                            {attraction.popular_times ? (
                                <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                                    <BarChart accessibilityRole="presentation" data={attraction.popular_times.graph_results[day]}>
                                        <CartesianGrid vertical={false} />
                                        <XAxis dataKey="time" tickLine={false} tickMargin={10} axisLine={false} />
                                        <Bar dataKey="busyness_score" fill="var(--color-business_score)" />
                                    </BarChart>
                                </ChartContainer>
                            ) : (<h4>No data for popular times</h4>)}
                        </div>
                    </div>
                </section>) : <h3>Loading...</h3>
            }
        </>
    )
};