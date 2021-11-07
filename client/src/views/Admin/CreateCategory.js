import React, { useState } from "react";
import axios from "axios";
import { navigate } from "@reach/router";
import Navbar from "../../components/Navbar";

const CreateCategory = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const formHandler = (e) => {
        e.preventDefault();
        const data = { name, description }
        axios
        .post("/api/category/create", data)
        .then((res) => {
            navigate(`/admin/edit-category/${res.data._id}`)
        })
        .catch((err) => console.log(err.response))
    }

    return(
        <div>
            <Navbar />
            <div className="container-fluid px-5">
                <p className="display-6 text-center py-2 text-success">Add Category</p>
                <div className="px-5 row">
                    <form onSubmit={formHandler}>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                            <label>** Name **</label>
                        </div>
                        <div className="form-floating">
                            <textarea className="form-control" style={{height: "200px"}} value={description} onChange={(e) => setDescription(e.target.value)} /> 
                            <label>Description</label>
                        </div>
                        <div className="py-2">
                            <button className="btn btn-dark float-end">ADD CATEGORY</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateCategory