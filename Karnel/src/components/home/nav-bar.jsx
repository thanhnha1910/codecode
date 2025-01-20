import {
    NavigationMenu, NavigationMenuContent,
    NavigationMenuItem, NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger, navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu.jsx";
import {useEffect, useRef, useState} from "react";
import {NavLink, Link, useNavigate} from "react-router";
import {Button} from "@/components/ui/button.jsx";
import {ListItem} from "@/components/home/list-item.jsx";
import {MapPin} from "lucide-react";
import {useUser} from "@/contexts/UserProvider.jsx";
import {toast} from "react-toastify";

const pageList = [
    {
        title: "Home",
        href: "/",
    },
    {
        title: "About",
        href: "/about",
    },
    {
        title: "Search",
        href: "/search",
    },
    {
        title: "Information",
        items: [
            {
                title: "Tourist Spots",
                href: "info/attractions",
            },
            {
                title: "Hotels",
                href: "info/hotels",
            },
            {
                title: "Resorts",
                href: "info/resorts",
            },
            {
                title: "Restaurants",
                href: "info/restaurants",
            },
            {
                title: "Transportations",
                href: "info/transportations",
            }
        ]
    },
    {
        title: "Contact",
        href: "/contact",
    }
]

export default function NavigationBar() {
    const navigate = useNavigate();
    const { user, setUser } = useUser();
    const [show, setShow] = useState(true);
    let lastScrollYRef = useRef(0);
    const controlNavbar = () => {
        if (window.scrollY > lastScrollYRef.current) {
            setShow(false);
        } else {
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
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        toast.success("Logged out successfully");
        navigate("/login");
        console.log("Current user in HomeLayout:", user); // Thêm log để kiểm tra
    };
    return (
        <header
            className={`${show ? 'animate-in slide-in-from-top visible' : 'animate-out slide-out-to-top invisible'} sticky transition-visibility delay-300 duration-500 ease-in-out inset-x-0 top-0 flex justify-between items-center px-4 py-3 border-b bg-background z-10`}>
            <Link to="/test">
                <div className="flex items-center gap-2">
                    <img src="/karnel.svg" alt="Karnel Logo" className="h-10 mb-2" />
                    <h1 className="text-primary font-bold italic">Karnel</h1>
                </div>
            </Link>

            <NavigationMenu>
                <NavigationMenuList>
                    {pageList.map((page) => {
                        if (page.items) {
                            return (
                                <NavigationMenuItem key={page.title}>
                                    <NavigationMenuTrigger
                                        className="text-xl font-semibold">{page.title}</NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul>
                                            {page.items.map((item) => {
                                                return (
                                                    <ListItem key={item.title} to={item.href}
                                                              title={item.title}></ListItem>
                                                )
                                            })}
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            )
                        } else {
                            return (
                                <NavigationMenuItem key={page.title}>
                                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                        <NavLink to={page.href} className="text-xl font-semibold">{page.title}</NavLink>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            )
                        }
                    })}
                </NavigationMenuList>
            </NavigationMenu>

            {user ? (
                <div className="flex items-center ms-4">
                    <NavLink to="/profile" className="nav-link">
                        <img
                            src={user.avatar || "/img/User_icon_2.svg.png"}
                            alt="Profile"
                            className="rounded-circle"
                            style={{
                                width: "40px",
                                height: "40px",
                                objectFit: "cover",
                            }}
                        />
                    </NavLink>
                    <Button onClick={handleLogout}>Logout</Button>
                </div>
            ) : (
                <div className="gap-3 flex items-center">
                    <Button asChild variant="outline">
                        <Link to="/login">Login</Link>
                    </Button>

                    <Button asChild>
                        <Link to="/register">Register</Link>
                    </Button>
                </div>
            )}
        </header>
    )
}