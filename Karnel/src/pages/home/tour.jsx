export default function Tour() {
    return (
        <div className="container">
            <div className="flex flex-wrap justify-between pb-8 pt-6 mb-8 border-b border-stock-1">
                <div className="pt-2">
                    <h3 className="lg:text-2xl md:text-xl text-lg text-dark-1 leading-[1.42] font-medium">Cusco &amp; Salkantay
                        Trekking to Machu Picchu</h3>
                    <div className="flex items-center mt-2">
                        <ul className="flex lg:gap-3 gap-2 text-primary-1 mr-3 text-sm">
                            <li><i className="bi bi-star-fill"></i></li>
                            <li><i className="bi bi-star-fill"></i></li>
                            <li><i className="bi bi-star-fill"></i></li>
                            <li><i className="bi bi-star-fill"></i></li>
                            <li><i className="bi bi-star-half"></i></li>
                        </ul>
                        <span className="text-primary-1 lg:text-2md text-md">(20 review)</span>
                    </div>
                </div>
                <div className="pt-2">
                    <h2 className="font-sans lg:text-[45px] leading-1.2 md:text-xl text-lg font-semibold">$175
                    </h2>
                    <div className="text-md font-normal ml-1">per person</div>
                </div>
            </div>
            <div className="grid grid-cols-12 gap-base">
                <div className="lg:col-span-8 col-span-12">
                    <div className="pack__disc">
                        <h5 className="lg:text-2md text-md text-dark-2 font-medium leading-[1.5] font-sans mb-6">Lorem
                            omnes
                            impedit ius, vel et hinc agam fabulas. Ut audiam invenire iracundia vim. Tn eam dimo diam
                            ea. Piber Korem sit amet.</h5>
                        <p>Al elit omnes impedit ius, vel et hinc agam fabulas. Ut audiam invenire iracundia vim. En eam
                            dico similique, ut sint posse sit, eum sumo diam ea. Liber consectetuer in mei, sea in
                            imperdiet assueverit contentiones, an his cibo blandit tacimates. Iusto iudicabit similique
                            id velex, in sea rebum deseruisse appellantur. Lorem ipsum Alienum phaedrum torquatos nec
                            eu, vis detraxit pericu in mei, vix aperiri vix at,dolor sit amet.</p>

                        <ul className="pack__list flex gap-4 my-3">
                            <li><i className="bi bi-clock mr-2"></i> 4 Days / 5 Night</li>
                            <div className="vr"></div>
                            <li><i className="bi bi-person mr-2"></i>Max People : 10</li>
                            <div className="vr"></div>
                            <li><i className="bi bi-map mr-2"></i>North Transylvania</li>
                        </ul>

                        <ul className="mt-base">
                        <li className="lg:flex lg:pt-6 pt-5 pb-5 lg:pb-6 border-t border-stock-1 last:border-b">
                                <div className="lg:w-1/3 lg:text-2md text-md text-dark-2 font-medium">
                                    Price Includes
                                </div>
                                <div className="lg:w-2/3 lg:mt-0 mt-4">
                                    <ul className="lg:grid flex flex-wrap grid-cols-2 lg:gap-y-5 gap-y-3 gap-x-3">
                                        <li className="col-span-1 text-dark-3 text-sm lg:text-base flex items-center">
                                            <div className="text-primary-1 lg:text-md text-base mr-2">
                                                <i className="bi bi-check2"></i>
                                            </div>
                                            <span>3 Nights Accommodation</span>
                                        </li>
                                        <li className="col-span-1 text-dark-3 text-sm lg:text-base flex items-center">
                                            <div className="text-primary-1 lg:text-md text-base mr-2">
                                                <i className="bi bi-check2"></i>
                                            </div>
                                            <span>Airport Transfers</span>
                                        </li>
                                        <li className="col-span-1 text-dark-3 text-sm lg:text-base flex items-center">
                                            <div className="text-primary-1 lg:text-md text-base mr-2">
                                                <i className="bi bi-check2"></i>
                                            </div>
                                            <span>2 Meals / day</span>
                                        </li>
                                        <li className="col-span-1 text-dark-3 text-sm lg:text-base flex items-center">
                                            <div className="text-primary-1 text-md mr-2">
                                                <i className="bi bi-check2"></i>
                                            </div>
                                            <span>Box Lunch, Dinner &amp; Snacks.</span>
                                        </li>
                                        <li className="col-span-1 text-dark-3 text-sm lg:text-base flex items-center">
                                            <div className="text-primary-1 text-md mr-2">
                                                <i className="bi bi-check2"></i>
                                            </div>
                                            <span>On Trip Transport</span>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="lg:flex lg:pt-6 pt-5 pb-5 lg:pb-6 border-t border-stock-1 last:border-b">
                                <div className="lg:w-1/3 lg:text-2md text-md text-dark-2 font-medium">
                                    Price Excludes
                                </div>
                                <div className="lg:w-2/3 lg:mt-0 mt-4">
                                    <ul className="lg:grid flex flex-wrap grid-cols-2 lg:gap-y-5 gap-y-3 gap-x-3">
                                        <li className="col-span-1 text-dark-3 text-sm lg:text-base flex items-center">
                                            <div className="text-primary-1 lg:text-md text-base mr-2">
                                                <i className="bi bi-check2"></i>
                                            </div>
                                            <span>Departure Taxes</span>
                                        </li>
                                        <li className="col-span-1 text-dark-3 text-sm lg:text-base flex items-center">
                                            <div className="text-primary-1 lg:text-md text-base mr-2">
                                                <i className="bi bi-check2"></i>
                                            </div>
                                            <span>Airport Transfers</span>
                                        </li>
                                        <li className="col-span-1 text-dark-3 text-sm lg:text-base flex items-center">
                                            <div className="text-primary-1 lg:text-md text-base mr-2">
                                                <i className="bi bi-check2"></i>
                                            </div>
                                            <span>Entry Fees</span>
                                        </li>
                                        <li className="col-span-1 text-dark-3 text-sm lg:text-base flex items-center">
                                            <div className="text-primary-1 text-md mr-2">
                                                <i className="bi bi-check2"></i>
                                            </div>
                                            <span>Box Lunch, Dinner &amp; Snacks.</span>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>

                        <div className="mt-6">
                            <h3>Some Photo</h3>
                            <p>Duis id interdum ex, eu accumsan massa. Fusce vel nibh diam. Nulla ultrices ex at erat
                                pharetra, vitae viverra mauris condimentum. Sed ullamcorper dignissim enim, vel egestas
                                lacus tincidunt ac. Duis id interdum ex, eu accumsan massa. Fusce vel nibh diam.</p>
                            <div className="grid grid-cols-3 gap-3 mt-2 pr-3">
                                <div className="col-span-1">
                                    <a href="./assets/images/details/g1.webp" data-fancybox="details">
                                        <img src="img/placeholder.svg" alt="details" className="w-full"/>
                                    </a>
                                </div>
                                <div className="col-span-1">
                                    <a href="./assets/images/details/g2.webp" data-fancybox="details">
                                        <img src="img/placeholder.svg" alt="details" className="w-full"/>
                                    </a>
                                </div>
                                <div className="col-span-1">
                                    <a href="./assets/images/details/g3.webp" data-fancybox="details">
                                        <img src="img/placeholder.svg" alt="details" className="w-full"/>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="lg:pt-10 pt-8">
                            <h3 className="font-bold text-3xl">Tour Plan</h3>
                            <p className="my-3">Duis id interdum ex, eu accumsan massa. Fusce vel nibh diam. Nulla ultrices ex at erat
                                pharetra, vitae viverra mauris condimentum. Sed ullamcorper dignissim enim, vel egestas
                                lacus tincidunt ac. Duis id interdum ex, eu accumsan massa. Fusce vel nibh diam.</p>

                            <div>

                                <div className="flex single__count">
                                    <div className="shrink-0 day__count">
                                        <div
                                            className="lg:w-[52px] lg:h-[52px] w-10 h-10 rounded-full border border-primary-1 flex justify-center items-center lg:text-lg md:2md text-md font-semibold text-primary-1 bg-white">
                                            01
                                        </div>
                                    </div>
                                    <div className="lg:ml-[18px] ml-4 pb-8">
                                        <h5 className="lg:text-[22px] text-md font-semibold text-dark-1 !lg:mt-[10px] !mt-2">
                                            Day 01 : Welcome to Edinburgh</h5>
                                        <p>Qui ad idque soluta deterruisset, nec sale pertinax mandamus et. Eu mei
                                            soluta scriptorem dissentiet, sensibus cotidieque. Ne per malorum vivendum
                                            principes, congue imperdiet cu vel. Sit cu stet autem eligendi, eros
                                            reprimique mel id, no pri tation altera. At soluta fierent laboramus eum.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex single__count">
                                    <div className="shrink-0 day__count">
                                        <div
                                            className="lg:w-[52px] lg:h-[52px] w-10 h-10 rounded-full border border-primary-1 flex justify-center items-center lg:text-lg md:2md text-md font-semibold text-primary-1 bg-white">
                                            02
                                        </div>
                                    </div>
                                    <div className="lg:ml-[18px] ml-4 pb-8">
                                        <h5 className="lg:text-[22px] text-md font-semibold text-dark-1 !lg:mt-[10px] !mt-2">
                                            Day 02: Adventure Begins</h5>
                                        <p>Qui ad idque soluta deterruisset, nec sale pertinax mandamus et. Eu mei
                                            soluta scriptorem dissentiet, sensibus cotidieque. Ne per malorum vivendum
                                            principes.</p>
                                        <ul>
                                            <li><i className="bi bi-check-circle"></i> Professional Tour Guide</li>
                                            <li><i className="bi bi-check-circle"></i>Transportation cost for carrying
                                                new
                                                materials/parts
                                            </li>
                                            <li><i className="bi bi-check-circle"></i>Transportation cost for carrying
                                                new
                                                materials/parts
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="flex single__count">
                                    <div className="shrink-0 day__count">
                                        <div
                                            className="lg:w-[52px] lg:h-[52px] w-10 h-10 rounded-full border border-primary-1 flex justify-center items-center lg:text-lg md:2md text-md font-semibold text-primary-1 bg-white">
                                            03
                                        </div>
                                    </div>
                                    <div className="lg:ml-[18px] ml-4 pb-8">
                                        <h5 className="lg:text-[22px] text-md font-semibold text-dark-1 !lg:mt-[10px] !mt-2">
                                            Day 03: Historical Tour</h5>
                                        <p>Qui ad idque soluta deterruisset, nec sale pertinax mandamus et. Eu mei
                                            soluta scriptorem dissentiet, sensibus cotidieque. Ne per malorum vivendum
                                            principes.</p>
                                        <ul className="list-sm">
                                            <li><i className="bi-check2"></i> 3 Nights Accommodation</li>
                                            <li><i className="bi-check2"></i> 2 Meals / day</li>
                                            <li><i className="bi-check2"></i> Breakfast</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="flex single__count ">
                                    <div className="shrink-0 day__count">
                                        <div
                                            className="lg:w-[52px] lg:h-[52px] w-10 h-10 rounded-full border border-primary-1 flex justify-center items-center lg:text-lg md:2md text-md font-semibold text-primary-1 bg-white">
                                            04
                                        </div>
                                    </div>
                                    <div className="lg:ml-[18px] ml-4 pb-8">
                                        <h5 className="lg:text-[22px] text-md font-semibold text-dark-1 !lg:mt-[10px] !mt-2">
                                            Day 05: Return</h5>
                                        <p>Qui ad idque soluta deterruisset, nec sale pertinax mandamus et. Eu mei
                                            soluta scriptorem dissentiet, sensibus cotidieque. Ne per malorum vivendum
                                            principes, congue imperdiet cu vel. Sit cu stet autem eligendi, eros
                                            reprimique mel id, no pri tation altera. At soluta fierent laboramus eum.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:pt-10 pt-8">
                            <h3>Gallery</h3>
                            <p>Duis id interdum ex, eu accumsan massa. Fusce vel nibh diam. Nulla ultrices ex at erat
                                pharetra, vitae viverra mauris condimentum. Sed ullamcorper dignissim enim, vel egestas
                                lacus tincidunt ac. Duis id interdum ex, eu accumsan massa. Fusce vel nibh diam.</p>
                            <div className="masonry-container">
                                <div className="masonry-item relative group overflow-hidden">
                                    <img src="" alt="details"
                                         className="object-cover duration-200 group-hover:scale-[103%]"/>
                                    <a href="img/placeholder.svg" data-fancybox="details"
                                       className="inset-0 absolute bg-dark-1 bg-opacity-30 opacity-0 top-0 left-0 flex duration-200 hover:opacity-100 justify-center items-center">
                                        <div
                                            className="lg:h-10 lg:w-10 w-9 h-9 bg-primary-1 text-white rounded-full inline-flex justify-center items-center text-2md">
                                            <i className="bi bi-camera"></i>
                                        </div>
                                    </a>
                                </div>
                                <div className="masonry-item relative group overflow-hidden">
                                    <img src="" alt="details"
                                         className="object-cover duration-200 group-hover:scale-[103%]"/>
                                    <a href="img/placeholder.svg" data-fancybox="details"
                                       className="inset-0 absolute bg-dark-1 bg-opacity-30 opacity-0 top-0 left-0 flex duration-200 hover:opacity-100 justify-center items-center">
                                        <div
                                            className="lg:h-10 lg:w-10 w-9 h-9 bg-primary-1 text-white rounded-full inline-flex justify-center items-center text-2md">
                                            <i className="bi bi-camera"></i>
                                        </div>
                                    </a>
                                </div>
                                <div className="masonry-item relative group overflow-hidden">
                                    <img src="" alt="details"
                                         className="object-cover duration-200 group-hover:scale-[103%]"/>
                                    <a href="img/placeholder.svg" data-fancybox="details"
                                       className="inset-0 absolute bg-dark-1 bg-opacity-30 opacity-0 top-0 left-0 flex duration-200 hover:opacity-100 justify-center items-center">
                                        <div
                                            className="lg:h-10 lg:w-10 w-9 h-9 bg-primary-1 text-white rounded-full inline-flex justify-center items-center text-2md">
                                            <i className="bi bi-camera"></i>
                                        </div>
                                    </a>
                                </div>
                                <div className="masonry-item relative group overflow-hidden">
                                    <img src="" alt="details"
                                         className="object-cover duration-200 group-hover:scale-[103%]"/>
                                    <a href="img/placeholder.svg" data-fancybox="details"
                                       className="inset-0 absolute bg-dark-1 bg-opacity-30 opacity-0 top-0 left-0 flex duration-200 hover:opacity-100 justify-center items-center">
                                        <div
                                            className="lg:h-10 lg:w-10 w-9 h-9 bg-primary-1 text-white rounded-full inline-flex justify-center items-center text-2md">
                                            <i className="bi bi-camera"></i>
                                        </div>
                                    </a>
                                </div>
                                <div className="masonry-item relative group overflow-hidden">
                                    <img src="" alt="details"
                                         className="object-cover duration-200 group-hover:scale-[103%]"/>
                                    <a href="img/placeholder.svg" data-fancybox="details"
                                       className="inset-0 absolute bg-dark-1 bg-opacity-30 opacity-0 top-0 left-0 flex duration-200 hover:opacity-100 justify-center items-center">
                                        <div
                                            className="lg:h-10 lg:w-10 w-9 h-9 bg-primary-1 text-white rounded-full inline-flex justify-center items-center text-2md">
                                            <i className="bi bi-camera"></i>
                                        </div>
                                    </a>
                                </div>
                                <div className="masonry-item relative group overflow-hidden">
                                    <img src="" alt="details"
                                         className="object-cover duration-200 group-hover:scale-[103%]"/>
                                    <a href="img/placeholder.svg" data-fancybox="details"
                                       className="inset-0 absolute bg-dark-1 bg-opacity-30 opacity-0 top-0 left-0 flex duration-200 hover:opacity-100 justify-center items-center">
                                        <div
                                            className="lg:h-10 lg:w-10 w-9 h-9 bg-primary-1 text-white rounded-full inline-flex justify-center items-center text-2md">
                                            <i className="bi bi-camera"></i>
                                        </div>
                                    </a>
                                </div>
                                <div className="masonry-item relative group overflow-hidden">
                                    <img src="" alt="details"
                                         className="object-cover duration-200 group-hover:scale-[103%]"/>
                                    <a href="img/placeholder.svg" data-fancybox="details"
                                       className="inset-0 absolute bg-dark-1 bg-opacity-30 opacity-0 top-0 left-0 flex duration-200 hover:opacity-100 justify-center items-center">
                                        <div
                                            className="lg:h-10 lg:w-10 w-9 h-9 bg-primary-1 text-white rounded-full inline-flex justify-center items-center text-2md">
                                            <i className="bi bi-camera"></i>
                                        </div>
                                    </a>
                                </div>
                                <div className="masonry-item relative group overflow-hidden">
                                    <img src="" alt="details"
                                         className="object-cover duration-200 group-hover:scale-[103%]"/>
                                    <a href="img/placeholder.svg" data-fancybox="details"
                                       className="inset-0 absolute bg-dark-1 bg-opacity-30 opacity-0 top-0 left-0 flex duration-200 hover:opacity-100 justify-center items-center">
                                        <div
                                            className="lg:h-10 lg:w-10 w-9 h-9 bg-primary-1 text-white rounded-full inline-flex justify-center items-center text-2md">
                                            <i className="bi bi-camera"></i>
                                        </div>
                                    </a>
                                </div>
                                <div className="masonry-item relative group overflow-hidden">
                                    <img src="" alt="details"
                                         className="object-cover duration-200 group-hover:scale-[103%]"/>
                                    <a href="img/placeholder.svg" data-fancybox="details"
                                       className="inset-0 absolute bg-dark-1 bg-opacity-30 opacity-0 top-0 left-0 flex duration-200 hover:opacity-100 justify-center items-center">
                                        <div
                                            className="lg:h-10 lg:w-10 w-9 h-9 bg-primary-1 text-white rounded-full inline-flex justify-center items-center text-2md">
                                            <i className="bi bi-camera"></i>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="lg:pt-10 pt-8">
                            <h3 className="lg:text-2xl md:text-xl text-lg text-dark-1 leading-[1.42] font-medium mt-[10px] !mb-base">
                                02 Comment’s</h3>

                            <ul>
                                <li className="bg-[#FFE3EB] bg-opacity-50 lg:px-base px-5 lg:py-base py-5 flex md:flex-row flex-col">
                                    <div className="md:mr-5 mb-4 md:mb-0 lg:w-[100px] w-16 shrink-0">
                                        <img src="./assets/images/blog/com-2.webp" alt="commentor" className="w-full"/>
                                    </div>
                                    <div className="grow">
                                        <div className="flex justify-between items-center">
                                            <h5 className="text-dark-1 lg:text-2md text-md font-medium !mt-0 !mb-0">Jahid
                                                Hassan</h5>
                                            <a href="#" className="flex text-primary-1 gap-[6px] lg:text-md">
                                                <div className="bi bi-reply"></div>
                                                Reply
                                            </a>
                                        </div>
                                        <p className="regular-text-v1 lg:mt-3 mt-2 !leading-[1.6] !pb-0">Duis id
                                            interdum
                                            ex, eu accumsan massa. Fusce vel nibh diam. Nulla ultrices ex at erat
                                            pharetra, vitae viverra mauris condimentum. Sed ullamcorper dignissim enim,
                                            vel egestas lacus tincidunt ac.</p>
                                    </div>
                                </li>
                                <ul className="lg:mt-[35px] mt-7 lg:ml-10 ml-8">
                                    <li className="bg-[#FFE3EB] bg-opacity-50 lg:px-base px-5 lg:py-base py-5 flex md:flex-row flex-col">
                                        <div className="md:mr-5 mb-4 md:mb-0 lg:w-[100px] w-16 shrink-0">
                                            <img src="./assets/images/blog/com-1.webp" alt="commentor"
                                                 className="w-full"/>
                                        </div>
                                        <div className="grow">
                                            <div className="flex justify-between items-center">
                                                <h5 className="text-dark-1 lg:text-2md text-md font-medium !mt-0 !mb-0">
                                                    Alisha Lehmann</h5>
                                                <a href="#" className="flex text-primary-1 gap-[6px] lg:text-md">
                                                    <div className="bi bi-reply"></div>
                                                    Reply
                                                </a>
                                            </div>
                                            <p className="regular-text-v1 lg:mt-3 mt-2 !leading-[1.6] !pb-0">Duis id
                                                interdum ex, eu accumsan massa. Fusce vel nibh diam. Nulla ultrices ex
                                                at erat pharetra, vitae viverra mauris condimentum. Sed ullamcorper
                                                dignissim enim, vel egestas lacus tincidunt ac.</p>
                                        </div>
                                    </li>
                                </ul>
                            </ul>
                        </div>
                        <form action="#" className="lg:pt-10 pt-8">
                            <h3 className="lg:text-2xl md:text-xl text-lg text-dark-1 leading-[1.42] font-medium mt-[10px] !mb-base">
                                Post A Comments</h3>
                            <div className="grid grid-cols-2 gap-base">
                                <div className="lg:col-span-1 col-span-2">
                                    <input type="text" placeholder="Your Name" className="input_style__primary"/>
                                </div>
                                <div className="lg:col-span-1 col-span-2">
                                    <input type="text" placeholder="Your Phone Number"
                                           className="input_style__primary"/>
                                </div>
                                <div className="col-span-2">
                                    <input type="email" placeholder="Your Subject" className="input_style__primary"/>
                                </div>
                                <div className="col-span-2">
                                    <textarea cols="30" rows="6" className="input_style__primary"
                                              placeholder="Your Subject..."></textarea>
                                </div>
                                <div className="col-span-2">
                                    <button type="submit" className="btn_primary__v1">
                                        Find Out More
                                        <i className="bi bi-chevron-right"></i>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="lg:col-span-4 col-span-12 ">
                    <ul id="tabs-nav" className="booking-tabs flex gap-4 pb-6">
                        <li className="tab-link active basis-1/2" data-tab="3">Booking</li>
                        <li className="tab-link basis-1/2" data-tab="4">Enquiry</li>
                    </ul>
                    <div id="tab-3" className="tab-content active">
                        <form action="#" autoComplete="off"
                              className="lg:px-base px-5 lg:pt-6 lg:pb-base pt-4 pb-5 bg-white border-primary-1 border">

                            <h4 className="lg:text-xl text-lg text-dark-1 font-semibold"><span
                                className="text-md font-sans font-normal text-dark-3">Start from</span> $175</h4>
                            <div className="mt-5 lg:mt-6">
                                <label htmlFor="tourTime" className="mb-2 text-dark-3 capitalize block">Date</label>
                                <input type="text" id="tourTime" name="daterange" className="input_style__primary"
                                       placeholder="Select Date"/>
                            </div>

                            <div className="js-form-counters lg:mt-6 mt-5 relative">
                                <label htmlFor="tourTime" className="mb-2 text-dark-3 capitalize block">Number of
                                    travelers</label>
                                <button type="button"
                                        className="w-full bg-transparent border border-stock-1 lg:h-[54px] h-12 px-5 py-2 text-dark-2 focus:border-primary-1 flex items-center common_dropdown__btn">
                                    <div>
                                        <span className="js-count-adult">1</span> adults
                                        -
                                        <span className="js-count-child">0</span> childeren
                                        -
                                        <span className="js-count-room">1</span> room
                                    </div>
                                </button>

                                <div
                                    className="common__dropdown person-dropdown space-y-4 opacity-0 absolute w-full left-0 top-full invisible bg-white translate-y-3 duration-200 z-10">

                                    <div className="js-counter flex justify-between items-center"
                                         data-value-change=".js-count-adult">
                                        <p className="text-dark-1">Adult</p>
                                        <div className="flex items-center space-x-4">
                                            <button type="button"
                                                    className="js-down h-[38px] w-[38px] border border-primary-1 flex items-center justify-center rounded-full text-dark-1 hover:bg-primary-1 hover:text-white duration-150">
                                                <i className="bi bi-dash-lg"></i>
                                            </button>

                                            <div className="js-count text-dark-1 lg:ext-md">2</div>

                                            <button type="button"
                                                    className="js-up h-[38px] w-[38px] border border-primary-1 flex items-center justify-center rounded-full text-dark-1 hover:bg-primary-1 hover:text-white duration-150">
                                                <i className="bi bi-plus-lg"></i>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="js-counter flex justify-between items-center"
                                         data-value-change=".js-count-child">
                                        <p className="text-dark-1">Childeren</p>
                                        <div className="flex items-center space-x-4">
                                            <button type="button"
                                                    className="js-down h-[38px] w-[38px] border border-primary-1 flex items-center justify-center rounded-full text-dark-1 hover:bg-primary-1 hover:text-white duration-150">
                                                <i className="bi bi-dash-lg"></i>
                                            </button>

                                            <div className="js-count text-dark-1 lg:ext-md">0</div>

                                            <button type="button"
                                                    className="js-up h-[38px] w-[38px] border border-primary-1 flex items-center justify-center rounded-full text-dark-1 hover:bg-primary-1 hover:text-white duration-150">
                                                <i className="bi bi-plus-lg"></i>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="js-counter flex justify-between items-center"
                                         data-value-change=".js-count-room">
                                        <p className="text-dark-1 ">Room</p>
                                        <div className="flex items-center space-x-4">
                                            <button type="button"
                                                    className="js-down h-[38px] w-[38px] border border-primary-1 flex items-center justify-center rounded-full text-dark-1 hover:bg-primary-1 hover:text-white duration-150">
                                                <i className="bi bi-dash-lg"></i>
                                            </button>

                                            <div className="js-count text-dark-1 lg:ext-md">1</div>

                                            <button type="button"
                                                    className="js-up h-[38px] w-[38px] border border-primary-1 flex items-center justify-center rounded-full text-dark-1 hover:bg-primary-1 hover:text-white duration-150">
                                                <i className="bi bi-plus-lg"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4">
                                <div className="custom-checkbox mt-4">
                                    <input type="checkbox" value="add-one" id="add-one"/>
                                    <label htmlFor="add-one">Add Service per booking - <span
                                        className="font-semibold">$30</span></label>
                                </div>
                                <div className="custom-checkbox mt-4">
                                    <input type="checkbox" value="add-two" id="add-two"/>
                                    <label htmlFor="add-two">Add Service per day - <span
                                        className="font-semibold">$10</span></label>
                                </div>
                            </div>

                            <div className="pt-5 border-t border-stock-1 mt-6">
                                <div className="font-sans text-dark-1 text-2md font-semibold flex justify-between">Total
                                    : <span>$450</span></div>
                            </div>

                            <button
                                className="capitalize w-full text-center underline duration-150 mt-4 text-dark-1 font-medium flex items-center justify-center hover:text-primary-1">check
                                availability
                            </button>
                            <a href="booking.html" className="btn_primary__v1 !w-full justify-center mt-5">
                                Book Now
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M7.42505 16.5999L12.8584 11.1666C13.5 10.5249 13.5 9.4749 12.8584 8.83324L7.42505 3.3999"
                                        stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10"
                                        strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                            </a>
                        </form>
                    </div>

                    <div id="tab-4" className="tab-content">
                        <form action="#" className="lg:px-base px-5 lg:py-base py-5 bg-white border-primary-1 border">
                            <h4 className="lg:text-lg text-2md text-dark-1 font-semibold">Enquiry Now</h4>
                            <p className="regular-text-v1 !leading-[1.62] mt-2">Qui ad idque soluta deterruisset, nec
                                sale
                                pertinax mandamus et.</p>

                            <div className="lg:mt-base mt-5">
                                <input type="text" placeholder="Your Name" className="input_style__primary"/>
                            </div>
                            <div className="lg:mt-base mt-5">
                                <input type="email" placeholder="Email" className="input_style__primary"/>
                            </div>
                            <div className="lg:mt-base mt-5">
                                <input type="tel" placeholder="Mobile Number" className="input_style__primary"/>
                            </div>
                            <div className="lg:mt-base mt-5">
                                <textarea cols="30" rows="6" className="input_style__primary"
                                          placeholder="Additional Description..."></textarea>
                            </div>
                            <button className="btn_primary__v1 !w-full justify-center mt-5">
                                Enquiry
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M7.42505 16.5999L12.8584 11.1666C13.5 10.5249 13.5 9.4749 12.8584 8.83324L7.42505 3.3999"
                                        stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10"
                                        strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                            </button>
                        </form>
                    </div>

                    <aside className="widget widget_blogs lg:mt-[50px] mt-10">
                        <h4 className="text-dark-1 lg:text-[25px] text-2md leading-[1.6] capitalize font-semibold mb-5">
                            Offer Packages</h4>
                        <ul>
                            <li className="flex items-center group mt-6 first:mt-0">
                                <a href="package-details.html" className="shrink-0 w-20 mr-[15px] overflow-hidden">
                                    <img src="./assets/images/blog/ts-1.webp" alt="blogs"
                                         className="w-full group-hover:scale-105 duration-200"/>
                                </a>
                                <div className="grow">
                                    <ul className="text-sm text-orange-500">
                                        <li className="mr-[2px] last:mr-0 inline-block"><i
                                            className="bi bi-star-fill"></i></li>
                                        <li className="mr-[2px] last:mr-0 inline-block"><i
                                            className="bi bi-star-fill"></i></li>
                                        <li className="mr-[2px] last:mr-0 inline-block"><i
                                            className="bi bi-star-fill"></i></li>
                                        <li className="mr-[2px] last:mr-0 inline-block"><i
                                            className="bi bi-star-fill"></i></li>
                                        <li className="mr-[2px] last:mr-0 inline-block"><i
                                            className="bi bi-star-half"></i></li>
                                    </ul>
                                    <h5 className="lg:text-md mt-1 text-base font-semibold leading-[1.64] group-hover:text-primary-1 duration-200 fixed-title">
                                        <a href="package-details.html">The Great Wall, Chaina</a>
                                    </h5>
                                    <div className="mt-[5px] text-dark-2">
                                        <span>
                                            Form
                                        </span>
                                        <span className="text-primary-1 font-medium">$140.00</span>
                                    </div>
                                </div>
                            </li>
                            <li className="flex items-center group mt-6 first:mt-0">
                                <a href="package-details.html" className="shrink-0 w-20 mr-[15px] overflow-hidden">
                                    <img src="./assets/images/blog/ts-2.webp" alt="blogs"
                                         className="w-full group-hover:scale-105 duration-200"/>
                                </a>
                                <div className="grow">
                                    <ul className="text-sm text-orange-500">
                                        <li className="mr-[2px] last:mr-0 inline-block"><i
                                            className="bi bi-star-fill"></i></li>
                                        <li className="mr-[2px] last:mr-0 inline-block"><i
                                            className="bi bi-star-fill"></i></li>
                                        <li className="mr-[2px] last:mr-0 inline-block"><i
                                            className="bi bi-star-fill"></i></li>
                                        <li className="mr-[2px] last:mr-0 inline-block"><i
                                            className="bi bi-star-fill"></i></li>
                                        <li className="mr-[2px] last:mr-0 inline-block"><i
                                            className="bi bi-star-half"></i></li>
                                    </ul>
                                    <h5 className="lg:text-md mt-1 text-base font-semibold leading-[1.64] group-hover:text-primary-1 duration-200 fixed-title">
                                        <a href="package-details.html">Longest Sea Beach, Cox's Bazar</a>
                                    </h5>
                                    <div className="mt-[5px] text-dark-2">
                                        <span>
                                            Form
                                        </span>
                                        <span className="text-primary-1 font-medium">$140.00</span>
                                    </div>
                                </div>
                            </li>
                            <li className="flex items-center group mt-6 first:mt-0">
                                <a href="package-details.html" className="shrink-0 w-20 mr-[15px] overflow-hidden">
                                    <img src="./assets/images/blog/ts-3.webp" alt="blogs"
                                         className="w-full group-hover:scale-105 duration-200"/>
                                </a>
                                <div className="grow">
                                    <ul className="text-[13px] text-orange-500">
                                        <li className="mr-[2px] last:mr-0 inline-block"><i
                                            className="bi bi-star-fill"></i></li>
                                        <li className="mr-[2px] last:mr-0 inline-block"><i
                                            className="bi bi-star-fill"></i></li>
                                        <li className="mr-[2px] last:mr-0 inline-block"><i
                                            className="bi bi-star-fill"></i></li>
                                        <li className="mr-[2px] last:mr-0 inline-block"><i
                                            className="bi bi-star-fill"></i></li>
                                        <li className="mr-[2px] last:mr-0 inline-block"><i
                                            className="bi bi-star-half"></i></li>
                                    </ul>
                                    <h5 className="lg:text-md mt-[3px] text-base font-semibold leading-[1.64] group-hover:text-primary-1 duration-200 fixed-title">
                                        <a href="package-details.html">Long Trail Mountain, Napal</a>
                                    </h5>
                                    <div className="mt-[5px] text-dark-2">
                                        <span>
                                            Form
                                        </span>
                                        <span className="text-primary-1 font-medium">$140.00</span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </aside>
                    <aside className="widget widget_category lg:mt-[50px] mt-10">
                        <h4 className="text-dark-1 lg:text-[25px] text-2md leading-[1.6] capitalize font-semibold mb-5">
                            Travel category</h4>
                        <ul>
                            <li className="lg:mt-5 mt-4 first:lg:mt-0 first:mt-0"><a href="#"
                                                                                     className="lg:text-md text-base text-dark-2 font-medium leading-[1.44] font-serif duration-200 hover:text-primary-1 ">Adventure
                                (03)</a></li>
                            <li className="lg:mt-5 mt-4 first:lg:mt-0 first:mt-0"><a href="#"
                                                                                     className="lg:text-md text-base text-dark-2 font-medium leading-[1.44] font-serif duration-200 hover:text-primary-1 ">Travel
                                Vacation (03)</a></li>
                            <li className="lg:mt-5 mt-4 first:lg:mt-0 first:mt-0"><a href="#"
                                                                                     className="lg:text-md text-base text-dark-2 font-medium leading-[1.44] font-serif duration-200 hover:text-primary-1 ">Popular
                                Tour’s (05)</a></li>
                            <li className="lg:mt-5 mt-4 first:lg:mt-0 first:mt-0"><a href="#"
                                                                                     className="lg:text-md text-base text-dark-2 font-medium leading-[1.44] font-serif duration-200 hover:text-primary-1 ">Travel
                                / style (03)</a></li>
                        </ul>
                    </aside>
                    <aside className="widget widget_tags lg:mt-[50px] mt-10">
                        <h4 className="text-dark-1 lg:text-[25px] text-2md leading-[1.6] capitalize font-semibold mb-1">
                            Travel Tags</h4>
                        <ul>
                            <li className="inline-block mt-4 mr-5 last:mr-0">
                                <a href="#"
                                   className="duration-200 hover:text-primary-1 lg:text-md text-base text-dark-2 font-medium leading-[1.3] hover:underline hover:underline-offset-1">Travel,</a>
                            </li>
                            <li className="inline-block mt-4 mr-5 last:mr-0">
                                <a href="#"
                                   className="duration-200 hover:text-primary-1 lg:text-md text-base text-dark-2 font-medium leading-[1.3] hover:underline hover:underline-offset-1">City
                                    Tour,</a>
                            </li>
                            <li className="inline-block mt-4 mr-5 last:mr-0">
                                <a href="#"
                                   className="duration-200 hover:text-primary-1 lg:text-md text-base text-dark-2 font-medium leading-[1.3] hover:underline hover:underline-offset-1">Summer
                                    Tour,</a>
                            </li>
                            <li className="inline-block mt-4 mr-5 last:mr-0">
                                <a href="#"
                                   className="duration-200 hover:text-primary-1 lg:text-md text-base text-dark-2 font-medium leading-[1.3] hover:underline hover:underline-offset-1">Holyday,</a>
                            </li>
                            <li className="inline-block mt-4 mr-5 last:mr-0">
                                <a href="#"
                                   className="duration-200 hover:text-primary-1 lg:text-md text-base text-dark-2 font-medium leading-[1.3] hover:underline hover:underline-offset-1">life
                                    Style,</a>
                            </li>
                            <li className="inline-block mt-4 mr-5 last:mr-0">
                                <a href="#"
                                   className="duration-200 hover:text-primary-1 lg:text-md text-base text-dark-2 font-medium leading-[1.3] hover:underline hover:underline-offset-1">Adventure</a>
                            </li>
                        </ul>
                    </aside>
                    <aside className="widget widget_social lg:mt-[50px] mt-10">
                        <h4 className="text-dark-1 lg:text-[25px] text-2md leading-[1.6] capitalize font-semibold mb-1">
                            Scoial Links1</h4>

                        <ul>
                            <li className="inline-block mt-4 lg:mr-7 mr-5 last:mr-0"><a href="#"
                                                                                        className="primary_social__icon"><i
                                className="bi bi-twitter"></i></a></li>
                            <li className="inline-block mt-4 lg:mr-7 mr-5 last:mr-0"><a href="#"
                                                                                        className="primary_social__icon"><i
                                className="bi bi-facebook"></i></a></li>
                            <li className="inline-block mt-4 lg:mr-7 mr-5 last:mr-0"><a href="#"
                                                                                        className="primary_social__icon"><i
                                className="bi bi-pinterest"></i></a></li>
                            <li className="inline-block mt-4 lg:mr-7 mr-5 last:mr-0"><a href="#"
                                                                                        className="primary_social__icon"><i
                                className="bi bi-instagram"></i></a></li>
                        </ul>
                    </aside>
                </div>
            </div>
        </div>
    );
}