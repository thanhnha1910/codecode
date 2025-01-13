import {NavigationMenu} from "@/components/ui/navigation-menu.jsx";
import {useEffect, useRef, useState} from "react";

export default function NavigationBar() {
    const [show, setShow] = useState(true);
    let lastScrollYRef = useRef(0);

    const controlNavbar = () => {
        if (window.scrollY > lastScrollYRef.current) {
            setShow(false);
        } else if (window.scrollY < lastScrollYRef.current) {
            setShow(true);
        }

        lastScrollYRef.current = window.scrollY;
    }
    useEffect(() => {
        window.addEventListener('scroll', controlNavbar);

        return () => {
            window.removeEventListener('scroll', controlNavbar);
        };
    }, []);
    return (
        <NavigationMenu className="sticky top-0">

        </NavigationMenu>
    )
}