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
import { Link, useNavigate } from 'react-router-dom';
import {Calendar, MapPin, User, Heart} from "lucide-react";
import { useUser } from "@/contexts/UserProvider";
import { useFavorites } from "@/contexts/FavoritesProvider";
import { toast } from "react-toastify";
import './tour.css';
import  { useState, useEffect } from 'react';


export default function TourPackage({tourPackage}) {
    const navigate = useNavigate();
    const { user } = useUser();
    const { isFavorite, addFavorite, removeFavorite, loadFavorites } = useFavorites();
    const [isLoading, setIsLoading] = useState(false);
    const [isFavorited, setIsFavorited] = useState(false);

   
    useEffect(() => {
        if (user?.id) {
            const checkFavoriteStatus = isFavorite(tourPackage.tourId);
            setIsFavorited(checkFavoriteStatus);
        }
    }, [user, tourPackage.tourId, isFavorite]);

    const handleToggleFavorite = async (e) => {
        e.preventDefault();
        e.stopPropagation();
    
        if (!user) {
            toast.info("Please login to add to favorites");
            navigate("/login");
            return;
        }
    
        setIsLoading(true);
        try {
            if (isFavorited) {
                await removeFavorite(user.id, tourPackage.tourId);
                setIsFavorited(false);
                toast.success("Removed from favorites");
            } else {
                await addFavorite(user.id, tourPackage.tourId);
                setIsFavorited(true);
                toast.success("Added to favorites");
            }
            await loadFavorites(user.id);
        } catch (error) {
            console.error('Error details:', error.response?.data);
            toast.error(error.response?.data?.message || "Failed to update favorites");
            // Revert the local state in case of error
            setIsFavorited(!isFavorited);
        } finally {
            setIsLoading(false);
        }
    };
    const handleBookNow = () => {
        if (!user) {
            toast.error("Please login to book a tour");
            navigate("/login");
            return;
        }
        navigate(`/tours/${tourPackage.tourId}`);
    };


    return (
        <Card className="hover:cursor-pointer hover:shadow-lg duration-300 ease-in-out hover:scale-105 shadow-none border-none relative">
           <button
                onClick={handleToggleFavorite}
                disabled={isLoading}
                className={`absolute top-2 right-2 z-10 p-2 bg-white rounded-full shadow-md transition-all duration-300 heart-button ${
                    isFavorited ? 'heart-animation' : ''
                }`}
                aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
            >
                <Heart 
                    className={`h-5 w-5 transition-all duration-300 heart-icon ${
                        isFavorited 
                            ? 'text-red-500 fill-current' 
                            : 'text-gray-400 hover:text-red-500'
                    } ${isLoading ? 'opacity-50' : ''}`}
                />
            </button>

            <CardImage src="../images/home/placeholder.svg" alt="Package Image"/>
            <div className="flex text-sm border-b-2">
                <div className="flex flex-auto justify-center items-center px-2 py-1 gap-1">
                    <MapPin size={14} className="text-accent"/>
                    {tourPackage.cityName}
                </div>
                <div className="flex flex-auto justify-center items-center px-2 py-1 gap-1 border-x-2">
                    <Calendar size={14} className="text-accent"/>
                    {tourPackage.duration} days
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
                    <Link to={`/tours/${tourPackage.tourId}`}>View More</Link>
                </Button>
                <Button size="sm" onClick={handleBookNow}>
                    Book Now
                </Button>
            </CardFooter>
        </Card>
    );
}