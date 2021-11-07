import React, { useState } from 'react';
import axios from 'axios';
import GoogleLogin from "../components/GoogleLogin";
import Register from "../components/Register";

const Login = (props) => {
    const {toggle} = props;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState("");
    const [logReg, setLogReg] = useState(true);

    const login = (e) => {
        e.preventDefault();
        const logUser = { email, password }
        axios
            .post("/api/user/login", logUser, { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                window.location.reload(false); //to refresh the page
            })
            .catch((err) => {
                console.log(err);
                setErrors(err.response.data.msg)
            })
    }

    const exit = () => {
        toggle();
    }

    const swap = () => {
        setLogReg(!logReg);
    }

    return(
        <div className="popup container-fluid">
            {logReg ? 
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <p className="modal-title lead">Login</p>
                            <button className="close" onClick={() => {toggle()}}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form onSubmit={login}>
                            <div className="modal-body">
                                <div className="row py-1">
                                    <div className="col-3">
                                        <label className="form-label">Email</label>
                                    </div>
                                    <div className="col">
                                        <input type="email" className="form-control" value={email} onChange={(e) => {setEmail(e.target.value)}} />
                                    </div>
                                </div>
                                <div className="row py-1">
                                    <div className="col-3">
                                        <label className="form-label">Password</label>
                                    </div>
                                    <div className="col">
                                        <input type="password" className="form-control" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
                                    </div>
                                </div>
                                {errors ?
                                    <h6 className="text-danger"><small>{errors}</small></h6>
                                : ""}
                                <div className="row pt-2">
                                    <div className="col">
                                        <span className="btn btn-sm btn-outline-secondary float-start" onClick={swap}>Register</span>
                                    </div>
                                    <div className="col-6">
                                        <GoogleLogin toggle={exit} />
                                    </div>
                                    <div className="col">
                                        <button className="btn btn-primary btn-sm float-end">Login</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            :
                <Register toggle={exit} swap={swap}/>
            }
        </div>
    )
}

export default Login