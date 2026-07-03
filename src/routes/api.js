const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const leadsController = require('../controllers/leadsController');
const contactController = require('../controllers/contactController');
const reviewsController = require('../controllers/reviewsController');
const authMiddleware = require('../middlewares/authMiddleware');
const authService = require('../services/authService');

/**
 * REST API Routes for Portal operations.
 */

// Auth routes
router.post('/auth/login', (req, res) => {
    const { username, password } = req.body;
    const token = authService.login(username, password);
    if (token) {
        return res.status(200).json({
            success: true,
            token
        });
    }
    return res.status(401).json({
        success: false,
        error: 'Usuário ou senha incorretos.'
    });
});

router.get('/auth/verify', authMiddleware, (req, res) => {
    return res.status(200).json({
        success: true,
        message: 'Token válido.'
    });
});

router.post('/auth/logout', (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        authService.logout(token);
    }
    return res.status(200).json({
        success: true,
        message: 'Logout realizado.'
    });
});

// WhatsApp connection status and send (protected by authMiddleware)
router.get('/status', authMiddleware, messageController.getStatus);
router.post('/send', authMiddleware, messageController.sendMessage);

// Leads capture (Supabase newsletter)
router.post('/leads', leadsController.registerLead);

// Contact form submission (Nodemailer email)
router.post('/contact', contactController.sendContactEmail);

// Testimonials (Google Place Details reviews)
router.get('/reviews', reviewsController.getReviews);

module.exports = router;
