import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardImage,
    CardImageCarousel,
    CardTitle
} from "@/components/ui/card.jsx";
import {Rating} from "@mui/material";
import {Button} from "@/components/ui/button.jsx";
import {Link} from "react-router";
import {useSearchParams} from "react-router-dom";

export default function HotelCard({hotel}) {
    const [searchParams] = useSearchParams();
    return (
        <Card className="p-1">
<<<<<<< Updated upstream
<CardImage 
  className="w-full object-cover rounded-lg min-h-[200px] max-h-[200px]" 
  src={hotel.images && hotel.images[0] ? 
    `http://localhost:5128${hotel.images[0].imageUrl}` : 
    "/images/home/placeholder.svg"
  }
  alt={`Image of ${hotel.name}`} 
/>            <CardHeader className="px-2 pb-2 grid grid-rows-6">
=======
            <CardImageCarousel className="w-full rounded-lg min-h-[200px] max-h-[200px]" images={hotel.images} />
            <CardHeader className="px-2 pb-2 grid grid-rows-6">
>>>>>>> Stashed changes
                <CardTitle className="text-xl row-span-2">{hotel.name}</CardTitle>
                <CardDescription className="flex flex-col gap-2 row-span-4">
                    <span className="text-foreground text-base">{hotel.description}</span>
                </CardDescription>
                <CardFooter className="flex justify-end items-center px-2 py-2">
                    <Button asChild={true} className="rounded-full py-5">
                        <Link to={`/hotels/${hotel.name}?${searchParams.toString()}`}>Check Details</Link>
                    </Button>
                </CardFooter>
            </CardHeader>
        </Card>
    )
}