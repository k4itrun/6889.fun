import { LanyardResponse } from "@/interfaces";
import { metaConfig } from '@k4itrunconfig';

import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async (
    request: NextApiRequest,
    response: NextApiResponse
): Promise<void> => {
    let lanyard: LanyardResponse = (await axios.get(`https://api.lanyard.rest/v1/users/${metaConfig.accounts.discord.id}`)).data;

    try {
        response.send({...lanyard});
    } catch {
        response.status(500);
    }
}
