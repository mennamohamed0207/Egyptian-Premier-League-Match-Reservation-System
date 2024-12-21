// src/controllers/userController.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const verifyToken = require('../middlewares/auth');
const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management APIs
 */

/**
 * @swagger
 * /user/signup:
 *   post:
 *     tags:
 *       - User
 *     summary: User can signup as a customer
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
 *                 format: date
 *               gender:
 *                 type: string
 *                 enum:
 *                  - Female
 *                  - Male
 *               city:
 *                 type: string
 *               address:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum:
 *                  - Manager
 *                  - User
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
        if (role == 'Admin') {
            res.status(403).json({ error: "You can't sign up as admin" });
        }
        let status='Not Approved'
        if (role == 'Manager') {
            status = 'Pending'
        }
        const user = new User({ username, password: hashedPassword, email, firstname, lastname, birthdate, gender, city, address, status, role });
        await user.save();
        res.status(201).json({ message: 'User signed up successfully', user });
    } catch (error) {
        res.status(500).json({ error: `Error in signup: ${error.message}` });
    }
});

/**
 * @swagger
 * /user/login:
 *   post:
 *     tags:
 *       - User
 *     summary: User can login
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
 *         description: Wrong Password
 *       404:
 *         description: User not Found
 *       500:
 *         description: Error in login
 */
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: 'User not Found' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Wrong Password' });
        }
        const token = jwt.sign({ userID: user._id }, 'secret-key', { expiresIn: '1d' });
        res.status(200).json({ message: 'User logged in successfully', token, user });
    } catch (error) {
        res.status(500).json({ error: `Error in login: ${error.message} ` });
    }
});


/**
 * @swagger
 * /user/{username}:
 *   get:
 *     tags:
 *       - User
 *     summary: User can get his info by username
 *     security:
 *       - JWT: [] 
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
 *     tags:
 *       - User
 *     summary: User can edit his info by username
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
 *                 format: date
 *               gender:
 *                 type: string
 *                 enum:
 *                  - Female
 *                  - Male
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
 * /user/{username}/change-password:
 *   put:
 *     tags:
 *       - User
 *     summary: User can change password
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
 *               newPassword:
 *                 type: string
 *               confirmPassword:
 *                 type: string
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
router.put('/:username/change-password',verifyToken,async (req,res)=>{
    try{
        const username = req.params.username; 
        const {newPassword, confirmPassword} = req.body;
        if(newPassword !== confirmPassword){
            return res.status(400).json({error: "Password mismatch"})
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const update = { password:hashedPassword  }
        const user = await User.findOneAndUpdate({ 'username': username }, update, { new: true })
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: `Password changed`, user })

    }
    catch(error){
        res.status(500).json({error: `Error in change password: ${error.message}`})
    }
})


/**
 * @swagger
 * /user/{username}/users/:
 *   get:
 *     tags:
 *       - User
 *     summary: Admin can get all users 
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
 *         description: Successful get
 *       403:
 *         description: Not admin
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
router.get('/:username/users', verifyToken, async (req, res) => {
    
    try {
        const username = req.params.username;
        const admin = await User.findOne({ 'username': username });
        if(admin.role!=='Admin'){
            return res.status(403).json({ error: "You are not admin" });
        }
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
 *     tags:
 *       - User
 *     summary: Admin can approve user authority by username
 *     security:
 *       - JWT: []  
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: The username of the admin
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerUsername:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum:
 *                  - Pending
 *                  - Approved
 *                  - Not Approved
 *     responses:
 *       200:
 *         description: Successful edit
 *       400:
 *         description: Bad request
 *       403:
 *         description: Not admin
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
        const admin = await User.findOne({ 'username': username });
        if(admin.role!=='Admin'){
            return res.status(403).json({ error: "You are not admin" });
        }
        const {customerUsername ,status } = req.body;
        const checkUser = await User.findOne({ 'username': customerUsername });
        if (checkUser.role === 'Admin') {
            return res.status(403).json({ error: "You can't approve admin" });
        }
        if (!status) {
            return res.status(400).json({ error: "Status required" });
        }
        
        let role = 'User'
        if (status === 'Approved') {
            role = 'Manager'
        }
        else if (status === 'Not Approved') {
            role = 'User'
        }
        const update = { status, role };
        const user = await User.findOneAndUpdate({ 'username': customerUsername }, update, { new: true })
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: `User updated`, customerUsername })
    }
    catch (error) {
        res.status(500).json({ error: `Error in approve authority: ${error.message} ` });
    }
})

/**
 * @swagger
 * /user/{username}/:
 *   delete:
 *     tags:
 *       - User
 *     summary: Admin can delete user by username
 *     security:
 *       - JWT: []  
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: The username of the admin
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerUsername:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful edit
 *       400:
 *         description: Bad request
 *       403:
 *         description: Not admin
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
        const admin = await User.findOne({ 'username': username });
        if(admin.role!=='Admin'){
            return res.status(403).json({ error: "You are not admin" });
        }

        const {customerUsername} = req.body;
        const customer = await User.findOne({ 'username': customerUsername });
        if(!customer){
            return res.status(404).json({ message: 'User not found' });
        }
        if(customer.role==='Admin'){
            return res.status(403).json({ error: "You can't delete admin" });
        }
        
        const user= await User.findOneAndDelete({'username':customerUsername})
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: `User deleted`, customerUsername })
    }
    catch (error) {
        res.status(500).json({ error: `Error in delete user: ${error.message} ` });
    }
})



//todo check authority for admins
module.exports = router;
