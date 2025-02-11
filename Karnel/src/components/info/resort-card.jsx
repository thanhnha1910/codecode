import {Card, CardDescription, CardHeader, CardImage, CardTitle} from "@/components/ui/card.jsx";
import {Rating} from "@mui/material";
import {Button} from "@/components/ui/button.jsx";
import {Link} from "react-router";
import {useSearchParams} from "react-router-dom";

export default function ResortCard({resort}) {
    const [searchParams] = useSearchParams();
    return (
        <Card className="p-1">
<CardImage 
  className="w-full object-cover rounded-lg min-h-[200px] max-h-[200px]" 
  src={resort.images && resort.images[0] ? 
    `http://localhost:5128${resort.images[0].imageUrl}` : 
    "/images/home/placeholder.svg"
  }
  alt={`Image of ${resort.name}`} 
/>            <CardHeader className="px-2 pb-2 grid grid-rows-6">
                <CardTitle className="text-xl row-span-2">{resort.name}</CardTitle>
                <CardDescription className="flex flex-col gap-2 row-span-4">
                    <div className="flex gap-2 items-center">
                        <Rating classes={{iconFilled: "[&>svg]:fill-primary"}} size="small" precision={0.5} defaultValue={resort.overall_rating} readOnly />
                        <span>{resort.reviews}</span>
                    </div>
                    <span className="text-foreground text-base">{resort.description}</span>
                </CardDescription>
                <div className="flex justify-between items-center px-2 py-2">
                    {resort.rate_per_night === "Free" ? (<span className="font-bold">Free</span>) :
                        (
                            <div>
                                {resort.rate_per_night && (
                                    <div className="flex flex-col text-sm">
                                        from
                                        <span className="font-bold">{resort.rate_per_night.lowest}</span>
                                    </div>
                                )}
                            </div>
                        )}
                    <Button asChild={true} className="rounded-full py-5">
                        <Link to={`/resorts/${resort.name}?${searchParams.toString()}`}>Check Details</Link>
                    </Button>
                </div>
            </CardHeader>
        </Card>
    )
}
