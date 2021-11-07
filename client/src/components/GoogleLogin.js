import React from 'react';
import GoogleLogin from 'react-google-login';
import { login } from "../utils/GoogleAuth";

export default (props) => {
    const {toggle} = props;

    const success = async (res) => {
        try{
            login(res.tokenId);
            toggle();
        } catch (e) {
            console.log(e)
        }
    };

    const failed = () => {
        console.log("failed")
    }

    return (
        <div>
            <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                buttonText="Login with Google"
                redirectUri=""
                onSuccess={success}
                onFailure={failed}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    );
};