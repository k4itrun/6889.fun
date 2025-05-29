export {};

declare global {
 interface Language {
  size: number;
  node: {
   color: string;
   name: string;
  };
 }

 interface ResponseRepository {
  name: string;
  private: boolean;
  og: string;
  languages: Language[];
  totalSize: number;
  description: string | null;
  owner: {
   avatar: string;
   name: string | null;
  };
  stargazerCount: number;
  forks: number;
 }

 interface ResponseProfile {
  kv: Record<string, unknown>;
  discord_user: {
   id: string;
   username: string;
   clan: { tag: string | null; identity_guild_id: string | null; badge: string | null; identity_enabled: boolean | null } | null;
   avatar_decoration_data: { sku_id: string | null; asset: string | null; expires_at: string | null } | null;
   collectibles: null;
   avatar: string;
   discriminator: string;
   bot: boolean;
   global_name: string;
   display_name: string;
   public_flags: number | null;
  };
  activities: {
   id: string;
   name: string;
   type: number;
   state: string;
   created_at: number;
   emoji?: { name: string; id: number; animated: boolean };
   flags?: number;
   session_id?: string;
   details?: string;
   timestamps?: { start: number; end?: number };
   assets?: {
    large_image?: string;
    large_text?: string;
    small_image: string;
    small_text: string;
   };
   sync_id?: string;
   party?: { id: string };
   application_id?: string;
   buttons?: string[];
  }[];
  discord_status: 'dnd' | 'idle' | 'online' | 'offline';
  active_on_discord_web: boolean;
  active_on_discord_desktop: boolean;
  active_on_discord_mobile: boolean;
  listening_to_spotify: boolean;
  spotify: {
   timestamps: { start: number; end: number };
   album: string;
   album_art_url: string;
   artist: string;
   song: string;
   track_id: string;
  } | null;
 }
}
