import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { navigate } from "@reach/router";

const AdminPage = () => {

    return(
        <div>
            <Navbar />
            <div className="container-fluid">
                <p className="display-6 text-center py-2 text-success">Admin Access</p>
                <hr />
                <div className="row">
                    <div className="col px-5">
                        <div className="py-4 row">
                            <a className="btn btn-lg btn-outline-success col mx-3" href="/admin/create-product">Add Product</a>
                            <a className="btn btn-lg btn-outline-success col mx-3" href="/admin/view-products">View Products</a>
                        </div>
                        <div className="py-4 row">
                            <a className="btn btn-lg btn-outline-success col mx-3" href="/admin/create-category">Add Category</a>
                            <a className="btn btn-lg btn-outline-success col mx-3" href="/admin/view-categories">View Categories</a>
                        </div>
                        <div className="py-4 row">
                            <a className="btn btn-lg btn-outline-success col mx-3" href="/admin/create-animal">Add Animal</a>
                            <a className="btn btn-lg btn-outline-success col mx-3" href="/admin/view-animals">View Animals</a>
                        </div>
                        <div className="py-4 row">
                            <a className="btn btn-lg btn-outline-success col mx-3" href="/admin/view-orders">View Orders</a>
                            <a className="btn btn-lg btn-outline-success col mx-3" href="/admin/view-messages">View Messages</a>
                        </div>
                    </div>
                    <div className="col">
                        <img className="rounded ninja border mx-auto d-block" src="https://i0.wp.com/www.teenagemutantninjaturtles.com/wp-content/uploads/2012/04/Leonardo-2003-cartoon.jpg?ssl=1" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminPage
