<div align="center">

# Next.js Portfolio
This is a simple Next.js portfolio template, themed according to time.

</div>

## Table of Contents
1. [Information](#information)
   - [Config](#config)
   - [Themes](#themes)
2. [Deployment](#deployment)
      - [Self Hosting](#self-Hosting)
      - [▲ Vercel (recommended)](#-vercel-recommended)
      - [Other options](#other-options)
3. [Environment Variables](#environment-variables)
4. [Contributing](#contributing)
5. [License](#license)

## Information

### Config
Make sure to update the pre-configured values in the `k4itrun.config.ts` file (such as `name`, `description`, `socials`, etc.) before deploying your site. Edit them in your forked repository.

### Themes
To change the colors of the themes see the configuration of `k4itrun.config.ts` --> `tailwindColors` --> (`primary`, `secondary`)

1. Primary: Handle lighter colors.
2. Secondary: Handles the darkest colors.

## Deployment

### Self Hosting

1. Clone [this repository](https://github.com/k4itrun/k4itrun.github.io) with `git clone https://github.com/IgorKowalczyk/k4itrun.github.io.git`.
2. Run `npm i` to install dependencies.
3. Copy `.env.example` and rename it to `.env`.
4. In the `.env` file, set these values:
   - `DISCORD_ID` for account info (public).
   - `WEBHOOK` for the contact form (coming soon).
5. Update values in `k4itrun.config.ts` (like `name`, `description`, `socials`, etc.).
6. Run `npm run build` to build the project or `npm run dev` to start it in development mode.
7. Open [http://localhost:3000](http://localhost:3000) to view the site.

### ▲ Vercel (recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fk4itrun%2Fk4itrun.github.io&env=DISCORD_ID,WEBHOOK&envDescription=Environment%20Variables%20Docs&envLink=https%3A%2F%2Fgithub.com%2Fk4itrun%2Fk4itrun.github.io%23deployment&project-name=portfolio&repo-name=k4itrun-portfolio&demo-title=Example%20deploy&demo-description=Example%20production%20deploy%20from%20Github%20Repository&demo-url=https%3A%2F%2F9ll.fun&demo-image=https%3A%2F%2Fi.imgur.com%2FT4VsRuy.png)

1. Click the button above or visit [Vercel](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fk4itrun%2Fk4itrun.github.io&env=DISCORD_ID,WEBHOOK&envDescription=Environment%20Variables%20Docs&envLink=https%3A%2F%2Fgithub.com%2Fk4itrun%2Fk4itrun.github.io%23deployment&project-name=portfolio&repo-name=k4itrun-portfolio&demo-title=Example%20deploy&demo-description=Example%20production%20deploy%20from%20Github%20Repository&demo-url=https%3A%2F%2Fk4itrun.dev&demo-image=https%3A%2F%2Fi.imgur.com%2FT4VsRuy.png)
2. Add your `DISCORD_ID` for account info (public).
3. Add your `WEBHOOK` for the contact form (coming soon).
4. Hit the `Deploy` button and wait for it to deploy.
5. Once deployed, click `Visit` to see your site live.
6. In your forked repo, update values in the `k4itrun.config.ts` file (like `name`, `description`, `socials`, etc.). 

### Other options
To deploy this site, you can use platforms like:

1. Vercel (recommended for Next.js)
2. Netlify
3. AWS
4. DigitalOcean

Simply push your code to a GitHub repository, and connect it to your preferred platform for continuous deployment.

## Environment Variables

You can configure environment variables in the `.env.local` file. Example:

| Variable              | Description                                                      | Required |
| --------------------- | ---------------------------------------------------------------- | -------- |
| `WEBHOOK` | For the contact form (coming soon).                             | `No` |
| `DISCORD_ID` | For account info (public).                             | `Yes` |

## Contributing
Support this project by donating to help fund new improvements, or simply add a ⭐ star to this repository.

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/A0A11481X5)

Thank you for your interest and support! ✌️

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.