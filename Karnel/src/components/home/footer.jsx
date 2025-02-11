import {Link} from "react-router";
import {ChevronRight, MapPin, Mail, Phone, Facebook, Youtube, Twitter, Linkedin} from "lucide-react";
import {Separator} from "@/components/ui/separator.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Input} from "@/components/ui/input.jsx";

const footerLinks = [
    {
        title: "About Us",
        href: "/about",
    },
    {
        title: "Contact Us",
        href: "/contact",
    },
    
    {
        title: "Terms & Condition",
        href: "/info/term",
    },
    
]
export default function Footer() {
    return (
        <footer className="bg-foreground text-background py-12 animate-in fade-in">
            <div className="container mx-auto">
                <div className="pb-3 flex">
                    {/* First column: Company */}
                    <div className="flex-col flex-1">
                        <h4 className="pb-6">Company</h4>
                        {footerLinks.map((link) => {
                            return (
                                <Link key={link.title} to={link.href} className="flex items-center hover:text-accent hover:tracking-wider duration-300 py-2 w-fit">
                                    <ChevronRight />
                                    {link.title}
                                </Link>
                            )
                        })}
                    </div>

                    {/* Second column: Contact */}
                    <div className="flex-row flex-1">
                        <h4 className="pb-6">Contacts</h4>
                        <div className="flex-col flex gap-4">
                            <div className="flex gap-3">
                                <MapPin className="text-primary"/>
                                391 NKKN, HCMC, Vietnam
                            </div>

                            <div className="flex gap-3">
                                <Phone className="text-primary"/>
                                +012 345 67890
                            </div>

                            <div className="flex gap-3">
                                <Mail className="text-primary"/>
                                info@example.com
                            </div>
                        </div>

                        <div className="pt-4 flex gap-1">
                            <Button variant="outline" size="icon" asChild className="bg-foreground rounded-full">
                                <Link to="https://www.twitter.com">
                                    <Twitter className=""/>
                                </Link>
                            </Button>
                            <Button variant="outline" size="icon" asChild className="bg-foreground rounded-full">
                                <Link to="https://www.facebook.com">
                                    <Facebook className=""/>
                                </Link>
                            </Button>
                            <Button variant="outline" size="icon" asChild className="bg-foreground rounded-full">
                                <Link to="https://www.youtube.com">
                                    <Youtube className=""/>
                                </Link>
                            </Button>
                            <Button variant="outline" size="icon" asChild className="bg-foreground rounded-full">
                                <Link to="https://www.twitter.com">
                                    <Linkedin className=""/>
                                </Link>
                            </Button>
                        </div>
                    </div>

                    {/* Third column: Gallery */}
                    <div className="flex-1">
                        <h4 className="pb-6">Gallery</h4>
                        <div className="grid grid-cols-3">
                            <div className="col-4">
                                <img
                                    className="img-fluid bg-light p-1 max-h-[200px]"
                                    src="images/home/package-1.jpg"
                                    alt=""
                                />
                            </div>
                            <div className="col-4">
                                <img
                                    className="img-fluid bg-light p-1 max-h-[200px]"
                                    src="images/home/package-2.jpg"
                                    alt=""
                                />
                            </div>
                            <div className="col-4">
                                <img
                                    className="img-fluid bg-light p-1"
                                    src="images/home/package-3.jpg"
                                    alt=""
                                />
                            </div>
                            <div className="col-4">
                                <img
                                    className="img-fluid bg-light p-1 max-h-[200px]"
                                    src="images/home/package-3.jpg"
                                    alt=""
                                />
                            </div>
                            <div className="col-4">
                                <img
                                    className="img-fluid bg-light p-1 max-h-[200px]"
                                    src="images/home/package-2.jpg"
                                    alt=""
                                />
                            </div>
                            <div className="col-4">
                                <img
                                    className="img-fluid bg-light p-1 max-h-[200px]"
                                    src="images/home/package-1.jpg"
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <Separator className="bg-gray-600"/>

                {/* Copyright */}
                <div className="flex justify-between pt-4">
                    <div>
                        &copy;{" "}
                        <Link className="underline hover:text-accent" to="/">
                            Karnel Travel Guide
                        </Link>
                        , All Right Reserved.
                    </div>
                    <div className="flex gap-4">
                        <Link to="/" className="hover:text-accent">
                            Home
                        </Link>
                        <Separator orientation="vertical" className="bg-gray-600 "/>
                        <Link to="/cookies" className="hover:text-accent">
                            Cookies
                        </Link>
                        <Separator orientation="vertical" className="bg-gray-600"/>
                        <Link to="/help" className="hover:text-accent">
                            Help
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}