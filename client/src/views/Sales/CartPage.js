import React, { useState, useEffect } from "react";
import axios from "axios";
import { navigate } from "@reach/router";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { addZeroes } from "../../utils/AddZeroes";

const CartPage = () => {
    const [cart, setCart] = useState(null)
    const [cartItems, setCartItems] = useState("");
    const [tax, setTax] = useState("");
    const [total, setTotal] = useState("");
    const [couponcode, setCouponcode] = useState("");
    const [coupon, setCoupon] = useState({
        code: "",
        applied: false
    });
    const [shipping, setShipping] = useState({
        address : "",
        city: "",
        postalCode: ""
    });
    const [errors, setErrors] = useState("");
    const [click, setClick] = useState(false);

    const addcartItems = (c) => {
        let sum = 0;
        c.map((item) => {
            sum = sum + item.price
        })
        if (coupon.code === "OFF20") {
            sum = sum - (sum * 0.2)
        }
        let tax = sum * 0.08;
        let tot = sum + tax;
        setCartItems(sum);
        setTax(tax);
        setTotal(tot);
    }

    useEffect(() => {
        axios
        .get("/api/cart/view", { withCredentials: true })
        .then((res) => {
            setCart(res.data)
            console.log(res.data)
            addcartItems(res.data.cartItems)
        })
    }, [click])

    if(cart === null) {
        return(<div>loading...</div>)
    }

    const removeItem = (id) => {
        const data = {cartItem: id};
        axios
        .post("/api/cart/removeFromCart", data, { withCredentials: true })
        .then(() => setClick(!click))
    }

    const createOrder = () => {
        const data = {cart: cart._id, shippingAddress: shipping, taxPrice: tax, totalPrice: total, couponcode}
        axios
        .post("/api/order/createOrder", data, { withCredentials: true })
        .then((res) => {
            console.log(res.data)
            navigate(`/order/${res.data.cart}`)
        })
        .catch((err) => {
            console.log(err);
            setErrors(err.response.data.errors)
        })
    }

    const addCoupon = () => {
        if (coupon.code === "OFF20") {
            setErrors("");
            setCoupon({ ...coupon, applied:true });
            setCouponcode(coupon.code)
            setClick(!click);
        } else {
            setCoupon({ ...coupon, code:"" })
            setErrors("Code not eligible")
        }
    }

    const removeCoupon = () => {
        setCoupon({ ...coupon, applied:false, code:"" })
        setCouponcode("");
        setClick(!click);
    }

    const updateQuantity = (cartID, p, quantity) => {
        if(quantity > 0) {
            let price = p * quantity;
            const data = { cartID, price, quantity }
            axios
            .post("/api/cart/update", data, { withCredentials: true })
            .then(() => setClick(!click))
        }
    }

    return(
        <div>
            <Navbar />
            <div className="container-fluid">
                <h1 className="display-6 text-center p-3">Secure Checkout</h1>
                <hr />
                <div className="pt-1">
                {cart.cartItems.length ? 
                    <div className="px-5">
                        {cart.cartItems.map((item, idx) => {
                            return(
                                <div className="row py-3" key={idx}>
                                    <div className="col-5">
                                        <img className="img-fluid border mx-auto d-block" src={`${item.product.imageKey}`} />
                                    </div>
                                    <div className="col">
                                        <p className="lead">{item.product.title}</p>
                                        {/* <p>{item.product.description}</p> */}
                                        <p>Quantity: {item.quantity}
                                        <button className="btn" onClick={() => {
                                            updateQuantity(item._id, item.product.price, item.quantity-1)
                                        }}>
                                            <i className="las la-arrow-down"></i>
                                        </button>
                                        <button className="btn" onClick={() => {
                                            updateQuantity(item._id, item.product.price, item.quantity+1)
                                        }}>
                                            <i className="las la-arrow-up"></i>
                                        </button>
                                        </p>
                                        <div className="pt-3 row">
                                            <p className="col">Total: ${addZeroes(item.price)}</p>
                                            <button className="col btn btn-outline-danger" onClick={() => removeItem(item._id)}>Remove</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                :
                    <div className="row">
                        <p className="text-center p-5">No items in shopping cart</p>
                    </div>
                }
                </div>
                <div className="row border-top py-3 px-5">
                    <div className="col-md col-sm">
                        <p className="text-muted">** Shipping only available in US **</p>
                        <div className="form-floating">
                            <input type="text" className="form-control" value={shipping.address} onChange={(e) => setShipping({...shipping, address:e.target.value})}/>
                            <label>Address</label>
                        </div>
                        <div className="form-floating">
                            <input type="text" className="form-control" value={shipping.city} onChange={(e) => setShipping({...shipping, city:e.target.value})}/>
                            <label>City</label>
                        </div>
                        <div className="form-floating">
                            <input type="number" className="form-control" value={shipping.postalCode} onChange={(e) => setShipping({...shipping, postalCode:e.target.value})}/>
                            <label>Zipcode</label>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm">
                        <p>Items Cost : ${addZeroes(cartItems)} </p>
                        <p>Tax : ${addZeroes(tax)}</p>
                        <p>Shipping : FREE</p>
                        <p>Total Cost : ${addZeroes(total)}</p>
                        <p className="text-danger">{errors}</p>
                        {coupon.applied ? 
                            <p>
                                <span className="text-success">{coupon.code} Applied</span>
                                <span className="px-2 hover" onClick={removeCoupon}>&times;</span>
                            </p>
                        :
                            <div className="input-group mb-3">
                                <input className="form-control form-control-sm" type="text" placeholder="coupon code" value={coupon.code} onChange={(e) => setCoupon({...coupon, code:e.target.value})} />
                                <button className="btn btn-sm btn-success" onClick={() => addCoupon()}>Go</button>
                            </div>
                        }
                        <button className="btn btn-outline-dark" onClick={createOrder}>Checkout</button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default CartPage