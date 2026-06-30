const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const leadsController = require('../controllers/leadsController');
const contactController = require('../controllers/contactController');
const reviewsController = require('../controllers/reviewsController');

/**
 * REST API Routes for Portal operations.
 */

// WhatsApp connection status and send
router.get('/status', messageController.getStatus);
router.post('/send', messageController.sendMessage);

// Leads capture (Supabase newsletter)
router.post('/leads', leadsController.registerLead);

// Contact form submission (Nodemailer email)
router.post('/contact', contactController.sendContactEmail);

// Testimonials (Google Place Details reviews)
router.get('/reviews', reviewsController.getReviews);

module.exports = router;
