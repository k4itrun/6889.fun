const fetch = require('isomorphic-unfetch');
import k4itrunConfig from '../../../k4itrun.config';

export default async (req, res) => {
    try {
        res.json((await (await fetch(`https://api.github.com/users/${k4itrunConfig.githubName}/repos`, {
            headers: {
                Authorization: `token ${k4itrunConfig.githubKey}`
            }
        })).json()));
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
