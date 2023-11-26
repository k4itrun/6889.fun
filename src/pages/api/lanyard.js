import fetch from 'isomorphic-unfetch';
import k4itrunConfig from '../../../k4itrun.config';

export default async (req, res) => {
    try {
        let _ = await fetch(`https://api.lanyard.rest/v1/users/${k4itrunConfig.discordId}`);
        if (!_.ok) {
            throw new Error(`Failed:`, _.status);
        }
        let __ = await _.json();
        res.json(__);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
