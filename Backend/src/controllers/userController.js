// src/controllers/userController.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const verifyToken = require('../middlewares/auth');
const router = express.Router();

/**
 * @swagger
 * /user/signup:
 *   post:
 *     summary: Sign up a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               birthdate:
 *                 type: string
 *               gender:
 *                 type: string
 *               city:
 *                 type: string
 *               address:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       201:
 *         description: Successful Signup
 *       400:
 *         description: Bad Request
 */
router.post('/signup', async (req, res) => {
    try {
        const { username, password, email, firstname, lastname, birthdate, gender, city, address, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword, email, firstname, lastname, birthdate, gender, city, address, role });
        await user.save();
        res.status(201).json({ message: 'User signed up successfully' });
    } catch (error) {
        res.status(400).json({ error: `Error signing up: ${error.message}` });
    }
});

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Log in a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful Login
 *       401:
 *         description: Unauthorized
 */
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
        const token = jwt.sign({ userID: user._id }, 'secret-key', { expiresIn: '1d' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
});

/**
 * @swagger
 * /user/{username}:
 *   get:
 *     summary: Get user by username
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: The username of the user to fetch
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User found successfully
 *       404:
 *         description: User not found
 */
router.get('/:username', verifyToken, async (req, res) => {
    try {
        const username = req.params.username;  // Corrected this line
        const user = await User.findOne({ 'username': username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User found successfully', user });
    } catch (error) {
        res.status(404).json({ message: 'Error retrieving user' });
    }
});

/**
 * @swagger
 * /user/:
 *   get:
 *     summary: Get all users (Protected)
 *     security:
 *       - JWT: []  
 *     responses:
 *       200:
 *         description: List of users
 *       500:
 *         description: Server error
 * 
 * components:
 *   securitySchemes:
 *     JWT:
 *       type: apiKey
 *       in: header
 *       name: JWT-Token
 */
router.get('/', verifyToken, async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ message: 'Protected route accessed', users });
    } catch (error) {
        res.status(500).json({ error: `Error retrieving users: ${error.message}` });
    }
});

module.exports = router;
