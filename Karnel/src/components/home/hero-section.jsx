import {useState} from "react";
import {useNavigate} from "react-router";
import {Button} from "@/components/ui/button.jsx";
import {Input} from "@/components/ui/input.jsx";
import {useSearchParams} from "react-router-dom";

export default function HeroSection() {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const handleChange = (event) => {
        event.preventDefault();
        setQuery(event.target.value);
    }
    const handleSearch = (event) => {
        event.preventDefault();
        searchParams.set("q", query)
        navigate({
            pathname: "search",
            search: searchParams.toString(),
        });
    };

    return (
        <section className="py-44 bg-[linear-gradient(rgba(20,20,31,0.7),rgba(20,20,31,0.7)),url('/images/home/bg-hero.jpg')] bg-no-repeat bg-cover bg-center">
            <div className="container mx-auto">
                <div className="flex-row justify-center items-center">
                    <div className="flex-col lg:pt-5 lg:mt-5 text-center">
                        <h2 className="text-background text-5xl font-bold mb-3 animate-in slide-in-from-top duration-500">
                            Enjoy Your Vacation With Us
                        </h2>
                        <h3 className="text-background mb-4 animate-in slide-in-from-top font-normal">
                            Tempor erat elitr rebum at clita diam amet diam et eos erat
                            ipsum lorem sit
                        </h3>
                        <div className="relative w-2/3 mx-auto animate-in slide-in-from-top">
                            <Input className="bg-background h-14 md:text-2xl" type="text" onChange={handleChange} placeholder="Eg: Thailand"/>
                            <Button className="absolute top-1/2 -translate-y-1/2 right-0 mr-3" onClick={handleSearch}>
                                Search
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}