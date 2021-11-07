import React, { useState } from "react";
import { Link, navigate } from "@reach/router";
import axios from "axios";

const Footer = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const formHandler = (e) => {
        e.preventDefault();
        const data = { email }
        axios
        .post("/mailchimp/addtonewsletter", data)
        .then(() => navigate("/success"))
        .catch((err) => setError(err.response.data.error))
    }

    return(
        <nav className="navbar navbar-expand-sm border-top">
            <div className="container-fluid">
                <div className="mx-auto">
                    <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#footer">
                        <h1 className="fas fa-bars"></h1>
                    </button>
                </div>
                <div className="collapse navbar-collapse" id="footer">
                    <div className="row w-100">
                        <div className="col-md-3 col-sm pb-2 text-center text-secondary">
                            <h5 className="text-dark">Contact Us</h5>
                            <div>
                                <Link className="text-decoration-none text-secondary" to="/contact-us">Email Us</Link>
                            </div>
                            <div>1725 Slough Avenue</div>
                            <div>Scranton, PA. 18505</div>
                            <div>#1-800-313-9286</div>
                        </div>
                        <div className="col-md-3 col-sm pb-2 text-center text-secondary">
                            <h5 className="text-dark">Information</h5>
                            <div>
                                <Link className="text-decoration-none text-secondary" to="/terms-and-condition">Terms & Conditions</Link>
                            </div>
                            <div>
                                <Link className="text-decoration-none text-secondary" to="/shipping-and-return">Shipping & Returns</Link>
                            </div>
                            <div>
                                <Link className="text-decoration-none text-secondary" to="/privacy-notice">Privacy Notice</Link>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm pb-2 text-center text-secondary">
                            <h5 className="text-dark">Categories</h5>
                            <div>
                                <Link className="text-decoration-none text-secondary" to="/care-guide">Care Guide</Link>
                            </div>
                            <div>
                                <Link className="text-decoration-none text-secondary" to="/turtle/600b3fb6394b950b44e29ca1">Turtles</Link>
                            </div>
                            <div>
                                <Link className="text-decoration-none text-secondary" to="/tortoise/600b3fbf394b950b44e29ca2">Tortoise</Link>
                            </div>
                            <div>
                                <Link className="text-decoration-none text-secondary" to="/supplies">Supplies</Link>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm pb-2 text-secondary text-center">
                            <div className="pb-1">
                                <h5 className="text-dark">Newsletter</h5>
                                <div>Sign up for our newsletter</div>
                            </div>
                            <form className="center-block" onSubmit={formHandler}>
                                <div className="input-group input-group-sm">
                                    <input type="text" className="form-control" placeholder="Enter email address" onChange={(e) => setEmail(e.target.value)} />
                                    <button className="btn btn-outline-secondary">Submit</button>
                                </div>
                                {error ? <small className="text-danger">{error}</small> : ""}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Footer;