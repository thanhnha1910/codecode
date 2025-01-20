export default function DestinationSection() {
    return (
        <section>
            <h1 className="text-center pb-12">Popular Destinations</h1>
            <div className="grid grid-cols-12 gap-x-1">
                <div className="lg:col-span-7 md:col-span-6">
                    <div className="grid grid-cols-2 gap-y-2 gap-x-2">
                        <div className="lg:col-span-2 md:col-span-2 relative">
                            <img src="images/home/destination-1.jpg" alt="Destination Image 1" className="w-full"/>
                            <div
                                className="bg-background text-primary absolute bottom-0 right-0 px-2 py-1 m-3 font-bold rounded-md">Thailand
                            </div>
                        </div>
                        <div className="lg:col-span-1 md:col-span-2 relative">
                            <img src="images/home/destination-2.jpg" alt="Destination Image 1" className="w-full"/>
                            <div
                                className="bg-background text-primary absolute bottom-0 right-0 px-2 py-1 m-3 font-bold rounded-lg">Malaysia
                            </div>
                        </div>
                        <div className="lg:col-span-1 md:col-span-2 relative">
                            <img src="images/home/destination-3.jpg" alt="Destination Image 1" className="w-full"/>
                            <div
                                className="bg-background text-primary absolute bottom-0 right-0 px-2 py-1 m-3 font-bold rounded-lg">Australia
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-5 md:col-span-6 min-h-[350px] relative">
                    <img src="images/home/destination-4.jpg" alt="Destination Image 1" className="w-full"/>
                    <div
                        className="bg-background text-primary absolute bottom-0 right-0 px-2 py-1 m-3 font-bold rounded-lg">Indonesia
                    </div>
                </div>
            </div>
        </section>
    )
}