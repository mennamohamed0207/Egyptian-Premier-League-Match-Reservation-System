const express = require('express');
const router = express.Router();

const User = require('../models/user');
const verifyToken = require('../middlewares/auth');
const Stadium = require('../models/stadium');
const Match = require('../models/match')
const Ticket = require('../models/ticket')

router.post('/:matchId', verifyToken, async (req, res) => {
    const { matchId } = req.params;
    const { seatRowIndex, seatColumnIndex } = req.body;
    const userID = req.userID;

    try {
        const match = await Match.findById(matchId);
        if (!match) {
            return res.status(404).json({ error: 'Match not found' });
        }
        
        if (!match.seats || !match.seats[seatRowIndex] || match.seats[seatRowIndex][seatColumnIndex] !== 0) {
            return res.status(400).json({ error: 'Seat is already reserved or invalid' });
        }

        match.seats[seatRowIndex][seatColumnIndex] = 1;
        await match.save();

        const ticket = new Ticket({
            matchID:matchId,
            userID,
            seatRowIndex,
            seatColumnIndex,
        });

        await ticket.save();

        res.status(201).json({ message: 'Ticket reserved successfully', ticket });
    } catch (error) {
        console.error('Error reserving ticket:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
module.exports = router;
