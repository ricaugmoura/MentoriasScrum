const whatsappService = require('../services/whatsappService');

/**
 * Controller to handle HTTP API operations for WhatsApp messaging.
 */

/**
 * Retrieve current connection state.
 */
const getStatus = (req, res) => {
    res.json({
        success: true,
        status: whatsappService.getStatus(),
        isConnected: whatsappService.getStatus() === 'CONNECTED'
    });
};

/**
 * Send WhatsApp text message.
 * Expects JSON body with: { "number": "5511999999999", "message": "Hello!" }
 */
const sendMessage = async (req, res) => {
    const { number, message } = req.body;

    if (!number || !message) {
        return res.status(400).json({
            success: false,
            error: 'Missing required body parameters: "number" and "message".'
        });
    }

    try {
        const result = await whatsappService.sendMessage(number, message);
        res.json({
            success: true,
            message: 'Message dispatched successfully.',
            data: result
        });
    } catch (err) {
        console.error('Controller Error sending message:', err.message);
        res.status(500).json({
            success: false,
            error: err.message || 'Internal server error while sending message.'
        });
    }
};

module.exports = {
    getStatus,
    sendMessage
};
