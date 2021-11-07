import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { UserContext } from "../utils/UserContext";

const Profile = () => {
    const {loggedUser} = useContext(UserContext);
    const [errors, setErrors] = useState([]);
    const [user, setUser] = useState(null)
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [edit, setEdit] = useState(true);
    const [editPass, setEditPass] = useState(true);

    useEffect(() => {
        axios
        .get("/api/user/login_check", { withCredentials: true })
        .then((res) => {
            setUser(res.data);
            setFirstName(res.data.firstName);
            setLastName(res.data.lastName);
            setEmail(res.data.email);
        })
    }, [])

    if (user === null) {
        return(<div>...Loading</div>)
    }

    const cancelEdit = () => {
        setEdit(!edit);
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setEmail(user.email);
        setErrors([]);
    }

    const activatePass = () => {
        setEditPass(!editPass);
        setErrors("");
    }
    
    // Check password to gain access to inputs
    const activateEdit = () => {
        const data = { oldPassword }
        axios
        .post("/api/user/passwordcheck", data, { withCredentials: true })
        .then((res) => {
            console.log(res.data);
            setOldPassword("");
            setErrors("");
            setEdit(false);
        })
        .catch((err) => {
            console.log(err.response.data)
            setErrors(err.response.data)
        })
    }
    
    // Update user info
    const updateInfo = () => {
        const changes = { firstName, lastName, email }
        axios
        .post("/api/user/update", changes, { withCredentials: true })
        .then((res) => {
            console.log(res.data);
            setUser(res.data)
            setErrors([])
            setEdit(true);
        })
        .catch((err) => {
            console.log(err.response.data.errors)
            setErrors(err.response.data.errors)
        })
    }

    // Update user password
    const updatePassword = () => {
        const changes = { oldPassword, password, confirmPassword }
        if(password !== confirmPassword) {
            return setErrors({ msg: "Passwords do not match"})
        } if (password.length <= 4) {
            return setErrors({ msg: "Password needs to be at least 5 characters"})
        } else {
            axios
            .post("/api/user/updatepassword", changes, { withCredentials: true })
            .then(() => window.location.reload(false))
            .catch((err) => {
                console.log(err.response.data)
                setErrors(err.response.data)
            })
        }
    }

    return(
        <div className="py-3">
            <div className="mx-auto w-50 text-muted">
                {editPass ? // Edit User Info
                    <div>
                        <div className="row py-2">
                            <label className="form-label">Email</label>
                            {edit ? 
                                <input className="form-control" type="text" value={email} readOnly />
                            :
                                <input className="form-control" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                            }
                        </div>
                        <div className="row py-2">
                            <label className="form-label">First Name</label>
                            {edit ? 
                                <input className="form-control" type="text" value={firstName} readOnly />
                            :
                                <input className="form-control" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            }
                        </div>
                        <div className="row py-2">
                            <label className="form-label">Last Name</label>
                            {edit ? 
                                <input className="form-control" type="text" value={lastName} readOnly />
                            :
                                <input className="form-control" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            }
                        </div>
                        {user.googleId || edit === false ? // Enter old password to unlock access to update
                            ""
                        :
                            <div className="row py-2">
                                <label className="form-label"><small>Enter password first to edit info</small></label>
                                <input className="form-control" type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)}/>
                            </div>
                        }
                        {errors.msg ? <p className="text-danger">{errors.msg}</p> : ""}
                        {errors.firstName ? <p>{errors.firstName?.message}</p> : ""}
                        {errors.lastName ? <p>{errors.lastName?.message}</p> : ""}
                        {errors.email ? <p>{errors.email?.message}</p> : ""}
                        {user.googleId ? 
                            <p>Google logins not allowed to change profile info</p>
                        :
                            <div className="row py-2">
                                <div className="col">
                                {edit ?
                                    // Button to switch to edit user password
                                    <button className="btn btn-outline-primary float-start" onClick={activatePass}>Edit Password</button>
                                    :
                                    // Button to cancel and return to main
                                    <button className="btn btn-outline-secondary float-start" onClick={cancelEdit}>Cancel</button>
                                }
                                </div>
                                <div className="col">
                                {edit ?
                                    // Button to give access to edit user info after entering password 
                                    <button className="btn btn-outline-primary float-end" onClick={activateEdit}>Edit Info</button>
                                    :
                                    // Button to save changes to user info
                                    <button className="btn btn-outline-primary float-end" onClick={updateInfo}>Save</button>
                                }
                                </div>
                            </div>
                        }
                    </div>
                : // Edit User Password
                    <div>
                        <div className="row py-2">
                            <label className="form-label">Previous Password</label>
                            <input className="form-control" type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                        </div>
                        <div className="row py-2">
                            <label className="form-label">New Password</label>
                            <input className="form-control" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="row py-2">
                            <label className="form-label">Confirm Password</label>
                            <input className="form-control" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        </div>
                        {errors ? <p className="text-danger">{errors.msg}</p> : ""}
                        {errors ? <p className="text-danger">{errors.errors}</p> : ""}
                        <div className="row py-2">
                            <div className="col">
                                {/* Button to cancel and return to main */}
                                <button className="btn btn-outline-secondary float-start" onClick={activatePass}>Cancel</button>
                            </div>
                            <div className="col">
                                {/* Button to save changes to user password */}
                                <button className="btn btn-outline-primary float-end" onClick={updatePassword}>Save</button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Profile