import {Button} from "@/components/ui/button.jsx";
import {Card, CardContent, CardDescription, CardHeader, CardImage, CardTitle} from "@/components/ui/card.jsx";
import {Facebook, Instagram, Twitter} from "lucide-react";

const guideList = [
    {
        name: "Full Name",
        designation: "Designation",
        image: "images/home/team-1.jpg",
    },
    {
        name: "Full Name",
        designation: "Designation",
        image: "images/home/team-2.jpg",
    },
    {
        name: "Full Name",
        designation: "Designation",
        image: "images/home/team-3.jpg",
    },
    {
        name: "Full Name",
        designation: "Designation",
        image: "images/home/team-4.jpg",
    },
]
export default function About() {
    return (
        <section className="container mx-auto py-20 flex flex-col gap-12">
            <div className="grid grid-cols-2 gap-x-12 auto-rows-max">
                <div className="min-h-[400px]">
                    <div className="relative h-full">
                        <img src="images/home/about.jpg" alt="About Image"
                             className="object-cover absolute h-full w-full"/>
                    </div>
                </div>
                <div className="flex flex-col gap-6">
                    <h1>Welcome to <span className="text-primary">Karnel</span></h1>
                    <p className="[&:not(:first-child)]:mt-0 text-gray-500">Tempor erat elitr rebum at clita. Diam dolor
                        diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit.</p>
                    <p className="[&:not(:first-child)]:mt-0 text-gray-500">Tempor erat elitr rebum at clita. Diam dolor
                        diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem
                        sit clita duo justo magna dolore erat amet</p>
                    <div className="grid grid-cols-2">
                        <div>
                            <ul>
                                <li className="before:content-['✓'] before:text-primary before:font-extrabold before:text-2xl flex items-center text-gray-500">First
                                    Class Flights
                                </li>
                                <li className="before:content-['✓'] before:text-primary before:font-extrabold before:text-2xl flex items-center text-gray-500">Luxury
                                    Accommodations
                                </li>
                                <li className="before:content-['✓'] before:text-primary before:font-extrabold before:text-2xl flex items-center text-gray-500">Premium
                                    City Tours
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul>
                                <li className="before:content-['✓'] before:text-primary before:font-extrabold before:text-2xl flex items-center text-gray-500">Handpicked
                                    Hotels
                                </li>
                                <li className="before:content-['✓'] before:text-primary before:font-extrabold before:text-2xl flex items-center text-gray-500">Latest
                                    Model Vehicles
                                </li>
                                <li className="before:content-['✓'] before:text-primary before:font-extrabold before:text-2xl flex items-center text-gray-500">24/7
                                    Service
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Button variant="default" className="w-1/3 py-8">Read More</Button>
                </div>
            </div>
            <h1 className="text-center pt-8">Meet Our Guide</h1>
            <div className="flex justify-between gap-6">
                {guideList.map((guide, index) => (
                    <Card key={index} className="p-0">
                        <div className="relative">
                            <CardImage alt="Card image" src={guide.image}/>
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 flex gap-3">
                                <Button className="rounded-full border-b-primary text-primary" variant="outline"
                                        size="icon"><Facebook/></Button>
                                <Button className="rounded-full border-b-primary text-primary" variant="outline"
                                        size="icon"><Twitter/></Button>
                                <Button className="rounded-full border-b-primary text-primary" variant="outline"
                                        size="icon"><Instagram/></Button>
                            </div>
                        </div>
                        <CardContent className="text-center p-10">
                            <CardTitle className="text-xl">{guide.name}</CardTitle>
                            <CardDescription>{guide.designation}</CardDescription>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}