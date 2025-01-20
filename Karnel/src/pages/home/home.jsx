import ServiceSection from "@/components/home/service-section.jsx";
import PackageSection from "@/components/home/package-section.jsx";
import DestinationSection from "@/components/home/destination-section.jsx";
import ProcessSection from "@/components/home/process-section.jsx";
import TestimonialSection from "@/components/home/testimonial-section.jsx";

export default function Home() {
    return (
        <div className="container mx-auto py-12 flex flex-col gap-12">
            <ServiceSection />
            <DestinationSection />
            <PackageSection />
            <ProcessSection />
            <TestimonialSection />
        </div>
    );
}