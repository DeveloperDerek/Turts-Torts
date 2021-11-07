import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import ProductCol from "../../components/Admin/ProductCol";

const ViewProducts = () => {
    const [products, setProducts] = useState(null)
    const [search, setSearch] = useState("");

    useEffect(() => {
        searchProducts()
    }, [search])

    const searchProducts = () => {
        axios
        .get(`/api/product/all/${search}`)
        .then((res) => {
            setProducts(res.data)
        })
    }

    if(products === null) {
        return(<div>Loading...</div>)
    }

    const deleteProduct = (id) => {
        axios
        .delete(`/api/product/delete/${id}`)
        .then(() => searchProducts())
    }

    return(
        <div>
            <Navbar />
            <div className="container-fluid">
                <div className="px-5">
                    <p className="display-6 text-center py-2 text-success">Search Products</p>
                    <div className="px-5">
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" onChange={(e) => setSearch(e.target.value)}/>
                            <label>Title</label>
                        </div>
                    </div>
                    <ProductCol products={products} destroy={deleteProduct} />
                </div>
            </div>
        </div>
    )
}

export default ViewProducts