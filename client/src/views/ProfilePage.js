import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Profile from "../components/Profile";
import { UserContext } from "../utils/UserContext";
import Orders from "../components/Orders";

const ProfilePage = () => {
    const [view, setView] = useState(true); // false = view profile, true = view order history
    
    const viewProfile = () => {
        setView(true);
    }

    const viewOrder = () => {
        setView(false);
    }

    return(
        <div>
            <Navbar />
                <div className="container-fluid py-3">
                    <h1 className="text-center display-5 p-3">My Account</h1>
                    <div className="row">
                        <div className="col">
                            <button className="btn btn-outline-secondary btn-sm float-end" onClick={viewProfile}>Update Profile</button>
                        </div>
                        <div className="col">
                            <button className="btn btn-outline-secondary btn-sm float-start" onClick={viewOrder}>Order History</button>
                        </div>
                    </div>
                    <hr />
                    {view ? 
                        <Profile />
                    :
                        <Orders />
                    }
                </div>
            <Footer />
        </div>
    )
}

export default ProfilePage