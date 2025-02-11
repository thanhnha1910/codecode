import {Link, useParams} from "react-router";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardImage,
    CardImageCarousel,
    CardTitle
} from "@/components/ui/card.jsx";
import {Button} from "@/components/ui/button.jsx";

export default function RestaurantCard({restaurant}) {
    const cityName = useParams().cityName;
    return (
        <Card className="p-1">
<<<<<<< Updated upstream
<CardImage 
  className="w-full object-cover rounded-lg" 
  src={restaurant.thumbnail ? 
    `http://localhost:5128${restaurant.thumbnail}` : 
    "/images/home/placeholder.svg"
  }
  alt={`Image of ${restaurant.title}`} 
/>            <CardHeader className="px-2 pb-2 grid grid-rows-3">
                <CardTitle className="text-xl">{restaurant.title}</CardTitle>
=======
            <CardImageCarousel className="w-full object-cover rounded-lg" images={restaurant.images} />
            <CardHeader className="px-2 pb-2 grid grid-rows-3">
                <CardTitle className="text-xl">{restaurant.name}</CardTitle>
>>>>>>> Stashed changes
                <CardDescription className="flex flex-col gap-2">
                    <span>{restaurant.description}</span>
                    <span className="text-foreground text-base">{restaurant.type}</span>
                </CardDescription>
                <CardFooter className="flex justify-end items-center px-2 py-2">
                    <Button asChild={true} className="rounded-full py-5">
                        <Link to={`/restaurants/${cityName}/${restaurant.name}`}>Check Details</Link>
                    </Button>
                </CardFooter>
            </CardHeader>
        </Card>
    )
}
