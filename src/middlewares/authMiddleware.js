const authService = require('../services/authService');

/**
 * Express middleware to verify authorization headers.
 */
module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            error: 'Acesso não autorizado. Token ausente.'
        });
    }

    const token = authHeader.split(' ')[1];

    if (!authService.verify(token)) {
        return res.status(401).json({
            success: false,
            error: 'Sessão inválida ou expirada. Faça login novamente.'
        });
    }

    // Token is valid, proceed
    next();
};
