const express = require('express');
const router = express.Router();

const User = require('../models/user');
const verifyToken = require('../middlewares/auth');
const Stadium = require('../models/stadium');
const Match = require('../models/match')
const Ticket = require('../models/ticket')

/**
 * @swagger
 * /ticket/{matchId}:
 *   post:
 *     summary: Reserve a ticket for a specific match
 *     description: Allows a user to reserve a seat for a specific match. The seat must not already be reserved.
 *     tags: 
 *       - Ticket
 *     parameters:
 *       - name: matchId
 *         in: path
 *         required: true
 *         description: ID of the match for which the ticket is being reserved
 *         schema:
 *           type: string
 *       - name: Authorization
 *         in: header
 *         required: true
 *         description: Bearer token for user authentication
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               seatRowIndex:
 *                 type: integer
 *                 description: The row index of the seat to reserve
 *                 example: 1
 *               seatColumnIndex:
 *                 type: integer
 *                 description: The column index of the seat to reserve
 *                 example: 2
 *     responses:
 *       201:
 *         description: Ticket reserved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Ticket reserved successfully
 *                 ticket:
 *                   type: object
 *                   properties:
 *                     matchID:
 *                       type: string
 *                       example: 64a2c6f734edf8456d3c5f89
 *                     userID:
 *                       type: string
 *                       example: 64a2c7e834edf8456d3c5f90
 *                     seatRowIndex:
 *                       type: integer
 *                       example: 1
 *                     seatColumnIndex:
 *                       type: integer
 *                       example: 2
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Seat is already reserved or invalid
 *       404:
 *         description: Match not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Match not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */
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
