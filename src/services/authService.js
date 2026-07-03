const crypto = require('crypto');

/**
 * Constant-time comparison helper to prevent timing attacks.
 * Hashes inputs with SHA-256 to ensure equal length before timingSafeEqual.
 */
function safeCompare(a, b) {
    if (typeof a !== 'string' || typeof b !== 'string') return false;
    const aHash = crypto.createHash('sha256').update(a).digest();
    const bHash = crypto.createHash('sha256').update(b).digest();
    return crypto.timingSafeEqual(aHash, bHash);
}

class AuthService {
    constructor() {
        // sessions map stores token -> expiration timestamp
        this.sessions = new Map();
        // default session duration: 24 hours
        this.SESSION_DURATION = 24 * 60 * 60 * 1000;
    }

    /**
     * Authenticate admin credentials and generate a session token if valid.
     * @param {string} username 
     * @param {string} password 
     * @returns {string|null} token or null
     */
    login(username, password) {
        const expectedUsername = process.env.ADMIN_USERNAME || 'admin';
        const expectedPassword = process.env.ADMIN_PASSWORD || 'admin';

        const isUsernameValid = safeCompare(username, expectedUsername);
        const isPasswordValid = safeCompare(password, expectedPassword);

        if (isUsernameValid && isPasswordValid) {
            const token = crypto.randomBytes(32).toString('hex');
            const expires = Date.now() + this.SESSION_DURATION;
            this.sessions.set(token, expires);
            
            console.log(`[AUTH] Admin logged in successfully. Session expires at ${new Date(expires).toLocaleTimeString()}`);
            return token;
        }

        console.warn(`[AUTH] Failed login attempt for user: ${username}`);
        return null;
    }

    /**
     * Validate an existing session token.
     * @param {string} token 
     * @returns {boolean}
     */
    verify(token) {
        if (!token || !this.sessions.has(token)) {
            return false;
        }

        const expires = this.sessions.get(token);
        if (Date.now() > expires) {
            this.sessions.delete(token);
            console.log('[AUTH] Session token expired.');
            return false;
        }

        return true;
    }

    /**
     * Invalidate a session token.
     * @param {string} token 
     */
    logout(token) {
        if (token && this.sessions.has(token)) {
            this.sessions.delete(token);
            console.log('[AUTH] Admin logged out. Session invalidated.');
        }
    }
}

module.exports = new AuthService();
