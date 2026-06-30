require('dotenv').config();
const express = require('express');
const http = require('http');
const path = require('path');

const apiRoutes = require('./routes/api');
const socketService = require('./services/socketService');
const whatsappService = require('./services/whatsappService');

const app = express();
const server = http.createServer(app);

// Port configuration (defaults to 3000)
const PORT = process.env.PORT || 3000;

// Body parsing middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files from public/ directory
app.use(express.static(path.join(__dirname, '../public')));

// API Routes
app.use('/api', apiRoutes);

// Catch-all route to redirect any unspecified paths back to the index dashboard
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Bind and initialize real-time communications via Socket.io
socketService.init(server);

// Start the server
server.listen(PORT, () => {
    console.log('\n======================================================');
    console.log(`🚀 Mentoria Scrum WhatsApp integration server running.`);
    console.log(`🌐 Local address: http://localhost:${PORT}`);
    console.log('======================================================\n');

    // Trigger Puppeteer launch and initialize the WhatsApp Web connection
    whatsappService.initialize();
});
