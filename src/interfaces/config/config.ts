export interface MetaConfig {
  version: string;
  name: string;
  description: string;
  shortDescription: string;
  email: string;
  url: string;
  accounts: {
    github: {
      username: string;
      repo: string;
      url?: string;
      key?: string;
    };
    youtube: {
      username: string;
      url?: string;
    };
    discord: {
      username: string;
      server: string;
      id?: string|any;
    };
    instagram: {
      username: string;
      url?: string;
    };
    spotify: {
      url?: string;
    };
  };
  webhook?: string | any;
  tailwindColors: Record<string, string>;
  errors: {
    404: string;
    500: string;
  };
}
