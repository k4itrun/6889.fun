import k4itrunConfig from "../../../k4itrun.config";

export default async (req, res) => {
    let _ = await (await fetch('https://discord.com/api/v10/users/' + k4itrunConfig.discordId, {
        headers: {
            Authorization: 'token '+ k4itrunConfig.discordToken
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