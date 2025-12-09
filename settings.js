module.exports = {
    BOT_NAME: "Sahan-X",
    OWNER_NAME: "Sahan",
    OWNER_NUMBER: "947xxxxxxxx",
    
    // Auto-reply settings
    AUTO_REPLY: true,
    DEFAULT_REPLY: "👋 Hello! I'm *Sahan-X Bot*. Type !help for commands.",
    
    // Features
    AUTO_STICKER: true,
    AUTO_VOICE: false,
    ANTI_SPAM: true,
    
    // Database (if needed)
    MONGODB_URI: process.env.MONGODB_URI || "",
    
    // API Keys
    OPENAI_KEY: process.env.OPENAI_KEY || "",
    
    // Media
    MEDIA_PATH: "./media/"
};
