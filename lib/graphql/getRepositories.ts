import { meta } from '@/config';
import { ClientGraphql } from '@/lib/graphql/clientGraphql';

interface GraphqlResponse {
 user: {
  repositories: {
   nodes: Array<{
    name: string;
    openGraphImageUrl: string;
    isPrivate: boolean;
    description: string | null;
    languages: {
     edges: Language[];
     totalSize: number;
    };
    owner: {
     avatarUrl: string;
     name: string | null;
    };
    stargazerCount: number;
    forkCount: number;
   }>;
   pageInfo: {
    hasNextPage: boolean;
    endCursor: string | null;
   };
  };
 };
}

export async function GetRepositories(owner: string): Promise<ResponseRepository[]> {
 if (!owner) return [];
 if (owner !== meta.accounts.github.username) return [];

 const repositories: ResponseRepository[] = [];

 let hasNextPage = true;
 let afterCursor: string | null = null;

 while (hasNextPage) {
  const query = `
    query($owner: String!, $after: String) {
      user(login: $owner) {
        repositories(first: 100, after: $after, privacy: PUBLIC, orderBy: {field: UPDATED_AT, direction: DESC}) {
          nodes {
            name
            openGraphImageUrl
            isPrivate
            description
            languages(first: 10) {
              edges {
                size
                node {
                  color
                  name
                }
              }
              totalSize
            }
            owner {
              avatarUrl
              ... on User {
                name
              }
            }
            stargazerCount
            forkCount
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    }
  `;

  const variables = {
   owner,
   after: afterCursor,
  };

  const data: GraphqlResponse = await ClientGraphql(query, variables);

  if (!data.user || !data.user.repositories) break;

  data.user.repositories.nodes.forEach((repo) => {
   repositories.push({
    name: repo.name,
    private: repo.isPrivate,
    og: repo.openGraphImageUrl,
    languages: repo.languages.edges.sort((a, b) => b.size - a.size),
    totalSize: repo.languages.totalSize,
    description: repo.description,
    owner: {
     avatar: repo.owner.avatarUrl,
     name: repo.owner.name || meta.accounts.github.username,
    },
    stargazerCount: repo.stargazerCount,
    forks: repo.forkCount,
   });
  });

  // eslint-disable-next-line prefer-destructuring
  hasNextPage = data.user.repositories.pageInfo.hasNextPage;
  afterCursor = data.user.repositories.pageInfo.endCursor;
 }

 return repositories;
}
