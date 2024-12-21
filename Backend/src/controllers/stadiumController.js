const express = require('express');
const router = express.Router();

const User = require('../models/user');
const verifyToken = require('../middlewares/auth');
const Stadium = require('../models/stadium');
/**
 * @swagger
 * /stadium:
 *   post:
 *     summary: Add a new stadium
 *     description: Adds a new stadium to the system. Only users with the "Manager" role can add a stadium.
 *     operationId: addStadium
 *     tags:
 *       - Stadium
 *     parameters:
 *       - name: JWT-Token
 *         in: header
 *         required: true
 *         description: Bearer token for user authentication
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: The stadium information to be added.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Cairo Stadium"
 *               length:
 *                 type: integer
 *                 example: 40
 *               width:
 *                 type: integer
 *                 example: 20
 *             required:
 *               - name
 *               - length
 *               - width
 *     responses:
 *       '201':
 *         description: Stadium added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Stadium added successfully"
 *                 stadium:
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
 *       '403':
 *         description: Access denied for non-Managers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Access denied: Managers only"
 *       '500':
 *         description: Error adding stadium
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error adding stadium"
 *                 error:
 *                   type: string
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
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

router.get('/',verifyToken, async (req, res) => {
    try {
        const stadiums = await Stadium.find();
        
        if (stadiums.length > 0) {
            res.status(200).json(stadiums);
        } else {
            res.status(204).send({ message: 'No stadiums found' });
        }
    } catch (err) {
        console.error('Error fetching stadiums:', err);
        res.status(500).send({ message: 'Error fetching stadiums' });
    }
})
module.exports = router;
