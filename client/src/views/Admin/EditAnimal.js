import React from "react";
import axios from "axios";
import { navigate } from "@reach/router";
import Navbar from "../../components/Navbar";
import AnimalForm from "../../components/Admin/AnimalForm";

const EditAnimal = (props) => {
    const {id} = props;

    const deleteAnimal = () => {
        axios
        .delete(`/api/animal/delete/${id}`)
        .then(navigate("/admin"))
    }

    const button = () => {
        return(
            <button className="btn btn-success float-end">EDIT ANIMAL</button>
        )
    }

    return(
        <div>
            <Navbar />
            <div className="container-fluid px-5">
                <p className="display-6 text-center py-2 text-success">Add Animal</p>
                <div className="px-5 pb-5">
                    <AnimalForm func={`update/${id}`} button={button} id={id} />
                    <div className="">
                        <button className="btn btn-danger float-start" onClick={deleteAnimal}>DELETE ANIMAL</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditAnimal