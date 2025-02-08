import React, { createContext, useContext, useState, useEffect } from 'react';
import FavoriteService from '../services/FavoriteService';

const FavoritesContext = createContext();

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
};

export function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadFavorites = async (userId) => {
        if (!userId) return;
        try {
            const response = await FavoriteService.getFavorites(userId);
            setFavorites(response.data);
        } catch (error) {
            console.error("Error loading favorites:", error);
        } finally {
            setLoading(false);
        }
    };

    const addFavorite = async (userId, tourId) => {
        try {
            const response = await FavoriteService.addFavorite(userId, tourId);
            if (response.data.success) {
                setFavorites(prev => {
                    // Avoid duplicate entries
                    if (!prev.some(f => f.tourID === tourId)) {
                        return [...prev, { tourID: tourId, userID: userId }];
                    }
                    return prev;
                });
            }
            return response;
        } catch (error) {
            console.error("Error adding favorite:", error);
            throw error;
        }
    };

    const removeFavorite = async (userId, tourId) => {
        try {
            await FavoriteService.removeFavorite(userId, tourId);
            setFavorites(prev => prev.filter(f => f.tourID !== tourId));
        } catch (error) {
            console.error("Error removing favorite:", error);
            throw error;
        }
    };

    const isFavorite = (tourId) => {
        return favorites.some(f => f.tourID === tourId || f.TourID === tourId);
    };

    // Add useEffect to load favorites when user is available
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user?.id) {
            loadFavorites(user.id);
        }
    }, []);

    return (
        <FavoritesContext.Provider value={{
            favorites,
            loading,
            loadFavorites,
            addFavorite,
            removeFavorite,
            isFavorite
        }}>
            {children}
        </FavoritesContext.Provider>
    );
}