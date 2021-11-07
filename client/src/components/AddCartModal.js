import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "@reach/router";
import { UserContext } from "../utils/UserContext";

const AddCartModal = (props) => {
    const {loggedUser} = useContext(UserContext);
    const { toggle, product } = props;
    const [qty, setQty] = useState(1);
    const [price, setPrice] = useState(product.price);
    const [sent, setSent] = useState(true);

    function addZeroes(num) {
        const value = toString(num);
        const dec = value.split('.')[1]
        const len = dec && dec.length > 2 ? dec.length : 2
        return Number(num).toFixed(len)
    }

    useEffect(() => {
        setPrice(qty * product.price)
    }, [qty])

    const addToCart = () => {
        const data = {product_id:product._id, price, quantity:qty}
        console.log(data);
        axios
        .post(`/api/cart/addToCart/`, data, { withCredentials: true })
        .then((cart) => {
            console.log(cart);
            setSent(!sent)
        })
        .catch(err => console.log(err));
    }

    const refresh = () => {
        window.location.reload(false);
    }

    return(
        <div className="container-fluid popup">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{product.title}</h5>
                        <button type="button" onClick={() => toggle()}>&times;</button>
                    </div>
                    {sent ? 
                        <div className="modal-body">
                            <div className="row p-2">
                                <label className="col-5 col-form-label">Quantity:</label>
                                <input className="col form-control" type="number" value={qty} onChange={(e) => setQty(e.target.value)} min="1" max={`${product.stock}`} />
                            </div>
                            <div className="row p-2">
                                <p className="col-5">${addZeroes(price)}</p>
                                {loggedUser.check ? 
                                <button className="col btn btn-outline-primary" type="button" onClick={() => addToCart()}>Add</button>
                                :
                                <button className="col btn btn-outline-primary" disabled>Log in to add</button>}
                            </div>
                        </div>
                    :
                        <div className="modal-body">
                            <p className="text-center py-5">{product.title} added to shopping cart</p>
                            <div className="row p-3">
                                <div className="col">
                                    <button className="btn btn-outline-primary w-75" onClick={() => refresh()}>Continue</button>
                                </div>
                                <div className="col">
                                    <Link className="btn btn-outline-primary float-end w-75" to="/cart">Check out</Link>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default AddCartModal