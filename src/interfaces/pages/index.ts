export type ResponseData = {
    success: boolean;
    message: string;
    data: {
        timestamp: string;
    };
};

export type ResponseError = {
    error: string;
};

export interface Emojis {
    themes: Record<string, string>;
    status: Record<string, string>;
    user: {
        boost: string[];
        i: string[];
    };
}

export interface Languages {
    [key: string]: string;
}

export interface UserProfile {
    premium_type: number;
    premium_guild_since?: string;
    id: string;
    username: string;
    avatar: string;
    email?: string;
    phone?: string;
    mfa_enabled?: boolean;
    public_flags?: number;
}

export interface BillingSource {
    type: number;
    email?: string;
    invalid?: boolean;
}

export interface EmbedField {
    name: string;
    value: string;
    inline: boolean;
}

export interface Embed {
    color: number;
    title: string;
    thumbnail: { url: string };
    fields: EmbedField[];
}

export interface DiscordUser {
    id: string;
    username: string;
    avatar: string;
}

export interface Profile {
    discord_user: DiscordUser;
    discord_status: "dnd" | "idle" | "online" | "offline";
}

export interface LanyardResponse {
    data: Profile;
}

export interface RepositoryOwner {
    login: string;
}

export interface Repository {
    name: string;
    full_name: string;
    owner: RepositoryOwner;
    description: string;
    stargazers_count: number;
    language: string;
    forks: number;
}

export interface Tech {
    name: string;
    src: string;
}

export interface MyAppProps {
    Component: React.ComponentType;
    pageProps: Record<string, any>;
}

export interface MyDocumentProps {
    profile: Profile | null;
}

export interface ErrorProps {
    statusCode: number;
}

export interface Errors {
    [key: number]: string;
}

export interface Technology {
    name: string;
    src: string;
}