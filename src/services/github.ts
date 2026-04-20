export interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  stargazers_count: number;
  language: string;
  fork: boolean;
}

export interface GitHubUser {
  avatar_url: string;
  name: string;
  bio: string;
  public_repos: number;
}

const BASE_URL = 'https://api.github.com';

export const githubService = {
  async getUser(username: string): Promise<GitHubUser> {
    const response = await fetch(`${BASE_URL}/users/${username}`);
    if (!response.ok) throw new Error('Failed to fetch user');
    return response.json();
  },

  async getRepos(username: string): Promise<GitHubRepo[]> {
    const response = await fetch(`${BASE_URL}/users/${username}/repos?sort=updated&per_page=100`);
    if (!response.ok) throw new Error('Failed to fetch repos');
    const repos: GitHubRepo[] = await response.json();
    return repos.filter(repo => !repo.fork); // Filter out forks by default
  }
};
