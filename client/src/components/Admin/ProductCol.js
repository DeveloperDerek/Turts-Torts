import React from "react";
import { navigate } from "@reach/router";
import { addZeroes } from "../../utils/AddZeroes";

const ProductCol = (props) => {
    const {products, destroy} = props;

    return(
        <div className="row">
            {products.map((product, idx) => {
                return(
                    <div className="col-3 p-3" key={idx}>
                        <div className="card border border-dark text-secondary text-center fill-in">
                            <div>
                                <span className="hover float-end text-danger pe-2" onClick={() => destroy(product._id)}>&times;</span>
                            </div>
                            <img className="card-img-top img-fluid p-4" src={`${product.imageKey}`} alt="product" />
                            <div className="card-body border-top border-dark">
                                <h6 className="card-title">
                                    <a className="text-decoration-none text-secondary" href={`/product/${product._id}`}>{product.title}</a>
                                </h6>
                            </div>
                            <div>
                                <p>${addZeroes(product.price)}</p>
                            </div>
                            <button className="btn btn-sm btn-success" onClick={() => navigate(`/admin/edit-product/${product._id}`)}>Edit</button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default ProductCol