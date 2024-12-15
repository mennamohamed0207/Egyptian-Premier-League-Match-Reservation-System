const express = require('express');
const router = express.Router();

const Match = require('../models/match');
const User = require('../models/user');
const verifyToken = require('../middlewares/auth');

router.get('/', async (req, res) => {
    try {
        const matches = await Match.find();

        if (matches.length > 0) {
            res.json(matches);
        } else {
            res.status(404).send({ message: 'No matches found' });
        }
    } catch (err) {
        console.error('Error fetching matches:', err);
        res.status(500).send({ message: 'Error fetching matches' });
    }
})

router.post('/',verifyToken, async (req, res) => {
    try {
        const matchData = req.body;
        const userID = req.userID;

        const manager = await User.findById(userID);
        if(manager.role != 'Manager'){
            return res.status(403).json({ error: "You are not authorized to add a match" });
        }

        const match = new Match(matchData);
        await match.save();

        res.status(201).json({ message: 'Match created successfully', match });
    } catch (error) {
        console.error('Error creating match:', error);
        res.status(500).json({ message: 'Error creating match', error });
    }
})
// rawan_manager, securePassword123 , eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NzVmMjMwYzAzZmFlNzBlNDMxZjc2MjYiLCJpYXQiOjE3MzQyODgyOTAsImV4cCI6MTczNDM3NDY5MH0.AY1Hhs0vQYzOK9hxa8gXmVlysog9oBIr1dBJlSzs28w
// rawan, rawan123, eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NzVmMTEyM2QyNDRhNmNjMjY4YzYwNzgiLCJpYXQiOjE3MzQyODM2MDEsImV4cCI6MTczNDM3MDAwMX0.AIn0VxE3zO0q-kCnSZM6qdSb6UWbZsIsJMCYmeooB3A
module.exports = router;
