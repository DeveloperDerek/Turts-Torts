import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "@reach/router";

const AddedModal = (props) => {
    const { toggle, product } = props
    const [cart, setCart] = useState(null)

    useEffect(() => {
        axios
        .get("/api/cart/view", { withCredentials: true })
        .then((res) => {
            setCart(res.data)
            console.log(res.data)
        })
    }, [])

    if(cart === null) {
        return(<div>loading...</div>)
    }

    return(
        <div className="container-fluid popup cart-popup">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Cart</h5>
                        <button type="button" onClick={() => toggle()}>&times;</button>
                    </div>
                    <div className="modal-body">
                        <p className="text-center py-5">{product.title} added to shopping cart</p>
                        <div className="row p-3">
                            <div className="col">
                                <button className="btn btn-outline-primary w-75" onClick={() => toggle()}>Continue</button>
                            </div>
                            <div className="col">
                                <a className="btn btn-outline-primary float-end w-75 fill-in float-end" href="/cart">Check out</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddedModal

