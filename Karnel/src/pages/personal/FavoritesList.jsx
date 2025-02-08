import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Calendar, MapPin, User, Trash2 } from 'lucide-react';
import FavoriteService from '@/services/FavoriteService';
import { toast } from 'react-toastify';
import { useUser } from "@/contexts/UserProvider";
import { useFavorites } from "@/contexts/FavoritesProvider";

export default function FavoritesList({ userId }) {
    const navigate = useNavigate();
    const { user } = useUser();
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (userId) {
            loadFavorites();
        }
    }, [userId]);

    const loadFavorites = async () => {
        try {
            setLoading(true);
            const response = await FavoriteService.getFavorites(userId);
            setFavorites(response.data);
        } catch (error) {
            toast.error('Failed to load favorites');
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveFavorite = async (tourId) => {
        try {
            await FavoriteService.removeFavorite(userId, tourId);
            toast.success('Removed from favorites');
            loadFavorites(); // Reload the favorites list
        } catch (error) {
            toast.error('Failed to remove from favorites');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="favorites-list">
            {favorites.length === 0 ? (
                <div className="text-center py-8">
                    <Heart className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-lg font-medium">No favorites yet</h3>
                    <p className="mt-1 text-gray-500">
                        Start exploring tours to add to your favorites!
                    </p>
                    <Link 
                        to="/tours" 
                        className="mt-4 inline-block text-blue-500 hover:underline"
                    >
                        Explore Tours
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {favorites.map((favorite) => (
                        <div 
                            key={favorite.likeID}
                            className="bg-white rounded-lg shadow-md overflow-hidden"
                        >
                            <div className="relative">
                                <img 
                                    src="/images/home/placeholder.svg"
                                    alt={favorite.tour.tourName}
                                    className="w-full h-48 object-cover"
                                />
                                <button
                                    onClick={() => handleRemoveFavorite(favorite.tourID)}
                                    className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-red-50"
                                >
                                    <Trash2 className="h-5 w-5 text-red-500" />
                                </button>
                            </div>

                            <div className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-semibold">
                                        {favorite.tour.tourName}
                                    </h3>
                                    <span className="text-lg font-bold text-blue-600">
                                        ${favorite.tour.price}
                                    </span>
                                </div>

                                <div className="grid grid-cols-3 gap-2 mb-4 text-sm">
                                    <div className="flex items-center gap-1">
                                        <MapPin className="h-4 w-4 text-gray-500" />
                                        <span>{favorite.tour.cityName}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Calendar className="h-4 w-4 text-gray-500" />
                                        <span>{favorite.tour.duration} days</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <User className="h-4 w-4 text-gray-500" />
                                        <span>{favorite.tour.availableSlots} slots</span>
                                    </div>
                                </div>

                                <p className="text-gray-600 text-sm mb-4">
                                    {favorite.tour.description}
                                </p>

                                <div className="flex gap-3">
                                    <Link
                                        to={`/tours/${favorite.tourID}`}
                                        className="flex-1 py-2 px-4 bg-blue-500 text-white text-center rounded-md hover:bg-blue-600"
                                    >
                                        View Details
                                    </Link>
                                    <button
                                        onClick={() => navigate(`/tours/${favorite.tourId}`)}
                                      
                                        className="flex-1 py-2 px-4 bg-green-500 text-white text-center rounded-md hover:bg-green-600"
                                    >
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}