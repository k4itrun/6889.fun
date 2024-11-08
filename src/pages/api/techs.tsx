import { Tech } from "@/interfaces";

import { NextApiRequest, NextApiResponse } from 'next';

const techs: Tech[] = [
    {
        "name": "HTML",
        "src": "https://skillicons.dev/icons?i=html"
    },
    {
        "name": "CSS",
        "src": "https://skillicons.dev/icons?i=css"
    },
    {
        "name": "TailwindCSS",
        "src": "https://skillicons.dev/icons?i=tailwindcss"
    },
    {
        "name": "Bootstrap",
        "src": "https://skillicons.dev/icons?i=bootstrap"
    },
    {
        "name": "Javascript",
        "src": "https://skillicons.dev/icons?i=javascript"
    },
    {
        "name": "Typescript",
        "src": "https://skillicons.dev/icons?i=typescript"
    },
    {
        "name": "Node.js",
        "src": "https://skillicons.dev/icons?i=nodejs"
    },
    {
        "name": "Next.js",
        "src": "https://skillicons.dev/icons?i=nextjs"
    },
    {
        "name": "React",
        "src": "https://skillicons.dev/icons?i=react"
    },
    {
        "name": "Express",
        "src": "https://skillicons.dev/icons?i=expressjs"
    },
    {
        "name": "Nest.js",
        "src": "https://skillicons.dev/icons?i=nestjs"
    },
    {
        "name": "Elixir",
        "src": "https://skillicons.dev/icons?i=elixir"
    },
    {
        "name": "GO",
        "src": "https://skillicons.dev/icons?i=go"
    },

    {
        "name": "Rust",
        "src": "https://skillicons.dev/icons?i=rust"
    },
    {
        "name": "Bash",
        "src": "https://skillicons.dev/icons?i=bash"
    },
    {
        "name": "Python",
        "src": "https://skillicons.dev/icons?i=python"
    },
    {
        "name": "PHP",
        "src": "https://skillicons.dev/icons?i=php"
    },
    {
        "name": "Git",
        "src": "https://skillicons.dev/icons?i=git"
    },
]

export default (
    request: NextApiRequest,
    response: NextApiResponse
) => {
    try {
        response.send([...techs]);
    } catch (error) {
        response.status(500);
    }
}