import bcryptjs from 'bcryptjs';

import { User } from '../models/user.model.js';
import { generateJWTAndSetCookie } from '../utils/generateJWT.js';

export async function signup(req, res) {
    try {
        const { username, email, password } = req.body;

        // ensure username, email, and password fields are not empty
        if (!email || !password || !username) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        // ensure email is valid
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: 'Invalid email' });
        }

        // ensure password has more than 6 characters
        if (password.length < 6) {
            return res.status(400).json({ success: false, message: 'Password must contain at least 6 characters' });
        }

        // check if username has already been used
        const userExistsByUsername = await User.findOne({username: username});

        if (userExistsByUsername) {
            return res.status(400).json({ success: false, message: 'This username has already existed' });
        }

        // check if email has already been used
        const userExistsByEmail = await User.findOne({email: email});

        if (userExistsByEmail) {
            return res.status(400).json({ success: false, message: 'This email has already existed' });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const PROFILE_PICS = ['/avatar1.png', '/avatar2.png', '/avatar3.png'];
        const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

        const newUser = User({
            username: username,
            email: email,
            password: hashedPassword,
            image: image
        });

        generateJWTAndSetCookie(newUser._id, res);

        await newUser.save();

        // return a response
        // remove password from the response
        res.status(201).json({
            success: true,
            user: {...newUser._doc, password:''}
        });

    } catch (error) {
        console.log(`Error in signup controller: ${error}`);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export async function signin(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        const user = await User.findOne({email: email});

        if (!user) {
            return res.status(404).json({ success: false, message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(404).json({ success: false, message: 'Invalid credentials' });
        }

        generateJWTAndSetCookie(user._id, res);

        res.status(200).json({
            success: true,
            user: {...user._doc, password: ''}
        });
    } catch (error) {
        console.log(`Error in signin controller: ${error}`);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export async function signout(req, res) {
    try {
        res.clearCookie('jwt-netflix-clone');
        res.status(500).json({ success: true, message: 'Signed out successfully' });
    } catch (error) {
        console.log(`Error in signout controller: ${error}`);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export async function authCheck(req, res) {
    try {
        res.status(200).json({ success: true, user: req.user });
    } catch (error) {
        console.log(`Error in authCheck controller: ${error}`);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}
