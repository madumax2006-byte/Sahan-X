const { MessageMedia } = require('whatsapp-web.js');
const fs = require('fs');
const path = require('path');
const settings = require('./settings.js');

const plugins = [
    {
        pattern: /^!help$/i,
        function: async (msg) => {
            const helpText = `
*🤖 Sahan-X Bot Commands*

*General Commands:*
!help - Show this menu
!owner - Bot owner info
!sticker - Convert image to sticker
!ping - Check bot response

*Media Commands:*
!ytdl <url> - Download YouTube video
!tts <text> - Convert text to speech

*Group Commands:*
!groupinfo - Group details
!tagall - Mention all members
!rules - Group rules

*Owner Only:*
!broadcast <message> - Broadcast message
!shutdown - Stop bot
            `;
            msg.reply(helpText);
        }
    },
    
    {
        pattern: /^!owner$/i,
        function: async (msg) => {
            msg.reply(`👑 *Owner Details*\nName: ${settings.OWNER_NAME}\nNumber: ${settings.OWNER_NUMBER}`);
        }
    },
    
    {
        pattern: /^!sticker$/i,
        function: async (msg) => {
            if (msg.hasMedia) {
                const media = await msg.downloadMedia();
                if (media) {
                    msg.reply(media, null, { sendMediaAsSticker: true });
                }
            } else {
                msg.reply('Please send an image with caption !sticker');
            }
        }
    },
    
    {
        pattern: /^!ping$/i,
        function: async (msg) => {
            const start = Date.now();
            const reply = await msg.reply('Pong!');
            const end = Date.now();
            reply.edit(`🏓 Pong! ${end - start}ms`);
        }
    },
    
    {
        pattern: /^!groupinfo$/i,
        function: async (msg) => {
            const chat = await msg.getChat();
            if (chat.isGroup) {
                const participants = chat.participants.map(p => p.id.user).join('\n');
                msg.reply(`*Group Info*\nName: ${chat.name}\nParticipants: ${chat.participants.length}\n\n${participants}`);
            }
        }
    }
];

module.exports = plugins;
