import React, { useState, useEffect } from "react";
import axios from "axios";
import { navigate } from "@reach/router";
import Navbar from "../../components/Navbar";
import ProductCol from "../../components/Admin/ProductCol";

const EditCategory = (props) => {
    const {id} = props
    const [category, setCategory] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios
        .get(`/api/category/view-products/${id}`)
        .then((res) => {
            setCategory(res.data);
            setName(res.data.name);
            setDescription(res.data.description);
            setProducts(res.data.products);
        })
    }, [])

    const formHandler = (e) => {
        e.preventDefault();
        const data = {name, description}
        axios
        .put(`/api/category/update/${id}`, data)
        .then(window.location.reload(false))
        .catch((err) => console.log(err.response))
    }

    const deleteCategory = () => {
        axios
        .delete(`/api/category/delete/${id}`)
        .then(navigate("/admin"))
    }

    const removeProduct = (id) => {
        const data = {category_id : category._id, product_id: id}
        axios
        .post(`/api/category/remove-product`, data)
        .then(setProducts(products.filter(val => val._id !== id)))
    }

    return(
        <div>
            <Navbar />
            <div className="container-fluid px-5 pb-3">
                <p className="display-6 text-center py-2 text-success">Edit {category.name}</p>
                <div className="px-5 row">
                    <form onSubmit={formHandler}>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                            <label>** Name **</label>
                        </div>
                        <div className="form-floating">
                            <textarea className="form-control" style={{height: "200px"}} value={description} onChange={(e) => setDescription(e.target.value)} /> 
                            <label>Description</label>
                        </div>
                        <div className="py-2">
                            <span className="btn btn-danger float-start" onClick={deleteCategory}>DELETE CATEGORY</span>
                            <button className="btn btn-dark float-end">EDIT CATEGORY</button>
                        </div>
                    </form>
                </div>
                <p className="text-center lead py-2">Products</p>
                <div className="px-5">
                    <ProductCol products={products} destroy={removeProduct}/>
                </div>
            </div>
        </div>
    )
}

export default EditCategory