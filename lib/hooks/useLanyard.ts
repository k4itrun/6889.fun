import { useEffect, useState } from 'react';
import { meta } from '@/config';

export function useProfile(userId: string = meta.accounts.discord.id) {
 const [profile, setProfile] = useState<ResponseProfile | null>(null);

 useEffect(() => {
  const ws = new WebSocket('wss://api.lanyard.rest/socket');
  let HeartbeatInterval: NodeJS.Timeout | null = null;

  ws.onopen = () => {
   ws.send(
    JSON.stringify({
     op: 2,
     d: { subscribe_to_ids: [userId] },
    })
   );
  };

  ws.onmessage = (event) => {
   const message = JSON.parse(event.data);
   if (message.op === 1 && message.d?.heartbeat_interval) {
    HeartbeatInterval = setInterval(() => {
     ws.send(JSON.stringify({ op: 3 }));
    }, message.d.heartbeat_interval);
   }
   if (message.t === 'INIT_STATE') setProfile(message.d[userId]);
   if (message.t === 'PRESENCE_UPDATE') setProfile(message.d);
  };

  ws.onerror = (err) => {
   console.error('Lanyard WebSocket error:', err);
  };

  ws.onclose = () => {
   if (HeartbeatInterval) clearInterval(HeartbeatInterval);
   console.warn('Lanyard WebSocket closed');
  };

  return () => {
   if (HeartbeatInterval) clearInterval(HeartbeatInterval);
   ws.close();
  };
 }, [userId]);

 return profile;
}
