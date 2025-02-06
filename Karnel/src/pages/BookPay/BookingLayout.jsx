import React from 'react';
import TourDetail from '../tour/tour-detail';
import Book from './Book';
import { useSearchParams } from 'react-router-dom';

export default function BookingLayout() {
    const [searchParams] = useSearchParams();
    const tourId = searchParams.get("tourId");

    if (!tourId) {
        return <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800">No Tour Selected</h2>
                <p className="text-gray-600 mt-2">Please select a tour to continue booking</p>
            </div>
        </div>;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Column - Tour Details */}
                    <div className="lg:w-2/3">
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                            <TourDetail isBookingView={true} />
                        </div>
                    </div>

                    {/* Right Column - Booking Form */}
                    <div className="lg:w-1/3">
                        <div className="sticky top-8">
                            <Book />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}