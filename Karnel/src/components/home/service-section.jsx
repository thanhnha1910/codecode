import {Fan, Globe, Hotel, User} from 'lucide-react'

const serviceList = [
    {
        icon: <Globe size={48} className="text-primary hover:text-primary/90" />,
        title: "Worldwide Tours",
        description: "Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam"
    },
    {
        icon: <Hotel size={48} className="text-primary hover:text-primary/90"/>,
        title: "Hotel Reservation",
        description: "Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam"
    },
    {
        icon: <User size={48} className="text-primary hover:text-primary/90"/>,
        title: "Travel Guides",
        description: "Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam"
    },
    {
        icon: <Fan size={48} className="text-primary hover:text-primary/90"/>,
        title: "Event Management",
        description: "Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam"
    },
]
export default function ServiceSection() {
    return (
        <section className="container mx-auto py-12">

            {/* Service Title */}
            <div className="animate-in fade-in slide-in-from-bottom duration-800">
                <h1 className="text-center mb-5">Our Services</h1>
            </div>

            {/*  Service Cards  */}
            <div className="flex gap-3">
                {serviceList.map((service, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <div className="animate-in fade-in slide-in-from-bottom duration-1000 p-4 border-2 hover:border-primary rounded-lg shadow-accent-foreground">
                            {service.icon}
                            <h4 className="py-3">{service.title}</h4>
                            <p className="[&:not(:first-child)]:mt-0">{service.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}