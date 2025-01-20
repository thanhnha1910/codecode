import {Button} from "@/components/ui/button.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Textarea} from "@/components/ui/textarea.jsx";
import {Mail, MapPin, Phone} from "lucide-react";

export default function Contact() {
    return (
        <section className="container mx-auto py-20 flex flex-col gap-12">
            <h1 className="text-center">Contact For Any Query</h1>
            <div className="grid grid-cols-6 gap-x-3">
                <div className="flex flex-col lg:col-span-2 md:col-span-3 justify-between">
                    <div>
                        <h3 className="font-bold">Get In Touch</h3>
                        <p className="[&:not(:first-child)]:mt-2 font-light">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="bg-primary flex items-center p-4">
                            <MapPin className="text-white"/>
                        </div>
                        <div>
                            <h5 className="font-bold text-primary">Office</h5>
                            <p className="[&:not(:first-child)]:mt-0 font-light">391A Nam Ky Khoi Nghia, HCMC,
                                Vietnam</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="bg-primary flex items-center p-4">
                            <Phone className="text-white"/>
                        </div>
                        <div>
                            <h5 className="font-bold text-primary">Mobile</h5>
                            <p className="[&:not(:first-child)]:mt-0 font-light">+012 345 67890</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="bg-primary flex items-center p-4">
                            <Mail className="text-white"/>
                        </div>
                        <div>
                            <h5 className="font-bold text-primary">Email</h5>
                            <p className="[&:not(:first-child)]:mt-0 font-light">info@example.com</p>
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-2 md:col-span-3">
                    <iframe className="w-full h-full min-h-[320px]"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.2681250794612!2d106.67925771074641!3d10.790764589314552!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f6a752ab57b%3A0x2200ce7d4f57d1f5!2sFPT%20APTECH!5e0!3m2!1sen!2s!4v1737029255111!5m2!1sen!2s"
                            allowFullScreen="" loading="lazy" tabIndex="0" aria-hidden="false"
                            referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
                <div className="lg:col-span-2 md:col-span-6">
                    <form className="grid grid-cols-2 gap-x-4 gap-y-4 grid-rows-5 h-full">
                        <Input className="h-full bg-white" placeholder="Your Name"/>
                        <Input className="h-full bg-white" placeholder="Your Email"/>
                        <Input placeholder="Subject" className="col-span-2 h-full bg-white"/>
                        <Textarea placeholder="Message" className="col-span-2 row-span-2 h-full bg-white"/>
                        <Button type="submit" className="col-span-2 h-full">Send Message</Button>
                    </form>
                </div>
            </div>
        </section>
    );
}
