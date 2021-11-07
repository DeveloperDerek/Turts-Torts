
import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import axios from "axios";

const ContactPage = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [orderNumber, setOrderNumber] = useState("");
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const msg = {fullName, email, message, phoneNumber, orderNumber, }
        axios
            .post("/api/contact/submit", msg)
            .then((res) => {
                setErrors([]);
                setFullName("");
                setEmail("");
                setMessage("");
                setPhoneNumber("");
                setOrderNumber("");
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err);
                setErrors(err.response.data.errors)
            });
    }

    return(
        <div>
            <Navbar />
            <div className="container-fluid p-3">

                <div className="text-center">
                    <h1 className="display-6 py-2">Contact Us</h1>
                    <h6 className="text-muted">Plase fill out this form completely</h6>
                </div>

                <div className="px-5">
                    <form onSubmit={handleSubmit}>
                        <div className="py-2">
                            <label className="form-label">
                                Full Name <span className="text-danger">*</span>
                                {errors?.fullName && (
                                    <span className="text-danger">
                                        {errors.fullName?.properties?.message}
                                    </span>
                                )}
                            </label>
                            <input className="form-control" type="text" value={fullName} onChange={(e) => {setFullName(e.target.value)}}/>
                        </div>

                        <div className="py-2">
                            <label className="form-label">
                                Email <span className="text-danger">*</span>
                                {errors?.email && (
                                    <span className="text-danger">
                                        {errors.email?.properties?.message}
                                    </span>
                                )}
                            </label>
                            <input className="form-control" type="email" value={email} onChange={(e) => {setEmail(e.target.value)}} />
                            <h6 className="text-muted"><small>example@example.com</small></h6>
                        </div>

                        <div className="py-2">
                            <label className="form-label">
                                Phone Number
                                {errors?.phoneNumber && (
                                    <span className="text-danger">
                                        {errors.phoneNumber?.properties?.message}
                                    </span>
                                )}
                            </label>
                            <input className="form-control" type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" value={phoneNumber} onChange={(e) => {setPhoneNumber(e.target.value)}} />
                            <h6 className="text-muted"><small>Format: 123-456-7890</small></h6>
                        </div>

                        <div className="py-2">
                            <label className="form-label">
                                Order Number
                                {errors?.orderNumber && (
                                    <span className="text-danger">
                                        {errors.orderNumber?.properties?.message}
                                    </span>
                                )}
                            </label>
                            <input className="form-control" type="text" value={orderNumber} onChange={(e) => {setOrderNumber(e.target.value)}} />
                        </div>

                        <div className="py-2">
                            <label className="form-label">
                                Message <span className="text-danger">*</span>
                                {errors?.message && (
                                    <span className="text-danger">
                                        {errors.message?.properties?.message}
                                    </span>
                                )}
                            </label>
                            <textarea className="form-control" rows="4" value={message} onChange={(e) => {setMessage(e.target.value)}} />
                        </div>
                        
                        <p>We will email you back as soon as possible</p>
                        <p>Thank you</p>
                        <p>- Turts&Torts</p>
                        <button className="btn btn-lg btn-success">Send</button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ContactPage