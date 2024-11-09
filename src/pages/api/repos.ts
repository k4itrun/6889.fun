import { Repository } from "@/interfaces";
import {metaConfig} from '@k4itrunconfig';

import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async (
    request: NextApiRequest,
    response: NextApiResponse
): Promise<void> => {
    let repos: Repository[] = (await axios.get(`https://api.github.com/users/${metaConfig.accounts.github.username}/repos`,{headers: {'Content-Type': 'application/json',Authorization: `token ${metaConfig.accounts.github.key}`}})).data;
    
    try {
        response.send([...repos]);
    } catch {
        response.status(500);
    }
}