const express = require('express');
const router = express.Router();

const Match = require('../models/match');

// GET all matches
exports.getMatches = async (req, res) => {
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
};


exports.createMatch = async (req, res) => {
    try {
        const matchData = req.body;

        const match = new Match(matchData);
        await match.save();

        res.status(201).json({ message: 'Match created successfully', match });
    } catch (error) {
        console.error('Error creating match:', error);
        res.status(500).json({ message: 'Error creating match', error });
    }
};
