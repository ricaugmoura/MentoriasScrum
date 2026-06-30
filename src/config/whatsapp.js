const { Client, LocalAuth } = require('whatsapp-web.js');

/**
 * Configure standard client options for whatsapp-web.js.
 * We use LocalAuth to persist session credentials inside a local cache,
 * ensuring the user only needs to scan the QR code once.
 */
const client = new Client({
    authStrategy: new LocalAuth({
        clientId: 'mentoria-scrum-whatsapp'
    }),
    puppeteer: {
        headless: true,
        // Crucial launch arguments for running Puppeteer inside containerized
        // or headless server environments safely without crashes.
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process', // helps save memory in low-resource systems
            '--disable-gpu'
        ]
    }
});

module.exports = client;
