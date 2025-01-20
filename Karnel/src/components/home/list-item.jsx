import React from "react";
import {NavigationMenuLink} from "@/components/ui/navigation-menu.jsx";
import {cn} from "@/lib/utils.js";
import {NavLink} from "react-router";

export const ListItem = React.forwardRef(({className, title, children, ...props}, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <NavLink
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 align-middle py-2 px-5 rounded-md leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </NavLink>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"