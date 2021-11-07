import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const HomePage = () => {
    return(
        <div>
            <Navbar />
            <div className="py-3">
                {/* Carosuel */}
                <div className="container-fluid">
                <h6 className="text-center border-top border-bottom text-success">Enter code OFF20 for 20% off entire order</h6>
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-8">
                            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                                <ol className="carousel-indicators">
                                    <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active"></li>
                                    <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"></li>
                                    <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"></li>
                                </ol>
                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <img src="https://images.unsplash.com/photo-1597162216923-ba6d99390c10?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" className="img-fluid rounded d-block w-100" alt="..." />
                                    </div>
                                    <div className="carousel-item">
                                        <img src="https://images.unsplash.com/photo-1556007267-06d965ed0054?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" className="img-fluid rounded d-block w-100" alt="..." />
                                    </div>
                                    <div className="carousel-item">
                                        <img src="https://images.unsplash.com/photo-1590689538707-53f3e07ebe97?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1047&q=80" className="img-fluid rounded d-block w-100" alt="..." />
                                    </div>
                                </div>
                                <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </a>
                                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </a>
                            </div>
                            <p className="text-center"><small>Shop our online store's huge selection of turtles, tortoises, and supplies all at unbeatable prices</small></p>
                        </div>
                    </div>
                    <hr />
                </div>
                {/* About */}
                <div className="container-fluid">
                    <section className="text-center px-5">
                        <h1 className="display-6">Turts&Torts Online</h1>
                        <p>Welcome to the Turts&Torts online store, we offer the widest selection of captive bred turtles and tortoises for sale anywhere in the United States! Place your order online 24/7 or call us toll free at 1-800-313-9286. We have staff available to help Monday through Friday from 8am to 5pm eastern time.</p>
                        <p>Turts&Torts specialize in healthy and vibrant reptiles. We are reptile enthusiasts who believe cative breeding is integral to the future of the market, as it not only helps protect wild life populations, but is a rewarding experience that tends to intensify one's passion for these prehistoric creatures. All of our reptiles come with a 7-day health guarantee and we stand by all our new tortoise an turtles for sale. When purchasing from our site you can be sure to recieve great customer service. We ship all our healthy reptiles via UPS overnight in a heated and insulated package to make their transport to your destination safe and comfortable.</p>
                        <p>Our aquatic turtles for sale are all 100% born and raised in captivity. We offer a wide selection of different aquatic turtles from all around the world available in all sizes from hatchlings to mature adults. Although saltwater turtles are not available, we do have the brackish water diamondback terrapin a highly suggested turtle.</p>
                        <p>Our land tortoises for sale come in many different sizes. We have small tortoises that range from 4 inches to 8 inches max, medium tortoises that range from 9 to 16 inches max, and large tortoises that grow 18 inches. Such as the Sulcata Tortoise which grow towards 30 inches and can weigh over 200 lbs</p>
                    </section>
                </div>
                <div className="container-fluid">
                    <p className="display-6 text-center text-success">Featured Products</p>
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-6">
                            <div id="carouselExampleIndicators2" className="carousel slide" data-bs-ride="carousel">
                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <div className="card border border-dark text-secondary text-center fill-in">
                                            <img className="card-img-top img-fluid" src="https://www.petguide.com/wp-content/uploads/2016/11/stripe-necked-musk-turtle.jpg" alt="product" />
                                            <div className="card-body border-top border-dark">
                                                <h6 className="card-title">
                                                    <a className="text-decoration-none text-secondary" href="/about/5ffccd2655675307e1e99470">Stripe-Neck Musk Turtle</a>
                                                </h6>
                                            </div>
                                            <div>
                                                <p>$99.99</p>
                                            </div>
                                            <a href="/product/600b4a851389880e68328efb" className="btn btn-sm btn-success">ADD TO CART</a>
                                        </div>
                                    </div>
                                    <div className="carousel-item">
                                        <div className="card border border-dark text-secondary text-center fill-in">
                                            <img className="card-img-top img-fluid" src="https://zoomed.com/wp-content/uploads/Leopard-tortoise-adult021.jpg" alt="product" />
                                            <div className="card-body border-top border-dark">
                                                <h6 className="card-title">
                                                    <a className="text-decoration-none text-secondary" href="/about/5ffccf3655675307e1e99495">Leopard Tortoise</a>
                                                </h6>
                                            </div>
                                            <div>
                                                <p>$799.99</p>
                                            </div>
                                            <a href="/product/600b52181389880e68328f04" className="btn btn-sm btn-success">ADD TO CART</a>
                                        </div>
                                    </div>
                                    <div className="carousel-item">
                                        <div className="card border border-dark text-secondary text-center fill-in">
                                            <img className="card-img-top img-fluid" src="https://cdn10.bigcommerce.com/s-s4f5l4ll/products/178/images/3427/magniflow_360_filter__91664.1458148545.285.365.jpg?c=2" alt="product" />
                                            <div className="card-body border-top border-dark">
                                                <h6 className="card-title">
                                                    <a className="text-decoration-none text-secondary" href="/product/5fff789630e2be08fb998f1d">Fluval 305 Canister Filter</a>
                                                </h6>
                                            </div>
                                            <div>
                                                <p>$159.99</p>
                                            </div>
                                            <a className="btn btn-sm btn-success" href="/product/5fff789630e2be08fb998f1d">ADD TO CART</a>
                                        </div>
                                    </div>
                                </div>
                                <a className="carousel-control-prev" href="#carouselExampleIndicators2" role="button" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </a>
                                <a className="carousel-control-next" href="#carouselExampleIndicators2" role="button" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default HomePage
