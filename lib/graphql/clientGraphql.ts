import { graphql } from '@octokit/graphql';

export const ClientGraphql = graphql.defaults({
 headers: {
  authorization: `token ${process.env.GITHUB_ACESS_TOKEN}`,
  accept: 'application/vnd.github+json',
 },
});
