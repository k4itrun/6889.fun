import k4itrunConfig from "../../../k4itrun.config";

export default async (req, res) => {
    let _ = await (await fetch('https://api.github.com/users/' + k4itrunConfig.githubName + '/repos', {
        headers: {
            Authorization: 'token '+ process.env.GITHUB_KEY
        }
    })).json();

    try {
        res.send({
            success: true,
            data: [..._]
        })
    } catch {
        res.status(500).send({
            success: false,
            data: []
        });
    }
}