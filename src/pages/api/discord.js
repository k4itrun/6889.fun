import k4itrunConfig from "../../../k4itrun.config";

export default async (req, res) => {
    try {
        let _ = await fetch('https://discord.com/api/v10/users/' + k4itrunConfig.discordId, {
            headers: {
                Authorization: 'Bot '+ k4itrunConfig.discordToken
            }
        });

        let __ = await _.json();

        res.send({
            success: true,
            data: __
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            data: []
        });
    }
}
