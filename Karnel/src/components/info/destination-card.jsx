import {Card, CardDescription, CardHeader, CardImage, CardTitle} from "@/components/ui/card.jsx";
import {Link} from "react-router";

export default function DestinationCard({destination, type}) {
    return (
        <Link to={`${type}/${destination.cityName}`}>
            <Card className="relative hover:cursor-pointer hover:scale-[1.05]">
                <CardImage className="w-full max-h-[200px] object-cover" src="images/home/placeholder.svg" alt="Destination Image"/>
                <CardHeader className="absolute bottom-0 left-0 pb-5">
                    <CardTitle>{destination.cityName}</CardTitle>
                    {/*<CardDescription>{destination.attractionsCount} things to do</CardDescription>*/}
                </CardHeader>
            </Card>
        </Link>
    )
}