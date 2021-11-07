import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../../utils/UserContext";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import SupplyLink from "../../components/SupplyLink";
import AddedModal from "../../components/AddedModal";
import { addZeroes } from "../../utils/AddZeroes";

const ProductPage = (props) => {
    const {loggedUser} = useContext(UserContext);
    const {id} = props
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [cartModal, setCartModal] = useState(false);
    const [price, setPrice] = useState("");

    const toggle = () => {
        setCartModal(!cartModal);
    }

    useEffect(() => {
        axios
        .get(`/api/product/view/${id}`)
        .then((res) => {
            console.log(res.data);
            setProduct(res.data);
            setPrice(res.data.price)
        })
        .catch(err => console.log(err))
    }, [])

    if (product === null) {
        return(<div>loading...</div>)
    }

    const addToCart = (product_id, quantity) => {
        const data = {product_id, price, quantity}
        axios
        .post(`/api/cart/addToCart/`, data, { withCredentials: true })
        .then((cart) => {
            console.log(cart);
            toggle();
        })
        .catch(err => console.log(err));
    }

    return(
        <div className="fill-vertical">
            <Navbar />
            <div className="container-fluid">
                <div className="row p-3">
                    <SupplyLink />
                    <div className="col">
                        <div className="row">
                            <p className="display-5 text-center py-3">{product.title}</p>
                            <div className="col-sm col-md-6">
                                <img className="img-fluid border rounded mx-auto d-block" src={product.imageKey} />
                            </div>
                            <div className="col-sm col-md">
                                <p className="py-2">{product.description}</p>

                                <div className="form-floating mb-3">
                                    <input className="form-control" type="number" min="1" value={quantity} onChange={(e) => {
                                        setQuantity(e.target.value)
                                        setPrice(e.target.value * price)
                                    }}  />
                                    <label className="form-label">Quantity</label>
                                </div>
                                <p>${addZeroes(product.price)}</p>
                                {loggedUser.check ? 
                                    // <button className="btn btn-outline-primary" onClick={() => addToCart(product._id, product.price,quantity)}>Add to Cart</button>
                                    <button className="btn btn-primary" data-bs-toggle="modal" onClick={() => addToCart(product._id, quantity)}>Add to Cart</button>
                                :
                                    <button className="btn btn-outline-primary" disabled>Log in to add to cart</button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            {cartModal ? <AddedModal product={product} toggle={toggle}/>:  ""}
        </div>
    )
}

export default ProductPage

{/* <div className="col px-5 pb-3">
<h1 className="display-5 text-center">{product.title}</h1>
<img className="img-fluid border rounded mx-auto d-block py-3" src={product.imageKey} />
<p className="py-2">{product.description}</p>
<p>${addZeroes(product.price)}</p>

<div className="form-floating mb-3 w-25">
    <input className="form-control" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} min="1" />
    <label className="form-label">Quantity</label>
</div>
{loggedUser.check ? 
    // <button className="btn btn-outline-primary" onClick={() => addToCart(product._id, product.price,quantity)}>Add to Cart</button>
    <button className="btn btn-primary" data-bs-toggle="modal" onClick={() => addToCart(product._id, product.price,quantity)}>Add to Cart</button>
:
    <button className="btn btn-outline-primary" disabled>Log in to add to cart</button>
}
</div> */}