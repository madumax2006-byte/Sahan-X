const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode');
const express = require('express');
const fs = require('fs');
const path = require('path');
const settings = require('./settings.js');

const app = express();
const PORT = process.env.PORT || 3000;

// WhatsApp Client Setup
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

let qrCodeData = '';

// Generate QR and save as image
client.on('qr', async (qr) => {
    qrCodeData = qr;
    console.log('QR Received, refresh /qr page');
    
    // Save QR as image
    const qrImagePath = path.join(__dirname, 'public/qr.png');
    await qrcode.toFile(qrImagePath, qr);
});

// Bot Ready
client.on('ready', () => {
    console.log('🤖 Sahan-X Bot is Ready!');
    qrCodeData = ''; // Clear QR after login
});

// Message Handling
client.on('message', async (msg) => {
    const contact = await msg.getContact();
    const chat = await msg.getChat();
    
    console.log(`📩 Message from ${contact.pushname || contact.number}: ${msg.body}`);
    
    // Load plugins
    const plugins = require('./plugin.js');
    for (const plugin of plugins) {
        if (plugin.pattern.test(msg.body.toLowerCase())) {
            await plugin.function(msg, client);
            return;
        }
    }
    
    // Default reply
    if (!chat.isGroup) {
        msg.reply(settings.DEFAULT_REPLY);
    }
});

// Start Client
client.initialize();

// Express Server for QR Display
app.use(express.static('public'));

app.get('/qr', (req, res) => {
    if (qrCodeData) {
        res.sendFile(path.join(__dirname, 'public/qr.html'));
    } else {
        res.send('✅ Already authenticated! Bot is running.');
    }
});

app.get('/qr-data', (req, res) => {
    res.json({ qr: qrCodeData });
});

app.listen(PORT, () => {
    console.log(`🌐 Server running on http://localhost:${PORT}`);
    console.log(`📲 Scan QR: http://localhost:${PORT}/qr`);
});

module.exports = app;
