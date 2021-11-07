import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import SupplyLink from "../../components/SupplyLink";

const CategoryPage = () => {
    return(
        <div className="">
            <Navbar />
                <div className="container-fluid">
                    <div className="row p-3">
                        <SupplyLink />
                        <div className="col-sm col-md-10">
                            <div className="container-fluid">
                                <img className="img-fluid py-2 px-5" src="https://www.thesprucepets.com/thmb/7DVz-rT-HT_e5Y0satD4qvuWmkU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/red-eared-sliders-1238387_v3-01-75cb596df7b9497d95e52ba3a96d74a5.png" />
                            </div>
                        </div>
                    </div>
                </div>
            <Footer />
        </div>
    )
}

export default CategoryPage;