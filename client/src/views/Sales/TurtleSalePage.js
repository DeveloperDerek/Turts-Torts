import React, { useState, useEffect } from "react";
import axios from "axios";
import { navigate } from "@reach/router";
import { addZeroes } from "../../utils/AddZeroes";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import AddCartModal from "../../components/AddCartModal";

const TurtleSalePage = (props) => {
    const {id} = props;
    const [category, setCategory] = useState(null);
    const [modal, setModal] = useState(false);
    const [product, setProduct] = useState("");

    useEffect(() => {
        axios
        .get(`/api/category/view-products/${id}`)
        .then((res) => {
            console.log(res.data);
            setCategory(res.data);
        })
        .catch(err => console.log(err));
    }, [id])

    if (category === null) {
        return(<div>Loading...</div>)
    }

    const cartModal = (prod) => {
        setProduct(prod);
        setModal(!modal);
    }


    return(
        <div className="fill-vertical">
            <Navbar />
                <div className="container-fluid">
                    <div className="row p-3">
                        <div className="col-1"></div>
                        <div className="col">
                            <h1 className="text-center display-5">{category.name}</h1>
                            <p className="text-secondary">{category.description}</p>
                            <div className="row">
                                {category.products.map((product, idx) => {
                                    return(
                                        <div className="col-sm col-md-4 p-3" key={idx}>
                                            <div className="card border border-dark text-secondary text-center fill-in">
                                                <img className="card-img-top img-fluid hover" src={`${product.imageKey}`} alt="product" onClick={() => navigate(`/product/${product._id}`)}/>
                                                <div className="card-body border-top border-dark">
                                                    <h6 className="card-title">
                                                        <a className="text-decoration-none text-secondary" href={`/product/${product._id}`}>{product.title}</a>
                                                    </h6>
                                                </div>
                                                <div>
                                                    <p>${addZeroes(product.price)}</p>
                                                </div>
                                                <button className="btn btn-sm btn-dark" onClick={() => cartModal(product)}>ADD TO CART</button>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="col-1"></div>
                    </div>
                    {modal ? <AddCartModal product={product} toggle={cartModal} /> : ""}
                </div>
            <Footer />
        </div>
    )
}

export default TurtleSalePage;

