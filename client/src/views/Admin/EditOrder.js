import React, { useState, useEffect } from "react";
import axios from "axios";
import { addZeroes } from "../../utils/AddZeroes";
import Navbar from "../../components/Navbar";
import moment from "moment" //moment(insert date here).format("MMM Do YY");

const EditOrder = (props) => {
    const { id } = props;
    const [order, setOrder] = useState(null);
    const [cart, setCart] = useState(null);
    const [status, setStatus] = useState("");
    const [click, setClick] = useState(true);

    useEffect(() => {
        axios
        .get(`/api/order/view/${id}`)
        .then((res) => {
            setOrder(res.data);
            axios
            .get(`/api/cart/viewcart/${res.data.cart._id}`)
            .then((res) => setCart(res.data.cartItems))
        })
    }, [click])

    if(order === null || cart === null) {
        return(<div>Loading...</div>)
    }

    const updateStatus = (id) => {
        if (status) {
            const data = { status }
            axios
            .put(`/api/order/update/${id}`, data)
            .then(setClick(!click))
        }
    }

    return(
        <div>
            <Navbar />
            <div className="container-fluid pb-5">
                <div className="px-5">
                    <p className="display-6 text-center py-2 text-success">Order</p>
                    <div className="px-5">
                        <div className="row">
                            <div className="col">
                                <h6 className="lead">#{order._id}</h6>
                                <h6>Status : 
                                    {
                                        order.status === 1 ? " Processing" :
                                        order.status === 2 ? " Shipping" :
                                        order.status === 3 ? " Shipped" :
                                        ""
                                    }
                                </h6>
                                <div className="input-group input-group-sm pb-2">
                                    <select className="form-select" onChange={(e) => setStatus(e.target.value)}>
                                        <option value="">Choose...</option>
                                        <option value="1">Processing</option>
                                        <option value="2">Shipping</option>
                                        <option value="3">Shipped</option>
                                    </select>
                                    <button className="btn btn-success" onClick={() => updateStatus(order._id)}>Set Status</button>
                                </div>
                                <h6>Email : {order.user.email}</h6>
                                <h6>Name : {order.user.firstName} {order.user.lastName}</h6>
                                <h6>Purchased : {moment(order.createdAt).format("MMMM Do, YYYY")}</h6>
                                {order.couponcode ? 
                                    <h6>Coupon : {order.couponcode}</h6>
                                    :
                                    ""
                                }
                                <h6>Total Price : ${addZeroes(order.totalPrice)}</h6>
                                <h6>Total Items : {order.cart.cartItems.length}</h6>
                            </div>
                            <div className="col">
                                <img className="img-fluid rounded" src="https://browntape.com/wp-content/uploads/2017/09/aa.png" />
                            </div>
                        </div>
                        <hr />
                        {cart.map((item, idx) => {
                            return(
                                <div className="row py-3" key={idx}>
                                    <div className="col-5">
                                        <img className="img-fluid border mx-auto d-block" src={`${item.product.imageKey}`} />
                                    </div>
                                    <div className="col">
                                        <div className="mx-auto d-block">
                                            <a className="lead text-decoration-none text-success pb-3" href={`/product/${item.product._id}`}>{item.product.title}</a>
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
            </div>
        </div>
    )
}

export default EditOrder