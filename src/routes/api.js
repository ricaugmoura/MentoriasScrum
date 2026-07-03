const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const messageController = require('../controllers/messageController');
const leadsController = require('../controllers/leadsController');
const contactController = require('../controllers/contactController');
const reviewsController = require('../controllers/reviewsController');
const authMiddleware = require('../middlewares/authMiddleware');
const authService = require('../services/authService');

/**
 * REST API Routes for Portal operations.
 */

// Rate Limiters Configuration
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 requests per windowMs
    message: {
        success: false,
        error: 'Muitas tentativas de login. Tente novamente em 15 minutos.'
    },
    standardHeaders: true,
    legacyHeaders: false
});

const leadsLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5, // Limit each IP to 5 registrations per hour
    message: {
        success: false,
        message: 'Muitas tentativas de cadastro. Tente novamente em 1 hora.'
    },
    standardHeaders: true,
    legacyHeaders: false
});

const contactLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 3, // Limit each IP to 3 contact messages per hour
    message: {
        success: false,
        message: 'Muitas mensagens enviadas. Tente novamente em 1 hora.'
    },
    standardHeaders: true,
    legacyHeaders: false
});

// Auth routes
router.post('/auth/login', authLimiter, (req, res) => {
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

// Leads capture (Supabase newsletter, protected by leadsLimiter)
router.post('/leads', leadsLimiter, leadsController.registerLead);

// Contact form submission (Nodemailer email, protected by contactLimiter)
router.post('/contact', contactLimiter, contactController.sendContactEmail);

// Testimonials (Google Place Details reviews)
router.get('/reviews', reviewsController.getReviews);

module.exports = router;
