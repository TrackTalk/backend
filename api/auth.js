require("dotenv").config();
// import generateTokenAndSetCookie from "../utils/generateJWT";
const { generateTokenAndSetCookie } = require("../utils/generateJWT");
const router = require("express").Router();
const {User} = require("../db/models");
const {encrypt, decrypt} = require("../encryption/encryption");
const querystring = require("querystring");
const axios = require ("axios");
const bcrypt  = require('bcrypt'); 

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = `${process.env.BACKEND_URL}/api/auth/callback`;
const FRONTEND_URL = process.env.FRONTEND_URL;

//the root is localhost:8000/api/auth

router.post("/login", async (req, res, next) => {
    try{
        const loginAttempt = req.body;
        if(!loginAttempt) return res.status(400).send('Login information missing');
        let loginStatus;
        const foundUser = await User.findOne({
            where: {
                userName: loginAttempt.userName,
            }
        });
        if(foundUser){
            // console.log(encrypt("1234"))
            // console.log(encrypt("1234"))
            const passwordCheck = await bcrypt.compare(loginAttempt.password, foundUser?.password || "")

            if(passwordCheck){
                const {password, ...userWithoutPassword} = foundUser.toJSON();
                loginStatus = {
                    loginSuccess: true,
                    foundUser: userWithoutPassword,
                }
                await generateTokenAndSetCookie(foundUser.userId, res)
                return res.status(200).json(loginStatus);
            } else {
                return res.status(401).send("Username or password wrong");
            }
        } else {
            return res.status(401).send("Username or password wrong");
        }
    } catch (error) {
        next(error);
    }
});


router.post("/register", async (req, res, next) => {
    try{
        const newUserData = req.body;
        if(!newUserData) return res.status(400).send('New user data missing');

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newUserData.password, salt);
        if(hashedPassword) newUserData.password = hashedPassword;

        const newUser = await User.create(newUserData, {
            returning: true,
        })

        if(newUser){
            await generateTokenAndSetCookie(newUser.userId, res)
            const {password, ...userWithoutPassword} = newUser.toJSON();
            const loginStatus = {
                loginSuccess: true,
                foundUser: userWithoutPassword,
            }
            return res.status(200).json(loginStatus);
        } else {
            return res.status(400).send(`Failed to create a new User`);
        }

    } catch (error) {
        next(error);
    }
});

router.get("/logout", (req, res, next) => {
    try {
        res.cookie("jwt", "", {
            maxAge: 0
        });
        res.status(200).send("Logged out successfully");
        
    } catch (error) {
        next(error);
    }
});

router.get("/spotify", async (req, res) => {
    try {
        const authorizationUrl = `https://accounts.spotify.com/authorize?${querystring.stringify({
            response_type: 'code',
            client_id: CLIENT_ID,
            scope: 'user-read-email',
            redirect_uri: REDIRECT_URI
        })}`;
        await res.redirect(authorizationUrl);
    } catch (error) {
        console.error('Error initiating Spotify authentication:', error.message);
        // res.status(500).json({ error: 'An error occurred while initiating authentication' });
    }
});


router.get("/callback", async (req, res) => {
    try {
        let frontendRedirectURL = "";
        let loginStatus;
        const {code} = req.query;
        const response = await axios.post('https://accounts.spotify.com/api/token', querystring.stringify({
            client_id: CLIENT_ID,
            grant_type: 'authorization_code', 
            code: code,
            redirect_uri: REDIRECT_URI,
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: 'Basic ' + (new Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
            },
            json: true
        });
        

        if(response) {
            const accessToken = response.data.access_token;
            const refreshToken = response.data.refresh_token;

            const userProfileResponse = await axios.get('http://api.spotify.com/v1/me', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }); 

            let userFound = await User.findOne({
                where: {
                    spotifyProfileId: userProfileResponse.data.id
                }
            });

            if(!userFound) {
                const userCreated = await User.create({
                    userName: `${userProfileResponse.data.email.split("@")[0]}@spotify`,
                    email: userProfileResponse.data.email || '',
                    firstName: userProfileResponse.data.display_name.split(" ")[0],
                    lastName: userProfileResponse.data.display_name.split(" ").pop(),
                    profilePicUrl: userProfileResponse.data.images[0].url,
                    spotifyLogin: true,
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    spotifyProfileId: userProfileResponse.data.id,
                    
                });

                if(userCreated){
                    await generateTokenAndSetCookie(userCreated.id, res)
                    const {password, ...userWithoutPassword} = userCreated.toJSON();
                    loginStatus = {
                        loginSuccess: true,
                        foundUser: userWithoutPassword,
                    }
                    frontendRedirectURL = `${FRONTEND_URL}/callback?loginStatus=${encodeURIComponent(JSON.stringify(loginStatus))}`
                    return res.redirect(frontendRedirectURL);
                } else {
                    return res.status(400).send("The new user is not created")
                };
                
            } else {
                
                if(userFound) {
                    const {password, ...userWithoutPassword} = userFound.toJSON();
                    loginStatus = {
                        loginSuccess: true,
                        foundUser: userWithoutPassword,

                    }
                    // set the cookie and send back the user data
                    await generateTokenAndSetCookie(userFound.dataValues.userId, res);
                    frontendRedirectURL = `${FRONTEND_URL}/callback?loginStatus=${encodeURIComponent(JSON.stringify(loginStatus))}`

                    return res.redirect(frontendRedirectURL)
                } else {
                    return res.status(400).send("The user is found but cannot be updated.")
                }
            }
        } else {
            return res.status(400).send("Error on response");
        }
    } catch (error){
        console.error('Error initiating Spotify authentication:', error.message);
        res.status(500).json({ error: 'An error occurred during authentication' });
    }
});


module.exports = router;