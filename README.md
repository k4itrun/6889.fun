![Header](https://github.com/k4itrun/billoneta.xyz/assets/103044629/93637d28-0dd0-4df4-86be-341856f0c393)

---

> [!WARNING]
> I am not currently supporting this project in recommended updates, in the future maybe yes, for now you will have this minimalist version.

## Table of Contents

1. [Information](#information)
   - [Config](#config)
2. [Deployment](#deployment)
   - [Self Hosting](#self-hosting)
   - [▲ Vercel (recommended)](#-vercel-recommended-for-nextjs)
   - [Other options](#other-options)
3. [Env](#env-file)
4. [Contributing](#contributing)
5. [License](#license)

## Information

### Config

Make sure to update the pre-configured values in the [`config.ts`](config/config/meta.ts) file (such as `name`, `description`, `socials`, etc.) before deploying your site. Edit them in your forked repository.

## Deployment

### Self Hosting

1. Clone the repo: `git clone https://github.com/k4itrun/billoneta.xyz.git`
2. Install dependencies: `pnpm i && pnpm update --latest`
3. Copy `example.env` and rename it to `.env`.
4. Set these values in `.env`:
   - `DISCORD_USER_ID`: for public account info.
   - `DISCORD_WEBHOOK_URL`: for the contact form (coming soon).
5. Edit [config](config/config/meta.ts) (e.g., `name`, `description`, `socials`).
6. Build the project: `pnpm run build`
7. For development, run: `pnpm run dev`
8. Open [http://localhost:3000](http://localhost:3000) to view the site!

### ▲ Vercel (recommended for Next.js)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fk4itrun%2Fbilloneta.xyz&env=DISCORD_USER_ID,DISCORD_WEBHOOK_URL&envDescription=Environment%20Variables%20Docs&envLink=https%3A%2F%2Fgithub.com%2Fk4itrun%2Fbilloneta.xyz%23deployment&project-name=portfolio&repo-name=k4itrun-portfolio&demo-title=Example%20deploy&demo-description=Example%20production%20deploy%20from%20Github%20Repository&demo-url=https%3A%2F%2F9ll.fun&demo-image=https%3A%2F%2Fi.imgur.com%2FT4VsRuy.png)

1. Click the button above or go to: [Vercel](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fk4itrun%2Fbilloneta.xyz&env=DISCORD_USER_ID,DISCORD_WEBHOOK_URL&envDescription=Environment%20Variables%20Docs&envLink=https%3A%2F%2Fgithub.com%2Fk4itrun%2Fbilloneta.xyz%23deployment&project-name=portfolio&repo-name=k4itrun-portfolio&demo-title=Example%20deploy&demo-description=Example%20production%20deploy%20from%20Github%20Repository&demo-url=https%3A%2F%2F9ll.fun&demo-image=https%3A%2F%2Fi.imgur.com%2FT4VsRuy.png)
1. Add your `DISCORD_USER_ID` for account info.
1. Add the `DISCORD_WEBHOOK_URL` for the contact form (coming soon).
1. Click the `Deploy` button and wait.
1. In your forked repo, update the values in the [config](config/meta.ts) file (e.g., `name`, `description`, `socials`, etc.).

### Other options

To deploy this site, you can use platforms like:

1. [Vercel](https://vercel.com/) (recommended for Next.js)
2. [Koyeb](https://koyeb.com/)
3. [Netlify](https://www.netlify.com/)
4. [AWS](https://aws.amazon.com/)
5. [DigitalOcean](https://www.digitalocean.com/) and more...

Simply push your code to a GitHub repository, and connect it to your preferred platform for continuous deployment.

### [`.env`](example.env) file

> [!NOTE]
> Remember that you must first modify the `example.env` file to `.env` for the environment variables to work.

| Variable             | Description                                                          | Required |
| -------------------- | -------------------------------------------------------------------- | -------- |
| `DISCORD_USER_ID`    | For account info (public).                                           | `✅ Yes` |
| `GITHUB_ACESS_TOKEN` | For [Github](https://github.com/k4itrun/billoneta.xyz) repositories. | `✅ Yes` |

## Contributing

### Reporting Issues

If you encounter any bugs or problems while using the tool, please open a [new Issue here](../../issues).
To help us assist you faster, include as much detail as possible, such as:

- What you were trying to do.
- Any error messages or console logs.
- Your environment details (OS, versions, etc.)

The more info you provide, the quicker we can identify and fix the problem.

### Pull Requests

Thanks for wanting to contribute! To submit improvements or fixes, please follow these steps:

1. Clone [this repository](https://github.com/k4itrun/billoneta.xyz.git) using `git clone https://github.com/k4itrun/billoneta.xyz.git`.
2. Create a new branch from `main` with a clear, descriptive name, for example: `git checkout -b feature/your-feature-name`.
3. Make your changes and commit them with clear, meaningful messages.
4. Open a [new Pull Request here](../../pulls), explaining what you added or fixed and why.

We’ll carefully review each PR and provide feedback if needed to help you get it merged.

☕ **[Thank you for your support!](https://ko-fi.com/A0A11481X5)**

## Contact

If you have any **Questions** or need **Help**, feel free to email me at [tsx@billoneta.xyz](mailto:tsx@billoneta.xyz) or better yet, start a discussion in our **[Github Community](../../discussions)**.

## License

This project is released under the **[MIT License](license.md)**. See LICENSE file for more info.

<details>
 <summary>You didn’t break it. It was waiting to break. 🎁</summary>

<a href="https://star-history.com/#k4itrun/billoneta.xyz&Timeline">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=k4itrun/billoneta.xyz&type=Timeline&theme=dark" />
    <img alt="Star History" src="https://api.star-history.com/svg?repos=k4itrun/billoneta.xyz&type=Timeline" />
  </picture>
</a>

</details>
