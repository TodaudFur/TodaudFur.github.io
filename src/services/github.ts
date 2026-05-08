export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  language: string | null;
  fork: boolean;
}

export interface GitHubUser {
  avatar_url: string;
  name: string | null;
  bio: string | null;
  public_repos: number;
}

const BASE_URL = 'https://api.github.com';

const headers = {
  'Accept': 'application/vnd.github+json',
};

export const githubService = {
  async getUser(username: string): Promise<GitHubUser> {
    const response = await fetch(`${BASE_URL}/users/${username}`, { headers });
    if (!response.ok) throw new Error(`Failed to fetch user: ${response.statusText}`);
    return response.json();
  },

  async getRepos(username: string, excludeRepos: string[] = []): Promise<GitHubRepo[]> {
    const response = await fetch(`${BASE_URL}/users/${username}/repos?sort=updated&per_page=100`, { headers });
    if (!response.ok) throw new Error(`Failed to fetch repos: ${response.statusText}`);
    const repos = await response.json();
    if (!Array.isArray(repos)) return [];
    return repos.filter(repo => !repo.fork && !excludeRepos.includes(repo.name));
  },

  async getReadme(username: string, repoName: string): Promise<string> {
    const response = await fetch(`${BASE_URL}/repos/${username}/${repoName}/readme`, {
      headers: {
        ...headers,
        'Accept': 'application/vnd.github.raw+json',
      }
    });
    if (!response.ok) throw new Error('README not found');
    return response.text();
  }
};
