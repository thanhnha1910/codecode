import {
    Pagination,
    PaginationContent, PaginationEllipsis,
    PaginationItem,
    PaginationLink, PaginationNext,
    PaginationPrevious
} from '@/components/ui/pagination.jsx'
import {useNavigate, useSearchParams} from "react-router-dom";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.jsx";
import {Button} from "@/components/ui/button.jsx";

export default function PaginationNav({count}) {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    let currentPage = 1;
    if (searchParams.get("page")) {
        currentPage = searchParams.get("page");
    }

    const getOptions = () => {
        if (count < 3) return Array.from({length: count}, (_, i) => i + 1)
        let curr = Number(currentPage);
        if (curr === 1) return Array.from({length: 3}, (_, i) => i + curr)
        if (curr === count) return Array.from({length: 3}, (_, i) => i + curr - 2)
        return Array.from({length: 3}, (_, i) => i + curr - 1)
    }

    const onPrevious = (e) => {
        e.preventDefault();
        searchParams.set("page", Number(currentPage) - 1);
        navigate({
            search: searchParams.toString(),
        })
    }

    const onNext = (e) => {
        e.preventDefault();
        searchParams.set("page", Number(currentPage) + 1);
        navigate({
            search: searchParams.toString(),
        })
    }

    const onPageChange = (e, page) => {
        e.preventDefault();
        searchParams.set("page", page);
        navigate({
            search: searchParams.toString(),
        })
    }

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem className={Number(currentPage) <= 1 ? "invisible" : ""}>
                    <PaginationPrevious onClick={e => onPrevious(e)} />
                </PaginationItem>
                {getOptions().map((option) => (
                    <PaginationItem key={option}>
                        <PaginationLink onClick={e => onPageChange(e, option)} aria-label={`Go to page ${option}`}
                                        isActive={Number(currentPage) === option}>{option}</PaginationLink>
                    </PaginationItem>
                ))}
                <PaginationItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger><PaginationEllipsis/></DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            {Array.from({length: count}, (_, i) => i + 1).map((option, index) => (
                                <DropdownMenuItem key={index} className="p-6" >
                                    <Button onClick={e => onPageChange(e, option)}>{option}</Button>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </PaginationItem>
                <PaginationItem className={Number(currentPage) >= count ? "invisible" : ""}>
                    <PaginationNext onClick={e => onNext(e)} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}