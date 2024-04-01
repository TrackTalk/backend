require("dotenv").config();
const router = require("express").Router();
const {User} = require("../db/models");
const {encrypt, decrypt} = require("../encryption/encryption");
const querystring = require("querystring");
const axios = require ("axios");

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:8000/api/auth/callback';

//the root is localhost:8000/api/auth


router.get("/register/spotify", async (req, res) => {
    try {
        const authorizationUrl = `https://accounts.spotify.com/authorize?${querystring.stringify({
            response_type: 'code',
            client_id: CLIENT_ID,
            scope: 'user-read-email',
            redirect_uri: REDIRECT_URI
        })}`;
        console.log(REDIRECT_URI);
        res.redirect(authorizationUrl);
    } catch (error) {
        console.error('Error initiating Spotify authentication:', error.message);
        // res.status(500).json({ error: 'An error occurred while initiating authentication' });
    }
});


router.get("/register/spotify/callback", async (req, res) => {
    try {
        const {code} = req.query;
        const response = await axios.post('https://accounts.spotify.com/api/token', querystring.stringify({
            grant_type: 'authorization_code', 
            code: code,
            redirect_uri: REDIRECT_URI,
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`
            }
        });

        if(response) {
            const accessToken = response.data.access_token;
            const refreshToken = response.data.refresh_token;

            const userProfileResponse = await axios.get('http://api.spotify.com/v1/me', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            const userFound = await User.findOne({
                where: {
                    spotifyProfileId: userProfileResponse.data.id
                }
            });
            if(!userFound) {
                const accessTokenEncrypted = encrypt(accessToken);
                const refreshTokenEncrypted = encrypt(refreshToken);

                console.log(refreshTokenEncrypted);

                const userCreated = await User.create({
                    userName: `${userProfileResponse.data.email.split("@")[0]}@spotify`,
                    email: userProfileResponse.data.email || '',
                    firstName: userProfileResponse.data.display_name.split(" ")[0],
                    lastName: userProfileResponse.data.display_name.split(" ").pop(),
                    profilePicUrl: userProfileResponse.data.images[0].url,
                    spotifyLogin: true,
                    accessToken: accessTokenEncrypted,
                    refreshToken: refreshTokenEncrypted,
                    spotifyProfileId: userProfileResponse.data.id,
                    
                });

                res.status(200).json({
                    userProfile: userProfileResponse.data,
                    accessToken: accessTokenEncrypted,
                    refreshToken: refreshTokenEncrypted
                });
                
            }
        } else
        res.status(400).send("Error on response");
        
    } catch (error){
        console.error('Error initiating Spotify authentication:', error.message);
        res.status(500).json({ error: 'An error occurred during authentication' });
    }
})


module.exports = router;