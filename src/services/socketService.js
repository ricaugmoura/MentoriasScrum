const { Server } = require('socket.io');
const whatsappService = require('./whatsappService');

/**
 * SocketService coordinates real-time synchronization between the Node.js server
 * and the frontend web dashboard.
 */
class SocketService {
    constructor() {
        this.io = null;
    }

    /**
     * Bind Socket.io server to the HTTP server instance.
     * @param {object} httpServer - The Node.js HTTP Server instance
     */
    init(httpServer) {
        this.io = new Server(httpServer, {
            cors: {
                origin: '*',
                methods: ['GET', 'POST']
            }
        });

        this.io.on('connection', (socket) => {
            console.log(`Web client connected via WebSockets (ID: ${socket.id})`);

            // Instantly sync state for the newly connected user
            socket.emit('status', whatsappService.getStatus());

            // If a QR code was already generated, send it immediately
            const currentQr = whatsappService.getQrCode();
            if (currentQr) {
                socket.emit('qr', currentQr);
            }

            socket.on('disconnect', () => {
                console.log(`Web client disconnected (ID: ${socket.id})`);
            });
        });

        // Listen to events from WhatsApp Service and broadcast to all web clients
        whatsappService.on('status', (status) => {
            if (this.io) {
                this.io.emit('status', status);
            }
        });

        whatsappService.on('qr', (qrImage) => {
            if (this.io) {
                this.io.emit('qr', qrImage);
            }
        });

        whatsappService.on('message_received', (messageData) => {
            if (this.io) {
                this.io.emit('message_received', messageData);
            }
        });
    }
}

module.exports = new SocketService();
