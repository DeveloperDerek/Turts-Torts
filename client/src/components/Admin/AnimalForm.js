import React, { useState, useEffect } from "react";
import axios from "axios";
import { navigate } from "@reach/router";

const AnimalForm = (props) => {
    const { func, button, id } = props;
    const [commonName, setCommonName] = useState("");
    const [description, setDescription] = useState("");
    const [origin, setOrigin] = useState("");
    const [diet, setDiet] = useState("");
    const [care, setCare] = useState("");
    const [lifespan, setLifespan] = useState("");
    const [size, setSize] = useState("");
    const [imageKey, setImageKey] = useState("");
    const [category, setCategory] = useState("turtle");

    useEffect(() => {
    if(id) {
        axios
        .get(`/api/animal/view/${id}`)
        .then((res) => {
            setCategory(res.data.category)
            setCommonName(res.data.commonName);
            setDescription(res.data.description);
            setOrigin(res.data.origin);
            setDiet(res.data.diet);
            setCare(res.data.care);
            setSize(res.data.size);
            setLifespan(res.data.lifespan);
            setImageKey(res.data.imageKey);
        })
    }
    }, [])


    const formHandler = (e) => {
        e.preventDefault();
        const data = {category, commonName, description, origin, diet, care, lifespan, size, imageKey}
        axios
        .post(`/api/animal/${func}`, data)
        .then((res) => {
            navigate(`/admin/edit-animal/${res.data._id}`)
        })
        .catch((err) => console.log(err))
    }

    return(
        <form onSubmit={formHandler}>
            <div className="row">
                <div className="col">
                    <div className="form-floating mb-3">
                        <input className="form-control" type="text" value={commonName} onChange={(e) => setCommonName(e.target.value)} />
                        <label>** Common Name **</label>
                    </div>
                </div>
                <div className="col">
                    <div className="form-floating mb-3">
                        <select className="form-control" value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value="turtle">Turtle</option>
                            <option value="tortoise">Tortoise</option>
                        </select>
                        <label>Category</label>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="form-floating mb-3">
                        <input className="form-control" type="text" value={size} onChange={(e) => setSize(e.target.value)} />
                        <label>Size</label>
                    </div>
                </div>
                <div className="col">
                    <div className="form-floating mb-3">
                        <input className="form-control" type="text" value={lifespan} onChange={(e) => setLifespan(e.target.value)} />
                        <label>Lifespan</label>
                    </div>
                </div>
            </div>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" value={imageKey} onChange={(e) => setImageKey(e.target.value)} />
                <label>Image Url</label>
            </div>
            <div className="form-floating mb-3">
                <textarea className="form-control" style={{height: "100px"}} value={description} onChange={(e) => setDescription(e.target.value)} /> 
                <label>Description</label>
            </div>
            <div className="form-floating mb-3">
                <textarea className="form-control" style={{height: "100px"}} value={origin} onChange={(e) => setOrigin(e.target.value)} /> 
                <label>Origin</label>
            </div>
            <div className="form-floating mb-3">
                <textarea className="form-control" style={{height: "100px"}} value={diet} onChange={(e) => setDiet(e.target.value)} /> 
                <label>Diet</label>
            </div>
            <div className="form-floating mb-3">
                <textarea className="form-control" style={{height: "100px"}} value={care} onChange={(e) => setCare(e.target.value)} /> 
                <label>Care</label>
            </div>
            {button()}
        </form>
    )
}

export default AnimalForm