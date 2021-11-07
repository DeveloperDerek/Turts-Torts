import React, { useState } from "react";
import axios from "axios";
import { navigate } from "@reach/router";
import Navbar from "../../components/Navbar";
import AnimalForm from "../../components/Admin/AnimalForm";

const CreateAnimal = () => {

    const button = () => {
        return(
            <button className="btn btn-dark float-end">ADD ANIMAL</button>
        )
    }

    return(
        <div>
            <Navbar />
            <div className="container-fluid px-5">
                <p className="display-6 text-center py-2 text-success">Add Animal</p>
                <div className="px-5 pb-5">
                    <AnimalForm func="create" button={button} />
                </div>
            </div>
        </div>
    )
}

export default CreateAnimal