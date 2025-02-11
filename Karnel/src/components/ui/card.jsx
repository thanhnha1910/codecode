import * as React from "react"

import { cn } from "@/lib/utils"
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel.jsx";
import {NavLink} from "react-router";

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("rounded-xl border bg-card text-card-foreground shadow", className)}
    {...props} />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props} />
))
CardHeader.displayName = "CardHeader"

const CardImage = React.forwardRef(({ alt, className, src, ...props }, ref) => (
    <img
        alt={alt}
        src={src}
        ref={ref}
        className={cn("object-cover", className)}
        {...props} />
))
CardImage.displayName = "CardImage"

const CardImageCarousel = React.forwardRef(({ alt, className, images, ...props }, ref) => (
    <Carousel alt={alt} ref={ref} className={cn("min-h-[200px]", className)} {...props}>
        <CarouselContent>
            {images.map((image, index) => (
                <CarouselItem key={index}>
                    <CardImage className="w-full h-full" alt={image ? image.altText : "Placeholder"} src={image ? (`http://localhost:5128/` + image.url) : "/images/home/placeholder.svg"} />
                </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious className="left-3 z-10" />
        <CarouselNext className="right-3 z-10"/>
    </Carousel>
))
CardImageCarousel.displayName = "CardImageCarousel"

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props} />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props} />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props} />
))
CardFooter.displayName = "CardFooter"

export { Card, CardImage, CardImageCarousel, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
