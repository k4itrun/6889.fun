import k4itrunConfig from "../../../k4itrun.config";

export default async (req, res) => {
    let _ = await (await fetch('https://api.github.com/users/' + k4itrunConfig.githubName + '/repos', {
        headers: {
            Authorization: 'token '+ k4itrunConfig.githubKey
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