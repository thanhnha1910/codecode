import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import FavoriteService from '@/services/FavoriteService';
import { toast } from 'react-toastify';

export default function FavoritesList({ userId }) {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadFavorites();
    }, [userId]);

    const loadFavorites = async () => {
        try {
            const response = await FavoriteService.getFavorites(userId);
            setFavorites(response.data);
        } catch (error) {
            console.error('Error loading favorites:', error);
            toast.error('Failed to load favorites');
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveFavorite = async (tourId) => {
        try {
            await FavoriteService.deleteFavorite(userId, tourId);
            toast.success('Removed from favorites');
            loadFavorites(); // Reload the list
        } catch (error) {
            toast.error('Failed to remove from favorites');
        }
    };

    if (loading) {
        return <div>Loading favorites...</div>;
    }

    return (
        <div className="favorites-list">
            <h3 className="text-xl font-bold mb-4">Your Favorite Tours</h3>
            {favorites.length === 0 ? (
                <p>No favorite tours yet</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {favorites.map((favorite) => (
                        <div key={favorite.id} className="border rounded-lg p-4 shadow-sm">
                            <div className="flex justify-between items-center mb-2">
                                <h4 className="font-semibold">{favorite.tourName}</h4>
                                <button
                                    onClick={() => handleRemoveFavorite(favorite.tourId)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <Heart className="h-5 w-5 fill-current" />
                                </button>
                            </div>
                            <p className="text-gray-600 mb-2">Price: ${favorite.price}</p>
                            <p className="text-gray-400 text-sm">
                                Added on: {new Date(favorite.likeDate).toLocaleDateString()}
                            </p>
                            <Link
                                to={`/tour/${favorite.tourId}`}
                                className="text-blue-500 hover:text-blue-700 text-sm mt-2 block"
                            >
                                View Details
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}