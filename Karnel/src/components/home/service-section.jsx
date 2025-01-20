import {Fan, Globe, Hotel, User} from 'lucide-react'

const serviceList = [
    {
        icon: <Globe size={48} className="text-primary" />,
        title: "Worldwide Tours",
        description: "Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam"
    },
    {
        icon: <Hotel size={48} className="text-primary"/>,
        title: "Hotel Reservation",
        description: "Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam"
    },
    {
        icon: <User size={48} className="text-primary"/>,
        title: "Travel Guides",
        description: "Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam"
    },
    {
        icon: <Fan size={48} className="text-primary"/>,
        title: "Event Management",
        description: "Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam"
    },
]
export default function ServiceSection() {
    return (
        <section>
            {/* Service Title */}
            <h1 className="text-center pb-12">Our Services</h1>

            {/*  Service Cards  */}
            <div className="flex gap-3">
                {serviceList.map((service, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <div className="p-4 border-2 hover:border-primary rounded-lg shadow-accent-foreground">
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