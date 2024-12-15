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
/**
 * @swagger
 * /match:
 *   post:
 *     summary: Create a new match
 *     tags:
 *       - Match
 *     security:
 *       - BearerAuth: []
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
