import {Outlet} from "react-router";

export default function InfoLayout() {
    return (
        <div className="container">
            <h1 className="font-bold text-4xl my-4">Information</h1>
            <p className="mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>

            <div className="flex justify-between items-center py-2">
                    <span
                        className="badge rounded-pill text-bg-light text-base flex items-center gap-2">Category <button
                        type="button"
                        className="btn-close text-sm"
                        aria-label="Close"></button></span>
                <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                    SORT & FILTER
                </button>
            </div>
            <hr className="mb-4"/>
            <Outlet/>

            {/* Pagination */}
            <nav aria-label="Page navigation example" className="flex justify-center">
                <ul className="pagination">
                    <li className="page-item">
                        <a className="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    <li className="page-item active"><a className="page-link" href="#">1</a></li>
                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                    <li className="page-item">
                        <a className="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>

            <div className="offcanvas offcanvas-end min-w-[450px]" data-bs-scroll="true" data-bs-backdrop="true"
                 tabIndex="-1"
                 id="offcanvasExample"
                 aria-labelledby="offcanvasExampleLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title font-bold text-xl" id="offcanvasExampleLabel">Sort & Filter</h5>
                    <div className="flex items-center gap-2">
                        <a href="#" className="underline font-light">Clear all</a>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas"
                                aria-label="Close"></button>
                    </div>
                </div>
                <div className="offcanvas-body p-0">
                    <div className="border-y-2 py-2.5 px-3">
                        <button className="flex justify-between w-full" type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                            <span className="font-bold text-sm">CATEGORY</span>
                            <i className="fa-solid fa-chevron-down"></i>
                        </button>

                        <div className="collapse" id="collapseExample">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    Default checkbox
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked"
                                       checked/>
                                <label className="form-check-label" htmlFor="flexCheckChecked">
                                    Checked checkbox
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="border-y-2 py-2.5 px-3">
                        <button className="flex justify-between w-full" type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#priceFilter" aria-expanded="false" aria-controls="priceFilter">
                            <span className="font-bold text-sm">PRICE</span>
                            <i className="fa-solid fa-chevron-down"></i>
                        </button>

                        <div className="collapse" id="priceFilter">
                            <input type="range" className="form-range" min="0" max="5" step="0.5" id="customRange3"/>
                        </div>
                    </div>
                </div>

                <div className="d-flex justify-content-center">
                    <div className="align-self-center p-3 w-full">
                        <button className="btn btn-dark w-full">APPLY</button>
                    </div>
                </div>
            </div>

        </div>
    )
}