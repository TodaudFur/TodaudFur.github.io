import type { GitHubRepo } from '../services/github';

interface ProjectCardProps {
  repo: GitHubRepo;
}

export const ProjectCard = ({ repo }: ProjectCardProps) => {
  return (
    <div className="project-card">
      <h3>{repo.name}</h3>
      <p>{repo.description || 'No description provided.'}</p>
      <div className="project-meta">
        {repo.language && <span className="language-tag">{repo.language}</span>}
        <div className="project-links">
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer">Source</a>
          {repo.homepage && (
            <a href={repo.homepage} target="_blank" rel="noopener noreferrer">Live Demo</a>
          )}
        </div>
      </div>
    </div>
  );
};
