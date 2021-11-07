import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Success = () => {
    return(
        <div>
            <Navbar />
            <div className="container-fluid text-secondar fill-75">
                <p className="text-center p-5">Successfully added to newsletter</p>
            </div>
            <Footer />
        </div>
    )
}

export default Success;