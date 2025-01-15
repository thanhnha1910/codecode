import {
    Pagination,
    PaginationContent, PaginationEllipsis,
    PaginationItem,
    PaginationLink, PaginationNext,
    PaginationPrevious
} from '@/components/ui/pagination.jsx'
import {useSearchParams} from "react-router-dom";
export default function PaginationNav({count}) {
    const [searchParams] = useSearchParams();
    let currentPage = 1;
    if (searchParams.get("page")) {
        currentPage = searchParams.get("page");
    }
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem className={Number(currentPage) <= 1 ? "invisible" : ""}>
                    <PaginationPrevious to={`?page=${Number(currentPage) - 1}`} />
                </PaginationItem>
                {/*{*/}
                {/*    Array.from({length: 3}, (_, i) => (*/}
                {/*        <PaginationItem key={i + Number(currentPage) - 1}>*/}
                {/*            <PaginationLink to={`?page=${i + Number(currentPage) - 1 }`} aria-label={`Go to page ${i + Number(currentPage) - 1}`} isActive={Number(currentPage) === i + currentPage - 1}>{i + Number(currentPage) - 1}</PaginationLink>*/}
                {/*        </PaginationItem>*/}
                {/*    ))}*/}
                {
                    Array.from({length: count}, (_, i) => (
                        <PaginationItem key={i + 1}>
                            <PaginationLink to={`?page=${i + 1 }`} aria-label={`Go to page ${i + 1}`} isActive={Number(currentPage) === i + 1}>{i + 1}</PaginationLink>
                        </PaginationItem>
                    ))}
                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem className={Number(currentPage) >= count ? "invisible" : ""}>
                    <PaginationNext to={`?page=${Number(currentPage) + 1}`} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}