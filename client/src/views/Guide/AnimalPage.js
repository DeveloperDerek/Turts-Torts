import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import AnimalLinks from "../../components/AnimalLinks";

const AnimalPage = (props) => {
    const {id} = props;
    const [turtle, setTurtle] = useState(null);

    useEffect(() => {
        axios
        .get(`/api/animal/view/${id}`)
        .then((res) => {
            console.log(res.data);
            setTurtle(res.data);
        })
        .catch(err => console.log(err));
    }, [])

    if (turtle === null) {
        return(<div>Loading...</div>)
    }

    return(
        <div>
            <Navbar />
            <div className="container-fluid">
                <div className="row p-3">
                    <AnimalLinks />
                    <div className="col">
                        <h1 className="display-5 text-center">{turtle.commonName}</h1>
                        <img className="img-fluid rounded w-100" src={`${turtle.imageKey}`} alt="turtle"/>
                        <div className="py-2">
                            <div className="d-flex justify-content-around">
                                <h5>Size : {turtle.size}</h5>
                                <h5>Lifespan : {turtle.lifespan}</h5>
                            </div>
                            <div className="py-2">
                                <p className="lead">Description</p>
                                <p>{turtle.description}</p>
                            </div>
                            <div className="py-2">
                                <p className="lead">Origin</p>
                                <p>{turtle.origin}</p>
                            </div>
                            <div className="py-2">
                                <p className="lead">Diet</p>
                                <p>{turtle.diet}</p>
                            </div>
                            <div className="py-2">
                                <p className="lead">Care</p>
                                <p>{turtle.care}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default AnimalPage;