const express = require('express');
const router = express.Router();

const User = require('../models/user');
const verifyToken = require('../middlewares/auth');
const Stadium = require('../models/stadium');

router.post('/',verifyToken, async (req, res) => {
    const stadiumData = req.body;
    const userID = req.userID;
    try {
        const manager = await User.findById(userID);
        if(manager.role != 'Manager'){
            return res.status(403).json({ error: "Access denied: Managers only" });
        }

        const stadium = new Stadium(stadiumData);
        await stadium.save();

        res.status(201).json({ message: 'Stadium added successfully', stadium });
    } catch (error) {
        console.error('Error adding stadium:', error);
        res.status(500).json({ message: 'Error adding stadium', error });
    }
})
module.exports = router;
