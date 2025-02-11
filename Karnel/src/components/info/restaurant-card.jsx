import {Link, useParams} from "react-router";
import {Card, CardDescription, CardHeader, CardImage, CardTitle} from "@/components/ui/card.jsx";
import {Rating} from "@mui/material";
import {Button} from "@/components/ui/button.jsx";

export default function RestaurantCard({restaurant}) {
    const cityName = useParams().cityName;
    return (
        <Card className="p-1">
<CardImage 
  className="w-full object-cover rounded-lg" 
  src={restaurant.thumbnail ? 
    `http://localhost:5128${restaurant.thumbnail}` : 
    "/images/home/placeholder.svg"
  }
  alt={`Image of ${restaurant.title}`} 
/>            <CardHeader className="px-2 pb-2 grid grid-rows-3">
                <CardTitle className="text-xl">{restaurant.title}</CardTitle>
                <CardDescription className="flex flex-col gap-2">
                    <div className="flex gap-2 items-center">
                        <Rating classes={{iconFilled: "[&>svg]:fill-primary"}} size="small" precision={0.5} defaultValue={restaurant.rating} readOnly />
                        <span>{restaurant.reviews}</span>
                    </div>
                    <span className="text-foreground text-base">{restaurant.type}</span>
                </CardDescription>
                <div className="flex justify-between items-center px-2 py-2">
                    {restaurant.price === "Free" ? (<span className="font-bold">Free</span>) :
                        (
                            <div>
                                {restaurant.price && (
                                    <div className="flex flex-col text-sm">
                                        from
                                        <span className="font-bold">{restaurant.price}</span>
                                    </div>
                                )}
                            </div>
                        )}
                    <Button asChild={true} className="rounded-full py-5">
                        <Link to={`/restaurants/${cityName}/${restaurant.title}`}>Check Details</Link>
                    </Button>
                </div>
            </CardHeader>
        </Card>
    )
}
