import {
    Card,
    CardHeader,
    CardImage,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter
} from "@/components/ui/card.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Link} from 'react-router'
import {Calendar, MapPin, User} from "lucide-react";

export default function TourPackage({tourPackage}) {
    const dateDiff = (start, end) => {
        try {
            let startDate = Date.parse(start);
            let endDate = Date.parse(end);
            return Math.floor((Math.abs(endDate - startDate) / (1000 * 60 * 60 * 24)));
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Card className="hover:cursor-pointer hover:shadow-lg duration-300 ease-in-out hover:scale-105">
            <CardImage src="../images/home/placeholder.svg" alt="Package Image"/>
            <div className="flex text-sm border-b-2">
                <div className="flex flex-auto justify-center items-center px-2 py-1 gap-1">
                    <MapPin size={14} className="text-accent"/>
                    {tourPackage.cityName}
                </div>
                <div className="flex flex-auto justify-center items-center px-2 py-1 gap-1 border-x-2">
                    <Calendar size={14} className="text-accent"/>
                    {dateDiff(tourPackage.startDate, tourPackage.endDate)} days
                </div>
                <div className="flex flex-auto justify-center items-center px-2 py-1 gap-1">
                    <User size={14} className="text-accent"/>
                    {tourPackage.availableSlots} People
                </div>
            </div>
            <CardHeader>
                <div className="flex justify-between">
                    <CardTitle>{tourPackage.name}</CardTitle>
                    <CardTitle>${tourPackage.price}</CardTitle>
                </div>
                <CardDescription className="text-foreground">{tourPackage.description}</CardDescription>
            </CardHeader>
            <CardContent>

            </CardContent>
            <CardFooter className="flex gap-2 justify-center">
                <Button size="sm" asChild>
                    <Link to={`/tour/${tourPackage.id}`}>View More</Link>
                </Button>
                <Button size="sm">Book Now</Button>
            </CardFooter>
        </Card>
    )
}