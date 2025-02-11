import {
    Card,
    CardDescription, CardFooter,
    CardHeader,
    CardImageCarousel,
    CardTitle
} from "@/components/ui/card.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Link, useParams} from 'react-router'

export default function AttractionCard({attraction}) {
    const cityName = useParams().cityName;
    return (
        <Card className="p-1">
<<<<<<< Updated upstream
<CardImage 
  className="w-full object-cover rounded-lg" 
  src={attraction.thumbnail ? `http://localhost:5128${attraction.thumbnail}` : "/images/home/placeholder.svg"}
  alt={`Image of ${attraction.title}`} 
/>            <CardHeader className="px-2 pb-2 grid grid-rows-3">
                <CardTitle className="text-xl">{attraction.title}</CardTitle>
=======
            <CardImageCarousel className="w-full rounded-lg" images={attraction.images} />
            <CardHeader className="px-2 pb-2 grid grid-rows-3">
                <CardTitle className="text-xl">{attraction.name}</CardTitle>
>>>>>>> Stashed changes
                <CardDescription className="flex flex-col gap-2">
                    <span className="text-foreground text-base">{attraction.description}</span>
                </CardDescription>
                <CardFooter className="flex justify-end items-center px-2 py-2">
                    <Button asChild={true} className="rounded-full py-5">
                        <Link to={`/attractions/${cityName}/${attraction.name}`}>Check Details</Link>
                    </Button>
                </CardFooter>
            </CardHeader>
        </Card>
    )
}