import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { navigate } from "@reach/router";

const EditProductPage = (props) => {
    const {id} = props;
    const [product, setProduct] = useState(null)
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [imageKey, setImageKey] = useState("");
    const [stock, setStock] = useState("");
    const [categories, setCategories] = useState([]); // Array of product categories
    const [categoryList, setCategoryList] = useState([]); // Array of all categories
    const [category, setCategory] = useState(""); // Selected category to add to product

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        await axios
        .get(`http://localhost:8000/api/category/getall`)
        .then((res) => {
            setCategoryList(res.data);
            console.log(res.data)
            res.data.map((cat) => {
                if(cat.products.some(i => i._id === id)) {
                    setCategories(prevData => {
                        return [cat, ...prevData]
                    })
                }
            })
        })

        await axios
        .get(`http://localhost:8000/api/product/view/${id}`)
        .then((res) => {
            setProduct(res.data);
            setTitle(res.data.title);
            setDescription(res.data.description);
            setPrice(res.data.price);
            setImageKey(res.data.imageKey);
            setStock(res.data.stock);
        }) 
    }

    if(product === null) {
        return(<div>Loading...</div>)
    }

    const formHandler = (e) => {
        e.preventDefault();
        const data = {title, description, price, imageKey, stock}
        axios
        .put(`http://localhost:8000/api/product/update/${id}`, data)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err.response))
    }

    const deleteProduct = () => {
        axios
        .delete(`http://localhost:8000/api/product/delete/${id}`)
        .then(() => navigate("/admin"))
    }

    const removeProduct = (cat_id) => {
        const data = {category_id : cat_id, product_id: id}
        axios
        .post(`http://localhost:8000/api/category/remove-product`, data)
        .then((res) => {
            setCategories(categories.filter(val => val._id !== res.data._id))
        })
    }

    const addProduct = () => {
        const data = {category_id : category, product_id: id}
        if(categories.some(c => c._id === category)) {
            console.log("already added")
        } else {
            axios
            .post(`http://localhost:8000/api/category/add-product`, data)
            .then((res) => {
                setCategories(prevData => {
                    return [res.data, ...prevData]
                })
            })
        }
    }
    
    return(
        <div>
            <Navbar />
            <div className="container-fluid px-5 pb-5">
                <p className="display-6 text-center py-2 text-success">{product.title}</p>
                <div className="pb-3">
                    <img className="img-fluid border rounded mx-auto d-block" src={product.imageKey} />
                </div>
                <hr />
                <div className="px-5">
                    <div className="row mb-3">
                        <div className="col">
                            <p className="lead">Product Categories</p>
                            {categories.map((cat, idx) => {
                                return(
                                    <div className="row" key={idx}>
                                        <div className="col">
                                            <a className="text-decoration-none" href={`/admin/edit-category/${cat._id}`}>{cat.name}</a>
                                        </div>
                                        <div className="col">
                                            <button className="btn btn-sm btn-outline-danger" onClick={() => removeProduct(cat._id)}>Remove</button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="col">
                            <p className="lead">Add to Category</p>
                            <div className="input-group">
                                <select className="form-control" value={category} onChange={(e) => setCategory(e.target.value)}>
                                    <option>None</option>
                                    {categoryList.map((cat, idx) => {
                                        return(
                                            <option key={idx} value={cat._id}>{cat.name}</option>
                                        )
                                    })}
                                </select>
                                <button className="btn btn-dark" onClick={addProduct}>ADD</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <form onSubmit={formHandler}>
                        <div className="px-5">
                            <div className="form-floating mb-3">
                                <input className="form-control" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                                <label>Title</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" value={imageKey} onChange={(e) => setImageKey(e.target.value)} />
                                <label>Image Url</label>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div className="form-floating mb-3">
                                        <input type="number" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} />
                                        <label>Price</label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-floating mb-3">
                                        <input type="number" className="form-control" value={stock} onChange={(e) => setStock(e.target.value)} />
                                        <label>Stock</label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-floating">
                                <textarea className="form-control" style={{height: "100px"}} value={description} onChange={(e) => setDescription(e.target.value)} /> 
                                <label>Description</label>
                            </div>
                            <div className="py-2">
                                <span className="btn btn-danger float-start" onClick={deleteProduct}>DELETE PRODUCT</span>
                                <button className="btn btn-dark float-end">EDIT PRODUCT</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditProductPage

