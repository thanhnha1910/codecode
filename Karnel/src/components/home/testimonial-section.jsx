import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel.jsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.jsx";
import React, {useEffect} from "react";

const testimonials = [
    {
        name: "John Doe",
        location: "New York, USA",
        image: "images/home/testimonial-1.jpg",
        review: "Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet"
    },
    {
        name: "John Doe",
        location: "New York, USA",
        image: "images/home/testimonial-2.jpg",
        review: "Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet"
    },
    {
        name: "John Doe",
        location: "New York, USA",
        image: "images/home/testimonial-3.jpg",
        review: "Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet"
    },
    {
        name: "John Doe",
        location: "New York, USA",
        image: "images/home/testimonial-4.jpg",
        review: "Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet"
    },
]
export default function TestimonialSection() {
    const [api, setApi] = React.useState(null)
    const [current, setCurrent] = React.useState(0)
    useEffect(() => {
        if (!api) return
        setCurrent(api.selectedScrollSnap() + 1)

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api]);
    return (
        <section className="container mx-auto py-12">
            <h1 className="text-center pb-12">What Our Clients Say</h1>
            <Carousel setApi={setApi} opts={{ align: "center", loop: true }}>
                <CarouselContent className="-ml-6">
                    {testimonials.map((testimonial, index) => (
                        <CarouselItem key={index} className="basis-1/3 pl-6">
                           <div className={`flex flex-col items-center gap-4 p-6 border-2 rounded-lg ${(index + 1) === current ? "bg-primary text-background" : ""}`}>
                               <Avatar className="h-20 w-20 border-2 border-white">
                                   <AvatarImage src={testimonial.image} />
                                   <AvatarFallback>JD</AvatarFallback>
                               </Avatar>
                               <div className="text-center">
                                   <h4 className="font-bold">{testimonial.name}</h4>
                                   <p className="[&:not(:first-child)]:mt-0">{testimonial.location}</p>
                               </div>
                               <div className="text-justify">{testimonial.review}</div>
                           </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </section>
    )
}