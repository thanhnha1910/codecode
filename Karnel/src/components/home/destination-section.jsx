export default function DestinationSection() {
    return (
        <section className="container mx-auto py-12">
            <div className="animate-in fade-in slide-in-from-bottom duration-800">
                <h1 className="text-center mb-5">Popular Destinations</h1>
            </div>
            <div className="grid grid-cols-12 gap-x-1">
                <div className="lg:col-span-7 md:col-span-6">
                    <div className="grid grid-cols-2 gap-y-1">
                        <div className="lg:col-span-2 md:col-span-2 animate-in zoom-in duration-1000 relative">
                            <img src="images/home/destination-1.jpg" alt="Destination Image 1" className="w-full"/>
                            <div
                                className="bg-background text-destructive absolute top-0 right-0 px-2 py-1 m-3 font-bold rounded-lg">30%
                                OFF
                            </div>
                            <div
                                className="bg-background text-destructive absolute bottom-0 left-0 px-2 py-1 m-3 font-bold rounded-lg">Thailand
                            </div>
                        </div>
                        <div className="lg:col-span-1 md:col-span-2 animate-in zoom-in duration-1000 relative">
                            <img src="images/home/destination-2.jpg" alt="Destination Image 1" className="w-full"/>
                            <div
                                className="bg-background text-destructive absolute top-0 right-0 px-2 py-1 m-3 font-bold rounded-lg">25%
                                OFF
                            </div>
                            <div
                                className="bg-background text-destructive absolute bottom-0 left-0 px-2 py-1 m-3 font-bold rounded-lg">Malaysia
                            </div>
                        </div>
                        <div className="lg:col-span-1 md:col-span-2 animate-in zoom-in duration-1000 relative">
                            <img src="images/home/destination-3.jpg" alt="Destination Image 1" className="w-full"/>
                            <div
                                className="bg-background text-destructive absolute top-0 right-0 px-2 py-1 m-3 font-bold rounded-lg">25%
                                OFF
                            </div>
                            <div
                                className="bg-background text-destructive absolute bottom-0 left-0 px-2 py-1 m-3 font-bold rounded-lg">Malaysia
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-5 md:col-span-6 min-h-[350px] animate-in zoom-in duration-1000 relative">
                    <img src="images/home/destination-4.jpg" alt="Destination Image 1" className="w-full"/>
                    <div
                        className="bg-background text-destructive absolute top-0 right-0 px-2 py-1 m-3 font-bold rounded-lg">20%
                        OFF
                    </div>
                    <div
                        className="bg-background text-destructive absolute bottom-0 left-0 px-2 py-1 m-3 font-bold rounded-lg">Indonesia
                    </div>
                </div>
            </div>
        </section>
    )
}