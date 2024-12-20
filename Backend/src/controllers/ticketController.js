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
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: matchId
 *         in: path
 *         required: true
 *         description: ID of the match for which the ticket is being reserved
 *         schema:
 *           type: string
 *       - name: JWT-Token
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
/**
 * @swagger
 * /ticket:
 *   get:
 *     summary: Get all tickets for the authenticated user
 *     description: Retrieves a list of tickets reserved by the authenticated user with detailed match and stadium information. Requires a valid token.
 *     tags: 
 *       - Ticket
 *     parameters:
 *       - name: JWT-Token
 *         in: header
 *         required: true
 *         description: Bearer token for user authentication
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Tickets retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "675f89a67a7d9c29477df74c"
 *                   homeTeam:
 *                     type: string
 *                     example: "ahlyyyy22222"
 *                   awayTeam:
 *                     type: string
 *                     example: "zamalekkkkkkk"
 *                   stadiumID:
 *                     type: string
 *                     example: "675f832d77bffd400eeb8b94"
 *                   stadiumName:
 *                     type: string
 *                     example: "New stadium"
 *                   dateTime:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-12-07T17:00:00.000Z"
 *                   mainReferee:
 *                     type: string
 *                     example: "Referee John Doe"
 *                   linesman1:
 *                     type: string
 *                     example: "Linesman Jane Doe"
 *                   linesman2:
 *                     type: string
 *                     example: "Linesman Tom Smith"
 *                   userID:
 *                     type: string
 *                     example: "675f1123d244a6cc268c6078"
 *                   seatRowIndex:
 *                     type: integer
 *                     example: 1
 *                   seatColumnIndex:
 *                     type: integer
 *                     example: 1
 *       204:
 *         description: No tickets found for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No matches found
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Unauthorized
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
router.get('/', verifyToken, async (req, res) => {
    const userID = req.userID;

    try {
        const tickets = await Ticket.find({ userID }).populate({
            path: 'matchID',
            populate: { path: 'stadiumID' }
        });

        if (tickets.length > 0) {
            const transformedTickets = tickets.map(ticket => {
                const match = ticket.matchID || {};
                const stadium = match.stadiumID || {};
                return {
                    _id: match._id || null,
                    homeTeam: match.homeTeam || 'Unknown',
                    awayTeam: match.awayTeam || 'Unknown',
                    stadiumID: stadium._id || null,
                    stadiumName: stadium.name || 'Unknown',
                    dateTime: match.dateTime || null,
                    mainReferee: match.mainReferee || 'Unknown',
                    linesman1: match.linesman1 || 'Unknown',
                    linesman2: match.linesman2 || 'Unknown',
                    userID: ticket.userID,
                    seatRowIndex: ticket.seatRowIndex,
                    seatColumnIndex: ticket.seatColumnIndex
                };
            });

            res.status(200).json(transformedTickets);
        } else {
            res.status(204).send({ message: 'No matches found' });
        }

    } catch (error) {
        console.error('Error fetching tickets:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


/**
 * @swagger
 * /ticket/{ticketId}:
 *   delete:
 *     summary: Delete a ticket by ID
 *     description: Deletes a specific ticket for the authenticated user based on the ticket ID. Requires a valid token.
 *     tags: 
 *       - Ticket
 *     parameters:
 *       - name: ticketId
 *         in: path
 *         required: true
 *         description: ID of the ticket to be deleted
 *         schema:
 *           type: string
 *           example: 64a2c7e834edf8456d3c5f90
 *       - name: JWT-Token
 *         in: header
 *         required: true
 *         description: Bearer token for user authentication
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Ticket deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Ticket deleted successfully
 *       404:
 *         description: Ticket not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Ticket not found
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Unauthorized to delete this ticket
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
router.delete('/:ticketId', verifyToken, async (req, res) => {
    const { ticketId } = req.params;
    const userID = req.userID;

    try {
        const ticket = await Ticket.findById(ticketId);
        if (!ticket) {
            return res.status(404).send({ error: 'Ticket not found' });
        }

        if (ticket.userID.toString() !== userID) {
            return res.status(403).json({ error: 'Unauthorized to delete this ticket' });
        }

        await Ticket.deleteOne({ _id: ticketId });

        res.status(200).json({ message: 'Ticket deleted successfully' });
    } catch (error) {
        console.error('Error deleting ticket:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
module.exports = router;
