import React, { useState, useEffect } from "react";
import axios from "axios";
import { navigate } from "@reach/router";
import Navbar from "../../components/Navbar";

const ViewAnimals = () => {
    const [animals, setAnimals] = useState(null);
    const [search, setSearch] = useState({
        commonName: "",
        category: ""
    })

    useEffect(() => {
        axios
        .get(`/api/animal/all/${search.commonName}`)
        .then((res) => {
            if(search.category) {
                setAnimals(res.data.filter(val => val.category === search.category))
            } else {
                setAnimals(res.data)
            }
        })
    }, [search])

    if(animals === null) {
        return(<div>Loading...</div>)
    }

    return(
        <>
            <Navbar />
            <div className="container-fluid">
                <div className="px-5">
                    <p className="display-6 text-center py-2 text-success">Search Animals</p>
                    <div className="px-5">
                        <div className="row">
                            <div className="col">
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" onChange={(e) => setSearch({...search, commonName: e.target.value})}/>
                                    <label>Name</label>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-floating mb-3">
                                    <select className="form-control" onChange={(e) => setSearch({...search, category: e.target.value})}>
                                        <option value="">All</option>
                                        <option value="turtle">Turtle</option>
                                        <option value="tortoise">Tortoise</option>
                                    </select>
                                    <label>Category</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {animals.map((animal, idx) => {
                            return(
                                <div className="col-3 p-3" key={idx}>
                                    <div className="card border border-dark text-secondary text-center fill-in">
                                        <img className="card-img-top img-fluid p-4" src={`${animal.imageKey}`} alt="product" />
                                        <div className="card-body border-top border-dark">
                                            <h6 className="card-title">
                                                <a className="text-decoration-none text-secondary" href={`/about/${animal._id}`}>{animal.commonName}</a>
                                            </h6>
                                        </div>
                                        <button className="btn btn-sm btn-success" onClick={() => navigate(`/admin/edit-animal/${animal._id}`)}>Edit</button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewAnimals