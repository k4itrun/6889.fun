import fetch from 'isomorphic-unfetch';
import k4itrunConfig from '../../../k4itrun.config';

export default async (req, res) => {
    try {
        res.json((await (await fetch(`https://api.lanyard.rest/v1/users/${k4itrunConfig.discordId}`)).json()));
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
