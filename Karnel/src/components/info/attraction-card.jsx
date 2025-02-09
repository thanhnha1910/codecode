import {
    Card,
    CardDescription,
    CardHeader,
    CardImage,
    CardTitle
} from "@/components/ui/card.jsx";
import {Rating} from "@mui/material";
import {Button} from "@/components/ui/button.jsx";
import {Link, useParams} from 'react-router'

export default function AttractionCard({attraction}) {
    const cityName = useParams().cityName;
    return (
        <Card className="p-1">
            <CardImage className="w-full object-cover rounded-lg" src={attraction.thumbnail} alt={`Image of ${attraction.title}`} />
            <CardHeader className="px-2 pb-2 grid grid-rows-3">
                <CardTitle className="text-xl">{attraction.title}</CardTitle>
                <CardDescription className="flex flex-col gap-2">
                    <div className="flex gap-2 items-center">
                        <Rating classes={{iconFilled: "[&>svg]:fill-primary"}} size="small" precision={0.5} defaultValue={attraction.rating} readOnly />
                        <span>{attraction.reviews}</span>
                    </div>
                    <span className="text-foreground text-base">{attraction.description}</span>
                </CardDescription>
                <div className="flex justify-between items-center px-2 py-2">
                    {attraction.price === "Free" ? (<span className="font-bold">Free</span>) :
                        (
                            <div>
                                {attraction.price && (
                                    <div className="flex flex-col text-sm">
                                        from
                                        <span className="font-bold">{attraction.price}</span>
                                    </div>
                                )}
                            </div>
                        )}
                    <Button asChild={true} className="rounded-full py-5">
                        <Link to={`/attractions/${cityName}/${attraction.title}`}>Check Details</Link>
                    </Button>
                </div>
            </CardHeader>
        </Card>
    )
}