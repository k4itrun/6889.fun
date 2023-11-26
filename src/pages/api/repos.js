import k4itrunConfig from "../../../k4itrun.config";

export default async (req, res) => {
    let _ = await (await fetch('https://api.github.com/users/' + k4itrunConfig.githubName + '/repos', {
        headers: {
            Authorization: 'token '+ "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"
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