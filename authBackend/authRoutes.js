// authRoutes.js
const express = require('express');
const router = express.Router();
const userModel = require('../userBackend/userModel');
const authModel = require('./authModel');
const md5 = require('md5');

async function isAuthticated(res, res, next) {
    const authId = req.headers['authorization'];
    if (!authId) {
        res.status(401).json({ message: 'Unauthorized' });
    }
    const auth = await authModel.getAuth(authId);
    if (!auth) {
        res.status(401).json({ message: 'Unauthorized' });
    }
    req.auth = auth.user_id;
    next();
}

// Signup routes
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    const cryptPwd = md5(password);
    try {
        const allUser = await userModel.getAllUsers();
        if (allUser.find(user => user.email === email)) {
            res.status(409).json({ message: 'User already exists' });
            return;
        } else {
            await userModel.createUser(name, email, cryptPwd);
            res.status(201).json({ message: 'User created' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Signin routes
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const cryptPwd = md5(password);
    try {
        const user = await userModel.getUserByEmail(email);
        if (!user) {
            res.status(404).json({ message: 'user not found' });
            return;
        }
        if (await authModel.getAuthById(user.id)) {
            res.status(409).json({ message: 'User already connected' });
            return;
        }
        auth = await authModel.createAuth(user.id, cryptPwd);
        res.status(201).json({ auth, message: 'Authentification réussie' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/logout', async (req, res) => {
    const { id } = req.body;
    try {
        await authModel.deleteAuthById(id);
        res.status(201).json({ message: 'Logout ok' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;