import { Config } from "@/interfaces";

const k4itrunConfig: Config = {
    name: process.env.OWNER || 'k4itrun',
    version: process.env.VERSION_SITE || '1.0',
    discordId: process.env.DISCORD_ID || '1208098209063379065',
    webhook: process.env.WEBHOOK || '',
    githubName: process.env.GITHUB_NAME || 'k4itrun',
    githubKey: process.env.GITHUB_KEY || '',
    errors: {
        404: "This page could not be found.",
        500: "An error occurred while processing your request."
    }
};

export default k4itrunConfig;
