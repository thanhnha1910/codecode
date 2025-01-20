import {DollarSign,Globe,Plane} from 'lucide-react';
const processSteps = [
    {
        icon: <Globe size={60} className="text-white"/>,
        title: "Choose a destination",
        description: "Tempor erat elitr rebum clita dolor diam ipsum sit diam amet diam eos erat ipsum et lorem et sit sed stet lorem sit",
    },
    {
        icon: <DollarSign size={60} className="text-white"/>,
        title: "Pay Online",
        description: "Tempor erat elitr rebum clita dolor diam ipsum sit diam amet diam eos erat ipsum et lorem et sit sed stet lorem sit",
    },
    {
        icon: <Plane size={60} className="text-white"/>,
        title: "Fly Today",
        description: "Tempor erat elitr rebum clita dolor diam ipsum sit diam amet diam eos erat ipsum et lorem et sit sed stet lorem sit",
    },
]

export default function ProcessSection() {
    return (
        <section>
            <h1 className="text-center mb-5">3 Easy Steps</h1>
            <div className="flex gap-4 pt-20">
                {processSteps.map((step, index) => {
                    return (
                        <div key={index} className="relative pt-16 border-2 border-primary">
                            <div className="rounded-full bg-primary absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6">
                                {step.icon}
                            </div>
                            <div className="flex flex-col bottom-0 gap-2">
                                <h4 className="text-center font-bold">{step.title}</h4>
                                <hr className="w-1/4 h-0.5 mx-auto bg-primary mt-3"/>
                                <hr className="w-1/2 h-0.5 mx-auto bg-primary"/>
                                <p className="text-justify px-5 pb-5 [&:not(:first-child)]:mt-4">{step.description}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}