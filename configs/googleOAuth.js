const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'postmessage'
);

exports.getProfileInfo = async (token) => {
    const idToken = token

    const ticket = await client.verifyIdToken({idToken, audience: process.env.GOOGLE_CLIENT_ID})

    const payload = ticket.payload;
    
    return payload;
};