import k4itrunConfig from "../../../k4itrun.config";
const fetch = require('isomorphic-unfetch')

export default async (req, res) => {
    let _ = await (await fetch('https://api.github.com/users/' + k4itrunConfig.githubName + '/repos', {
        headers: {
            Authorization: 'token '+ process.env.GITHUB_KEY
        }
    })).json();

    try {
        res.send([..._])
    } catch {
        res.status(500);
    }
}