import { Repository } from "@/interfaces";
import k4itrunConfig from '@k4itrunconfig';

import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'isomorphic-unfetch';

export default async (
    request: NextApiRequest,
    response: NextApiResponse
): Promise<void> => {
    let repos: Repository[] = await (await fetch(`https://api.github.com/users/${k4itrunConfig.githubName}/repos`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `token ${k4itrunConfig.githubKey}`,
        }
    })).json();

    try {
        response.send([...repos]);
    } catch {
        response.status(500);
    }
}