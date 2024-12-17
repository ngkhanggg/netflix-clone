import jwt from 'jsonwebtoken';

import { ENV_VARS } from '../config/envVars.js';

export const generateJWTAndSetCookie = (userId, res) => {
    const token = jwt.sign({userId}, ENV_VARS.JWT_SECRET, {expiresIn: '15d'});

    res.cookie('jwt-netflix-clone', token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,  // 15 days
        httpOnly: true,  // prevent XSS and cross-site scripting attacks and make it inaccessible to JS
        sameSite: 'strict',  // prevent CSRF and cross-site request forgery attacks
        secure: ENV_VARS.NODE_ENV !== 'dev'
    });
};