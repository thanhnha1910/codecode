import {Outlet} from "react-router";
import {Sheet, SheetContent, SheetFooter, SheetHeader, SheetTrigger} from '@/components/ui/sheet.jsx'

export default function InfoLayout() {
    return (
        <section className="container mx-auto py-12">
            {/* Breadcrumb */}
{/*
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/docs/components">Components</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
*/}
            <h2 className="font-extrabold text-4xl">HOTEL INFORMATION</h2>
            <p className="pb-6">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur cumque distinctio eaque, esse eum facere, facilis molestiae mollitia, nam nihil officiis perspiciatis porro praesentium reiciendis reprehenderit sunt totam ullam voluptas?</p>
            <div className="flex justify-end py-3">
               <Sheet>
                <SheetTrigger className="border-accent border-2 hover:background/90 px-3 py-2 font-bold">SORT & FILTER</SheetTrigger>
                   <SheetContent>
                       <SheetHeader>

                       </SheetHeader>
                       <SheetFooter>

                       </SheetFooter>
                   </SheetContent>
               </Sheet>
            </div>
            <Outlet/>
        </section>
    )
}