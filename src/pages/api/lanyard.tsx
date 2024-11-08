import { LanyardResponse } from "@/interfaces";
import k4itrunConfig from '@k4itrunconfig';

import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'isomorphic-unfetch';

export default async (
    request: NextApiRequest,
    response: NextApiResponse
): Promise<void> => {
    let lanyard: LanyardResponse = await (await fetch(`https://api.lanyard.rest/v1/users/${k4itrunConfig.discordId}`)).json();

    try {
        response.send({...lanyard});
    } catch {
        response.status(500);
    }
}