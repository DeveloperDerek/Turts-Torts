import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import moment from "moment" //moment(insert date here).format("MMM Do YY");

const ViewMessages = () => {
    const [messages, setMessages] = useState(null);
    const [search, setSearch] = useState("");

    useEffect(() => {
        axios
        .get(`/api/contact/getall/${search}`)
        .then((res) => {
            console.log(res.data)
            setMessages(res.data)})
    }, [search])
    
    if(messages === null) {
        return(<div>Loading...</div>)
    }

    return(
        <div>
            <Navbar />
            <div className="container-fluid">
                <div className="px-5">
                    <p className="display-6 text-center py-2 text-success">Search Messages</p>
                    <div className="px-5">
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" onChange={(e) => setSearch(e.target.value)}/>
                            <label>Email</label>
                        </div>
                        {messages.map((msg, idx) => {
                            return(
                                <div key={idx} className="border mb-3 px-3 pt-2 bg-white">
                                    <p>{msg.fullName}</p>
                                    <p>{msg.email}</p>
                                    <p>{moment(msg.createdAt).format("MMMM Do, YYYY")}</p>
                                    <p>{msg.message}</p>
                                    {msg.orderNumber ? 
                                        <p>Order #{msg.orderNumber}</p>
                                    :
                                        ""
                                    }
                                    {msg.phoneNumber ?
                                        <p>Phone #{msg.phoneNumber}</p>
                                    :
                                        ""
                                    }
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewMessages