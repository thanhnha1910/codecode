import * as React from "react"

import { cn } from "@/lib/utils"
import {Carousel, CarouselContent, CarouselNext, CarouselPrevious} from "@/components/ui/carousel.jsx";
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
        className={cn("", className)}
        {...props} />
))
CardImage.displayName = "CardImage"

const CardImageCarousel = React.forwardRef(({ alt, className, images, url, ...props }, ref) => (
    <Carousel alt={alt} ref={ref} className={cn("", className)} {...props}>
        <NavLink to={url}>
            <CarouselContent>
                {images.map((image, index) => (
                    <CardImage key={index} alt={image ? image.altText : "Placeholder"} src={image ? image.url : "/images/home/placeholder.svg"} />
                ))}
            </CarouselContent>
        </NavLink>
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
