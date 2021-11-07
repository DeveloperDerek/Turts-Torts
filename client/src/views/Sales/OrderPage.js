import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { addZeroes } from "../../utils/AddZeroes";

const OrderPage = (props) => {
    const {id} = props
    const [cart, setCart] = useState(null);
    const [cartItems, setCartItems] = useState("");
    const [tax, setTax] = useState("");
    const [total, setTotal] = useState("");

    const addcartItems = (c) => {
        let sum = 0;
        c.map((item) => {
            sum = sum + item.price
        })
        let tax = sum * 0.08
        setCartItems(sum);
        setTax(tax);
        setTotal(sum + tax)
    }

    useEffect(() => {
        axios
        .get(`/api/cart/viewcart/${id}`)
        .then((res) => {
            setCart(res.data)
            addcartItems(res.data.cartItems)
        })
    }, [])

    if(cart === null) {
        return(<div>Loading...</div>)
    }

    return(
        <div>
            <Navbar />
                <div className="container-fluid">
                    <h1 className="display-6 text-center p-3">Order History</h1>
                    <div className="text-center row">
                        <p className="col">Items Cost : ${addZeroes(cartItems)} </p>
                        <p className="col">Tax : ${addZeroes(tax)}</p>
                    </div>
                    <div className="text-center row">
                        <p className="col">Shipping : $0.00</p>
                        <p className="col">Total Cost : ${addZeroes(total)}</p>
                    </div>
                    <div>
                        {cart.cartItems.map((item, idx) => {
                            return(
                                <div className="row border py-3" key={idx}>
                                    <div className="col-5">
                                        <img className="img-fluid border mx-auto d-block" src={`${item.product.imageKey}`} />
                                    </div>
                                    <div className="col">
                                        <div className="mx-auto d-block">
                                            <p className="lead">{item.product.title}</p>
                                            <p>{item.product.description}</p>
                                            <p>Quantity : {item.quantity}</p>
                                            </div>
                                            <p>Total: ${addZeroes(item.quantity * item.product.price)}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            <Footer />
        </div>
    )
}

export default OrderPage