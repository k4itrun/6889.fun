module.exports = {
    name: process.env.OWNER || 'k4itrun',
    version: process.env.VERSION_SITE || '1.0',
    githubName: process.env.GITHUB_NAME || 'k4itrun',
    discordId: process.env.DISCORD_ID || '1088554690268119103',
    webhook: process.env.WEBHOOK || 'https://discord.com/api/webhooks/1193233847895212032/6i7RYIz7lgt_an6FYoPOZwwM0Z7QBHSdixhTT_b-8SHsrwgoEMy3eBTK4oqTfupjzqni',
    mongoDB: process.env.MONGO_DB || '',
    githubKey: process.env.GITHUB_KEY || '',
    discordToken: process.env.DISCORD_TOKEN || '',
    errors: {
        404: "This page could not be found.",
        500: "An error occurred while processing your request."
    }
} 
