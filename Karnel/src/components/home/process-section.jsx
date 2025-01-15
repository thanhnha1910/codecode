import {DollarSign,Globe,Plane} from 'lucide-react';
const processSteps = [
    {
        icon: <Globe />,
        title: "Choose a destination",
        description: "Tempor erat elitr rebum clita dolor diam ipsum sit diam amet diam eos erat ipsum et lorem et sit sed stet lorem sit",
    },
    {
        icon: <DollarSign />,
        title: "Pay Online",
        description: "Tempor erat elitr rebum clita dolor diam ipsum sit diam amet diam eos erat ipsum et lorem et sit sed stet lorem sit",
    },
    {
        icon: <Plane />,
        title: "Fly today",
        description: "Tempor erat elitr rebum clita dolor diam ipsum sit diam amet diam eos erat ipsum et lorem et sit sed stet lorem sit",
    },
]

export default function ProcessSection() {
    return (
        <section className="container mx-auto py-12">
            <div className="animate-in fade-in slide-in-from-bottom duration-800">
                <h1 className="text-center mb-5">3 Easy Steps</h1>
            </div>
            {processSteps.map((step, index) => {
                return (
                    <div key={index} className="relative">
                        {step.icon}
                        <div>
                            <h5>{step.title}</h5>
                            <p>{step.description}</p>
                        </div>
                    </div>
                )
            })}
        </section>
    )
}