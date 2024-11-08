import { MyDocumentProps, LanyardResponse } from "@/interfaces";
import k4itrunConfig from '@k4itrunconfig';

import { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import fetch from 'isomorphic-unfetch';

function MyDocument({ profile }: MyDocumentProps) {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#ffffff" />
        <link href="https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link href="https://pro.fontawesome.com/releases/v6.0.0-beta1/css/all.css" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <meta name="description" content="bio >.<" />
        <link
          rel="icon"
          href={
            profile?.discord_user?.avatar
              ? `https://cdn.discordapp.com/avatars/${profile.discord_user.id}/${profile.discord_user.avatar}`
              : "https://github.githubassets.com/favicons/favicon.png"
          }
          type="image/x-icon"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const props = await ctx.defaultGetInitialProps(ctx);
  const profile: LanyardResponse =  (await (await fetch(`https://api.lanyard.rest/v1/users/${k4itrunConfig.discordId}`)).json())?.data;
  try {
    return { ...props, profile };
  } catch {
    return { ...props, profile: null };
  }
};

export default MyDocument;
