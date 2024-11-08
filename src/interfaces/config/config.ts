export interface Config {
    name: string;
    version: string;
    discordId: string;
    webhook: string;
    githubName: string;
    githubKey: string;
    errors: {
        404: string;
        500: string;
    };
}