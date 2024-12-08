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
 *         description: Successful signup
 *       500:
 *         description: Error in signup
 */
router.post('/signup', async (req, res) => {
    try {
        const { username, password, email, firstname, lastname, birthdate, gender, city, address, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword, email, firstname, lastname, birthdate, gender, city, address, role });
        await user.save();
        res.status(201).json({ message: 'User signed up successfully' });
    } catch (error) {
        res.status(500).json({ error: `Error in signup: ${error.message}` });
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
 *         description: Successful login
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Error in login
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
        res.status(500).json({ error: `Error in login: ${error.message} ` });
    }
});

/**
 * @swagger
 * /user/{username}:
 *   get:
 *     summary: Customer can get user by username
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: The username of the user to get
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 *       500:
 *         description: Error in get user
 * components:
 *   securitySchemes:
 *     JWT:
 *       type: apiKey
 *       in: header
 *       name: JWT-Token
 */
router.get('/:username', verifyToken, async (req, res) => {
    try {
        const username = req.params.username;
        const user = await User.findOne({ 'username': username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User found', user });
    } catch (error) {
        res.status(500).json({ error: `Error in get user: ${error.message} ` });
    }
});
/**
 * @swagger
 * /user/{username}/edit/:
 *   put:
 *     summary: Customer can edit info by username
 *     security:
 *       - JWT: []  
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: The username of the user to edit
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
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
 *     responses:
 *       200:
 *         description: Successful edit
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 *       500:
 *         description: Error in edit
 * components:
 *   securitySchemes:
 *     JWT:
 *       type: apiKey
 *       in: header
 *       name: JWT-Token
 */
router.put('/:username/edit', verifyToken, async (req, res) => {
    try {
        const username = req.params.username;
        const { firstname, lastname, birthdate, gender, city, address } = req.body;
        if (!firstname || !lastname || !birthdate || !gender || !city || !address) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const update = { firstname, lastname, birthdate, gender, city, address };
        const user = await User.findOneAndUpdate({ 'username': username }, update, { new: true })
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: `User updated`, user })
    }
    catch (error) {
        res.status(500).json({ error: `Error in edit: ${error.message} ` });
    }
})


/**
 * @swagger
 * /users/:
 *   get:
 *     summary: Admin can get all users 
 *     security:
 *       - JWT: []  
 *     responses:
 *       200:
 *         description: Successful get
 *       500:
 *         description: Error in get users
 * 
 * components:
 *   securitySchemes:
 *     JWT:
 *       type: apiKey
 *       in: header
 *       name: JWT-Token
 */
router.get('/users', verifyToken, async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ message: 'Users found', users });
    } catch (error) {
        res.status(500).json({ error: `Error in get users: ${error.message}` });
    }
});


/**
 * @swagger
 * /user/{username}/:
 *   put:
 *     summary: Admin can approve user authority by username
 *     security:
 *       - JWT: []  
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: The username of the user to edit
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: enum:'Pending', 'Approved'
 *     responses:
 *       200:
 *         description: Successful edit
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 *       500:
 *         description: Error in approve authority
 * components:
 *   securitySchemes:
 *     JWT:
 *       type: apiKey
 *       in: header
 *       name: JWT-Token
 */
router.put('/:username', verifyToken, async (req, res) => {
    try {
        const username = req.params.username;
        const { status } = req.body;
        if (!status) {
            return res.status(400).json({ error: "Status required" });
        }
        let role = 'User'
        if (status === 'Approved') {
            role = 'Manager'
        }
        const update = { status, role };
        const user = await User.findOneAndUpdate({ 'username': username }, update, { new: true })
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: `User updated`, user })
    }
    catch (error) {
        res.status(500).json({ error: `Error in approve authority: ${error.message} ` });
    }
})


/**
 * @swagger
 * /user/{username}/:
 *   delete:
 *     summary: Admin can delete user by username
 *     security:
 *       - JWT: []  
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: The username of the user to edit
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful edit
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 *       500:
 *         description: Error in approve authority
 * components:
 *   securitySchemes:
 *     JWT:
 *       type: apiKey
 *       in: header
 *       name: JWT-Token
 */
router.delete('/:username', verifyToken, async (req, res) => {
    try {
        const username = req.params.username;
        const user= await User.findOneAndDelete({'username':username})
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: `User deleted`, user })
    }
    catch (error) {
        res.status(500).json({ error: `Error in delete user: ${error.message} ` });
    }
})

module.exports = router;
