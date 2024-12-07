const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();


function verifyToken(req, res, next) {
    const token = req.header('JWT-Token');
    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {
        const decoded = jwt.verify(token, 'secret-key');
        req.userID = decoded.userID;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = verifyToken;


/**
 * @swagger
 * /signup:
 *   post:
 *     summary: signup a user
 *     parameters:
 *       - in: body
 *         name: username
 *         required: true
 *         schema:
 *          type: string
 * 
 *     responses:
 *       200:
 *         description: Successful Signup
 *       404:
 *         description: Error in Signup
 */
router.post('/signup', async (req, res) => {
    try {
        const {
            username,
            password,
            email,
            firstname,
            lastname,
            birthdate,
            gender,
            city,
            address,
            role,
        } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            password: hashedPassword,
            email,
            firstname,
            lastname,
            birthdate,
            gender,
            city,
            address,
            role,
        });

        await user.save();
        res.status(201).json({ message: 'User signed up successfully' });
    } catch (error) {
        res.status(404).json({ error: `Error signing up: ${error.message}` });
    }
});


router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: 'User not Found' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Wrong Password' });
        }
        const token = jwt.sign({ userID: user._id }, 'secret-key', {
            expiresIn: '1d',
        });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
});

router.get('/:username', verifyToken, async (req, res) => {
    try {

        const username = req.params('username')
        const user = await User.findOne({ 'username': username })
        res.status(200).json({ message: 'User found successfuly', user })

    }
    catch (error) {
        res.status(404).json({ message: 'User not found' })
    }
})


router.get('/users', verifyToken, async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ message: 'Protected route accessed', users });
    } catch (error) {
        res.status(500).json({ error: `Error retrieving users: ${error.message}` });
    }
});

module.exports = router; 
