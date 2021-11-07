import React, { useState, useEffect } from "react";
import axios from "axios";

const AnimalLinks = () => {
    const [turtles, setTurtles] = useState(null);

    useEffect(() => {
        axios
        .get("/api/animal/all")
        .then((res) => {
            setTurtles(res.data);
        })
        .catch(err => console.log(err));
    }, [])

    if (turtles === null) {
        return(<div>Loading....</div>)
    }
    
    return(
        <div className="col-md-2 col-sm">
            <div className="py-2">
                {/* <h3 className="text-center">Turtles</h3> */}
                <ul className="list-group">
                    <li className="list-group-item goldenrod">Turtles</li>
                    {turtles.map((turt, idx) => {
                        if(turt.category === "turtle"){
                            return(
                                <li className="list-group-item" key={idx}>
                                    <small>

                                    <a className="text-decoration-none text-success" href={`/about/${turt._id}`}>{turt.commonName}</a>
                                    </small>
                                </li>
                            )
                        }
                    return("")
                    })} 
                </ul>
            </div>
            <div className="py-2">
                {/* <h3 className="text-center">Tortoises</h3> */}
                    <ul className="list-group">
                        <li className="list-group-item goldenrod">Tortoises</li>
                        {turtles.map((tort, idx) => {
                            if(tort.category === "tortoise"){
                                return(
                                    <li className="list-group-item" key={idx}>
                                        <small>

                                        <a className="text-decoration-none text-success" href={`/about/${tort._id}`}>{tort.commonName}</a>
                                        </small>
                                    </li>
                                )
                            }
                        return("")
                        })}
                    </ul>
                </div>
            </div>
    )
}

export default AnimalLinks