import { useState, useEffect } from 'react';
import { githubService } from '../services/github';
import type { GitHubRepo, GitHubUser } from '../services/github';
import { CONFIG } from '../config';

export const useGitHubData = () => {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [userData, reposData] = await Promise.all([
          githubService.getUser(CONFIG.githubUsername),
          githubService.getRepos(CONFIG.githubUsername, CONFIG.excludeRepos)
        ]);
        setUser(userData);
        setRepos(reposData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { user, repos, loading, error };
};
