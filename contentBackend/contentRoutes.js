const express = require('express');
const router = express.Router();
const contentModel = require('./contentModel');
const authModel = require('../authBackend/authModel');

// middleware for authentication
async function isAuthenticated(req, res, next) {
    try {
        const authId = req.headers.authorization;
        console.log('authId:', authId);
        if (!authId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const authRecord = await authModel.getAuthById(authId);
        console.log('authRecord:', authRecord);
        if (!authRecord) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.userId = authRecord.userId;
        console.log('userId:', req.userId);
        next();
    } catch (error) {
        console.error('Error during authentication:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

// Create content
router.post('/create', isAuthenticated, async (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) return res.status(400).json({ message: 'Title and content are required' });
    try {
        await contentModel.createContent(req.userId, title, description);
        res.status(201).json({ message: 'Content created' });
    } catch (error) {
        console.error('Error during content creation:', error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
