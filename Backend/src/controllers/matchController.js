const express = require('express');
const router = express.Router();

const Match = require('../models/match');
const User = require('../models/user');
const Stadium = require('../models/stadium');
const verifyToken = require('../middlewares/auth');

/**
 * @swagger
 * /match:
 *   get:
 *     tags:
 *       - Match
 *     summary: Get all matches
 *     description: Fetches all matches from the database. If no matches are found, a 404 status is returned.
 *     responses:
 *       200:
 *         description: A list of matches
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: Unique identifier for the match
 *                     example: "675472033f2f9fdb65ed1f53"
 *                   homeTeam:
 *                     type: string
 *                     description: Name of the home team
 *                     example: "Team A"
 *                   awayTeam:
 *                     type: string
 *                     description: Name of the away team
 *                     example: "Team B"
 *                   stadiumID:
 *                     type: string
 *                     description: Identifier for the stadium
 *                     example: "60dabc1234567890abcdef12"
 *                   seats:
 *                     type: array
 *                     description: 2D array representing the seating arrangement
 *                     items:
 *                       type: array
 *                       items:
 *                         type: number
 *                         example: 0
 *                   dateTime:
 *                     type: string
 *                     format: date-time
 *                     description: The date and time of the match
 *                     example: "2024-12-07T17:00:00.000+00:00"
 *                   mainReferee:
 *                     type: string
 *                     description: Name of the main referee
 *                     example: "Referee John Doe"
 *                   linesman1:
 *                     type: string
 *                     description: Name of the first linesman
 *                     example: "Linesman Jane Doe"
 *                   linesman2:
 *                     type: string
 *                     description: Name of the second linesman
 *                     example: "Linesman Tom Smith"
 *       204:
 *         description: No matches found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No matches found
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error fetching matches
 */
router.get('/', async (req, res) => {
    try {
        const matches = await Match.find();

        if (matches.length > 0) {
            res.status(200).json(matches);
        } else {
            res.status(204).send({ message: 'No matches found' });
        }
    } catch (err) {
        console.error('Error fetching matches:', err);
        res.status(500).send({ message: 'Error fetching matches' });
    }
})
/**
 * @swagger
 * /match:
 *   post:
 *     summary: Create a new match
 *     tags:
 *       - Match
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: JWT-Token
 *         in: header
 *         required: true
 *         description: Bearer token for user authentication
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Details of the match to be created.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               homeTeam:
 *                 type: string
 *                 example: "ahly"
 *                 description: Name of the home team.
 *               awayTeam:
 *                 type: string
 *                 example: "zamalek"
 *                 description: Name of the away team.
 *               stadiumID:
 *                 type: string
 *                 example: "60dabc1234567890abcdef12"
 *                 description: ID of the stadium where the match will be played.
 *               seats:
 *                 type: array
 *                 items:
 *                   type: array
 *                   items:
 *                     type: integer
 *                 example: [[0, 1, 0], [0, 1, 0], [1, 0, 1]]
 *                 description: Seat availability as a 2D array.
 *               dateTime:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-12-07T17:00:00Z"
 *                 description: Date and time of the match.
 *               mainReferee:
 *                 type: string
 *                 example: "Referee John Doe"
 *                 description: Name of the main referee.
 *               linesman1:
 *                 type: string
 *                 example: "Linesman Jane Doe"
 *                 description: Name of the first linesman.
 *               linesman2:
 *                 type: string
 *                 example: "Linesman Tom Smith"
 *                 description: Name of the second linesman.
 *     responses:
 *       201:
 *         description: Match created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Match created successfully"
 *                 match:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60dabc1234567890abcdef12"
 *                     homeTeam:
 *                       type: string
 *                       example: "ahly"
 *                     awayTeam:
 *                       type: string
 *                       example: "zamalek"
 *                     stadiumID:
 *                       type: string
 *                       example: "60dabc1234567890abcdef12"
 *                     seats:
 *                       type: array
 *                       items:
 *                         type: array
 *                         items:
 *                           type: integer
 *                       example: [[0, 1, 0], [0, 1, 0], [1, 0, 1]]
 *                     dateTime:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-12-07T17:00:00Z"
 *                     mainReferee:
 *                       type: string
 *                       example: "Referee John Doe"
 *                     linesman1:
 *                       type: string
 *                       example: "Linesman Jane Doe"
 *                     linesman2:
 *                       type: string
 *                       example: "Linesman Tom Smith"
 *       403:
 *         description: Unauthorized - Only managers can add a match.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "You are not authorized to add a match"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error creating match"
 */
router.post('/', verifyToken, async (req, res) => {
    const { homeTeam, awayTeam, stadiumID, dateTime, mainReferee, linesman1, linesman2 } = req.body;
    const userID = req.userID;

    try {
        const manager = await User.findById(userID);
        if(manager.role != 'Manager'){
            return res.status(403).json({ error: "Access denied: Managers only" });
        }
        const stadium = await Stadium.findById(stadiumID);
        if (!stadium) {
            return res.status(404).json({ error: 'Stadium not found' });
        }

        const seats = Array.from({ length: stadium.length }, () =>
            Array(stadium.width).fill(0)
        );

        const match = new Match({
            homeTeam,
            awayTeam,
            stadiumID,
            dateTime,
            mainReferee,
            linesman1,
            linesman2,
            seats,
        });

        await match.save();
        res.status(201).json(match);
    } catch (error) {
        console.error('Error creating match:', error);
        res.status(500).json({ error: error.message });
    }
});


/**
 * @swagger
 * /match/{matchId}:
 *   put:
 *     tags:
 *       - Match
 *     summary: Update a match by ID
 *     description: Updates the specified fields of a match by ID. Access is restricted to managers only.
 *     parameters:
 *       - name: JWT-Token
 *         in: header
 *         required: true
 *         description: Bearer token for user authentication
 *         schema:
 *           type: string
 *       - in: path
 *         name: matchId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the match to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               homeTeam:
 *                 type: string
 *                 description: Name of the home team
 *               awayTeam:
 *                 type: string
 *                 description: Name of the away team
 *               stadiumID:
 *                 type: string
 *                 description: Identifier for the stadium
 *               seats:
 *                 type: array
 *                 description: 2D array representing the seating arrangement
 *                 items:
 *                   type: array
 *                   items:
 *                     type: number
 *               dateTime:
 *                 type: string
 *                 format: date-time
 *                 description: The date and time of the match
 *               mainReferee:
 *                 type: string
 *                 description: Name of the main referee
 *               linesman1:
 *                 type: string
 *                 description: Name of the first linesman
 *               linesman2:
 *                 type: string
 *                 description: Name of the second linesman
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The updated match
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "60dabc1234567890abcdef12"
 *                 homeTeam:
 *                   type: string
 *                   example: "ahly"
 *                 awayTeam:
 *                   type: string
 *                   example: "zamalek"
 *                 stadiumID:
 *                   type: string
 *                   example: "60dabc1234567890abcdef12"
 *                 seats:
 *                   type: array
 *                   items:
 *                     type: array
 *                     items:
 *                       type: integer
 *                   example: [[0, 1, 0], [0, 1, 0], [1, 0, 1]]
 *                 dateTime:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-12-07T17:00:00Z"
 *                 mainReferee:
 *                   type: string
 *                   example: "Referee John Doe"
 *                 linesman1:
 *                   type: string
 *                   example: "Linesman Jane Doe"
 *                 linesman2:
 *                   type: string
 *                   example: "Linesman Tom Smith"
 *       403:
 *         description: Forbidden (Managers only)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Access denied: Managers only"
 *       404:
 *         description: Match not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Match not found"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error updating match"
 */
router.put('/:matchId', verifyToken, async (req, res) => {
    const { matchId } = req.params;
    const updateData = req.body;
    const userID = req.userID;
    try {
        const manager = await User.findById(userID);
        if(manager.role != 'Manager'){
            return res.status(403).json({ error: "Access denied: Managers only" });
        }

        const updatedMatch = await Match.findByIdAndUpdate(matchId, updateData, { new: true });

        if (updatedMatch) {
            res.json(updatedMatch);
        } else {
            res.status(404).send({ message: 'Match not found' });
        }
    } catch (err) {
        console.error('Error updating match:', err);
        res.status(500).send({ message: 'Error updating match' });
    }
})
/**
 * @swagger
 * /match/{matchId}:
 *   get:
 *     summary: Get a match by ID with stadium details
 *     description: Retrieves a match by its ID, along with stadium details (name, length, and width).
 *     operationId: getMatchById
 *     tags:
 *       - Match
 *     parameters:
 *       - name: matchId
 *         in: path
 *         required: true
 *         description: The ID of the match to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Match found successfully, including stadium details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 homeTeam:
 *                   type: string
 *                   example: "Team A"
 *                 awayTeam:
 *                   type: string
 *                   example: "Team B"
 *                 stadiumID:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "Cairo Stadium"
 *                     length:
 *                       type: integer
 *                       example: 40
 *                     width:
 *                       type: integer
 *                       example: 20
 *                 dateTime:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-12-15T16:00:00Z"
 *                 mainReferee:
 *                   type: string
 *                   example: "Referee Name"
 *                 linesman1:
 *                   type: string
 *                   example: "Linesman 1"
 *                 linesman2:
 *                   type: string
 *                   example: "Linesman 2"
 *       '404':
 *         description: Match not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Match not found"
 *       '500':
 *         description: Error fetching match
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error fetching match"
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
router.get('/:matchId', async (req, res) => {
    const { matchId } = req.params;
    try {
        const match = await Match.findById(matchId)
            .populate('stadiumID', 'name length width');

        if (match) {
            res.json(match);
        } else {
            res.status(404).send({ message: 'Match not found' });
        }
    } catch (err) {
        console.error('Error fetching match:', err);
        res.status(500).send({ message: 'Error fetching match' });
    }
});
/**
 * @swagger
 * /match/{matchId}/seats/:
 *   get:
 *     summary: Get seats of a match by ID
 *     description: Retrieves the seats of a match by its ID.
 *     operationId: getMatchSeatsById
 *     tags:
 *       - Match
 *     parameters:
 *       - name: matchId
 *         in: path
 *         required: true
 *         description: The ID of the match to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Seats retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 seats:
 *                   type: array
 *                   items:
 *                     type: array
 *                     items:
 *                       type: integer
 *                       enum: [0, 1]
 *                   example:
 *                     - [0, 1, 0, 1]
 *                     - [1, 0, 0, 1]
 *       '404':
 *         description: Match not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Match not found"
 *       '500':
 *         description: Error fetching match
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error fetching match"
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

router.get('/:matchId/seats', async (req, res) => {
    const { matchId } = req.params;
    try {
        const match = await Match.findById(matchId);

        if (match) {
            res.json({ seats: match.seats });
        } else {
            res.status(404).send({ message: 'Match not found' });
        }
    } catch (err) {
        console.error('Error fetching match:', err);
        res.status(500).send({ message: 'Error fetching match' });
    }
});
// rawan_manager, securePassword123 , eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NzVmMjMwYzAzZmFlNzBlNDMxZjc2MjYiLCJpYXQiOjE3MzQyODgyOTAsImV4cCI6MTczNDM3NDY5MH0.AY1Hhs0vQYzOK9hxa8gXmVlysog9oBIr1dBJlSzs28w
// rawan, rawan123, eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NzVmMTEyM2QyNDRhNmNjMjY4YzYwNzgiLCJpYXQiOjE3MzQyODkyMDAsImV4cCI6MTczNDM3NTYwMH0.G0RG70Kn8mwA67b86UkS1ZA8LMNevRI-zLm0BNCpl3M
module.exports = router;