export default function Home() {
    return (
        <>
            <div className="max-w-screen-xl mx-auto py-5">
                <div className="container mx-auto">
                    <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                        <h6 className="section-title bg-white text-center text-primary px-3">Services</h6>
                        <h1 className="mb-5">Our Services</h1>
                    </div>
                    <div className="row g-4">
                        <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="service-item rounded pt-3">
                                <div className="p-4">
                                    <i className="fa fa-3x fa-globe text-primary mb-4"></i>
                                    <h5>WorldWide Tours</h5>
                                    <p>Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
                            <div className="service-item rounded pt-3">
                                <div className="p-4">
                                    <i className="fa fa-3x fa-hotel text-primary mb-4"></i>
                                    <h5>Hotel Reservation</h5>
                                    <p>Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
                            <div className="service-item rounded pt-3">
                                <div className="p-4">
                                    <i className="fa fa-3x fa-user text-primary mb-4"></i>
                                    <h5>Travel Guides</h5>
                                    <p>Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.7s">
                            <div className="service-item rounded pt-3">
                                <div className="p-4">
                                    <i className="fa fa-3x fa-cog text-primary mb-4"></i>
                                    <h5>Event Management</h5>
                                    <p>Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-xxl py-5 destination">
                <div className="container">
                    <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                        <h6 className="section-title bg-white text-center text-primary px-3">Destination</h6>
                        <h1 className="mb-5">Popular Destination</h1>
                    </div>
                    <div className="row g-3">
                        <div className="col-lg-7 col-md-6">
                            <div className="row g-3">
                                <div className="col-lg-12 col-md-12 wow zoomIn" data-wow-delay="0.1s">
                                    <a className="position-relative d-block overflow-hidden" href="">
                                        <img className="img-fluid" src="images/landscape-placeholder.png" alt=""/>
                                        <div
                                            className="bg-white text-danger fw-bold position-absolute top-0 start-0 m-3 py-1 px-2">30%
                                            OFF
                                        </div>
                                        <div
                                            className="bg-white text-primary fw-bold position-absolute bottom-0 end-0 m-3 py-1 px-2">Thailand
                                        </div>
                                    </a>
                                </div>
                                <div className="col-lg-6 col-md-12 wow zoomIn" data-wow-delay="0.3s">
                                    <a className="position-relative d-block overflow-hidden" href="">
                                        <img className="img-fluid" src="img/placeholder.svg" alt=""/>
                                        <div
                                            className="bg-white text-danger fw-bold position-absolute top-0 start-0 m-3 py-1 px-2">25%
                                            OFF
                                        </div>
                                        <div
                                            className="bg-white text-primary fw-bold position-absolute bottom-0 end-0 m-3 py-1 px-2">Malaysia
                                        </div>
                                    </a>
                                </div>
                                <div className="col-lg-6 col-md-12 wow zoomIn" data-wow-delay="0.5s">
                                    <a className="position-relative d-block overflow-hidden" href="">
                                        <img className="img-fluid" src="img/placeholder.svg" alt=""/>
                                        <div
                                            className="bg-white text-danger fw-bold position-absolute top-0 start-0 m-3 py-1 px-2">35%
                                            OFF
                                        </div>
                                        <div
                                            className="bg-white text-primary fw-bold position-absolute bottom-0 end-0 m-3 py-1 px-2">Australia
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5 col-md-6 wow zoomIn min-h-[350px]" data-wow-delay="0.7s">
                            <a className="position-relative d-block h-100 overflow-hidden" href="">
                                <img className="img-fluid position-absolute w-100 h-100 object-cover"
                                     src="img/placeholder.svg" alt=""
                                />
                                <div
                                    className="bg-white text-danger fw-bold position-absolute top-0 start-0 m-3 py-1 px-2">20%
                                    OFF
                                </div>
                                <div
                                    className="bg-white text-primary fw-bold position-absolute bottom-0 end-0 m-3 py-1 px-2">Indonesia
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-xxl py-5">
                <div className="container">
                    <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                        <h6 className="section-title bg-white text-center text-primary px-3">Packages</h6>
                        <h1 className="mb-5">Awesome Packages</h1>
                    </div>
                    <div className="row g-4 justify-content-center">
                        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="package-item">
                                <div className="overflow-hidden">
                                    <img className="img-fluid" src="img/placeholder.svg" alt=""/>
                                </div>
                                <div className="d-flex border-bottom">
                                    <small className="flex-fill text-center border-end py-2"><i
                                        className="fa fa-map-marker-alt text-primary me-2"></i>HCMC</small>
                                    <small className="flex-fill text-center border-end py-2"><i
                                        className="fa fa-calendar-alt text-primary me-2"></i>5 days</small>
                                    <small className="flex-fill text-center py-2"><i
                                        className="fa fa-user text-primary me-2"></i>2
                                        Person</small>
                                </div>
                                <div className="text-center p-4">
                                    <h3 className="mb-0">$249.00</h3>
                                    <div className="mb-3">
                                        <small className="fa fa-star text-primary"></small>
                                        <small className="fa fa-star text-primary"></small>
                                        <small className="fa fa-star text-primary"></small>
                                        <small className="fa fa-star text-primary"></small>
                                        <small className="fa fa-star text-primary"></small>
                                    </div>
                                    <p>Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam
                                        eos</p>
                                    <div className="d-flex justify-content-center mb-2 gap-2">
                                        <a href="#"
                                           className="btn btn-sm btn-primary px-3 border-end rounded-tl-[30px] rounded-bl-[30px]"
                                        >Read More</a>
                                        <a href="#"
                                           className="btn btn-sm btn-primary px-3 rounded-tl-[30px] rounded-bl-[30px]">Book
                                            Now</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                            <div className="package-item">
                                <div className="overflow-hidden">
                                    <img className="img-fluid" src="img/placeholder.svg" alt=""/>
                                </div>
                                <div className="d-flex border-bottom">
                                    <small className="flex-fill text-center border-end py-2"><i
                                        className="fa fa-map-marker-alt text-primary me-2"></i>Da Nang</small>
                                    <small className="flex-fill text-center border-end py-2"><i
                                        className="fa fa-calendar-alt text-primary me-2"></i>3 days</small>
                                    <small className="flex-fill text-center py-2"><i
                                        className="fa fa-user text-primary me-2"></i>2
                                        Person</small>
                                </div>
                                <div className="text-center p-4">
                                    <h3 className="mb-0">$139.00</h3>
                                    <div className="mb-3">
                                        <small className="fa fa-star text-primary"></small>
                                        <small className="fa fa-star text-primary"></small>
                                        <small className="fa fa-star text-primary"></small>
                                        <small className="fa fa-star text-primary"></small>
                                        <small className="fa fa-star text-primary"></small>
                                    </div>
                                    <p>Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam
                                        eos</p>
                                    <div className="d-flex justify-content-center mb-2 gap-2">
                                        <a href="#"
                                           className="btn btn-sm btn-primary px-3 border-end rounded-tl-[30px] rounded-bl-[30px]"
                                        >Read More</a>
                                        <a href="#"
                                           className="btn btn-sm btn-primary px-3 rounded-tl-[30px] rounded-bl-[30px]">Book
                                            Now</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
                            <div className="package-item">
                                <div className="overflow-hidden">
                                    <img className="img-fluid" src="img/placeholder.svg" alt=""/>
                                </div>
                                <div className="d-flex border-bottom">
                                    <small className="flex-fill text-center border-end py-2"><i
                                        className="fa fa-map-marker-alt text-primary me-2"></i>Ha Noi</small>
                                    <small className="flex-fill text-center border-end py-2"><i
                                        className="fa fa-calendar-alt text-primary me-2"></i>3 days</small>
                                    <small className="flex-fill text-center py-2"><i
                                        className="fa fa-user text-primary me-2"></i>2
                                        Person</small>
                                </div>
                                <div className="text-center p-4">
                                    <h3 className="mb-0">$189.00</h3>
                                    <div className="mb-3">
                                        <small className="fa fa-star text-primary"></small>
                                        <small className="fa fa-star text-primary"></small>
                                        <small className="fa fa-star text-primary"></small>
                                        <small className="fa fa-star text-primary"></small>
                                        <small className="fa fa-star text-primary"></small>
                                    </div>
                                    <p>Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam
                                        eos</p>
                                    <div className="d-flex justify-content-center mb-2 gap-2">
                                        <a href="#"
                                           className="btn btn-sm btn-primary px-3 border-end rounded-tl-[30px] rounded-bl-[30px]"
                                        >Read More</a>
                                        <a href="#"
                                           className="btn btn-sm btn-primary px-3 rounded-tl-[30px] rounded-bl-[30px]">Book
                                            Now</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/*        <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
          <div className="container bg-[linear-gradient(rgba(15, 23, 43, 0.7), rgba(15, 23, 43, 0.7)), url(/img/booking.jpg)] bg-center bg-cover bg-no-repeat">
            <div className="p-5">
              <div className="row g-5 align-items-center">
                <div className="col-md-6 text-white">
                  <h6 className="text-white text-uppercase">Booking</h6>
                  <h1 className="text-white mb-4">Online Booking</h1>
                  <p className="mb-4">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam
                    et eos. Clita erat ipsum et lorem et sit.</p>
                  <p className="mb-4">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam
                    et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat
                    amet</p>
                  <a className="btn btn-outline-light py-3 px-5 mt-2" href="">Read More</a>
                </div>
                <div className="col-md-6">
                  <h1 className="text-white mb-4">Book A Tour</h1>
                  <form>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <div className="form-floating">
                          <input type="text" className="form-control bg-transparent" id="name" placeholder="Your Name"/>
                          <label htmlFor="name">Your Name</label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-floating">
                          <input type="email" className="form-control bg-transparent" id="email"
                                 placeholder="Your Email"/>
                          <label htmlFor="email">Your Email</label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-floating date" id="date3" data-target-input="nearest">
                          <input type="text" className="form-control bg-transparent datetimepicker-input" id="datetime"
                                 placeholder="Date & Time" data-target="#date3" data-toggle="datetimepicker"/>
                          <label htmlFor="datetime">Date & Time</label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-floating">
                          <select className="form-select bg-transparent" id="select1">
                            <option value="1">Destination 1</option>
                          </select>
                          <label htmlFor="select1">Destination</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-floating">
                          <textarea className="form-control bg-transparent h-[100px]" placeholder="Special Request" id="message"
                                    ></textarea>
                          <label htmlFor="message">Special Request</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <button className="btn btn-outline-light w-100 py-3" type="submit">Book Now</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        */}

            <div className="container-xxl py-5">
                <div className="container">
                    <div className="text-center pb-4 wow fadeInUp" data-wow-delay="0.1s">
                        <h6 className="section-title bg-white text-center text-primary px-3">Process</h6>
                        <h1 className="mb-5">3 Easy Steps</h1>
                    </div>
                    <div className="row gy-5 gx-4 justify-content-center">
                        <div className="col-lg-4 col-sm-6 text-center pt-4 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="position-relative border border-primary pt-5 pb-4 px-4">
                                <div
                                    className="d-inline-flex align-items-center justify-content-center bg-primary rounded-circle position-absolute top-0 start-50 translate-middle shadow w-[100px] h-[100px]"
                                >
                                    <i className="fa fa-globe fa-3x text-white"></i>
                                </div>
                                <h5 className="mt-4">Choose A Destination</h5>
                                <hr className="w-25 mx-auto bg-primary mb-1"/>
                                <hr className="w-50 mx-auto bg-primary mt-0"/>
                                <p className="mb-0">Tempor erat elitr rebum clita dolor diam ipsum sit diam amet diam
                                    eos erat ipsum
                                    et lorem et sit sed stet lorem sit</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6 text-center pt-4 wow fadeInUp" data-wow-delay="0.3s">
                            <div className="position-relative border border-primary pt-5 pb-4 px-4">
                                <div
                                    className="d-inline-flex align-items-center justify-content-center bg-primary rounded-circle position-absolute top-0 start-50 translate-middle shadow h-[100px] w-[100px]"
                                >
                                    <i className="fa fa-dollar-sign fa-3x text-white"></i>
                                </div>
                                <h5 className="mt-4">Pay Online</h5>
                                <hr className="w-25 mx-auto bg-primary mb-1"/>
                                <hr className="w-50 mx-auto bg-primary mt-0"/>
                                <p className="mb-0">Tempor erat elitr rebum clita dolor diam ipsum sit diam amet diam
                                    eos erat ipsum
                                    et lorem et sit sed stet lorem sit</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6 text-center pt-4 wow fadeInUp" data-wow-delay="0.5s">
                            <div className="position-relative border border-primary pt-5 pb-4 px-4">
                                <div
                                    className="d-inline-flex align-items-center justify-content-center bg-primary rounded-circle position-absolute top-0 start-50 translate-middle shadow h-[100px] w-[100px]"
                                >
                                    <i className="fa fa-plane fa-3x text-white"></i>
                                </div>
                                <h5 className="mt-4">Fly Today</h5>
                                <hr className="w-25 mx-auto bg-primary mb-1"/>
                                <hr className="w-50 mx-auto bg-primary mt-0"/>
                                <p className="mb-0">Tempor erat elitr rebum clita dolor diam ipsum sit diam amet diam
                                    eos erat ipsum
                                    et lorem et sit sed stet lorem sit</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
