import type { GitHubRepo } from '../services/github';
import { ProjectCard } from './ProjectCard';

interface ProjectListProps {
  repos: GitHubRepo[];
}

export const ProjectList = ({ repos }: ProjectListProps) => {
  if (repos.length === 0) {
    return (
      <div className="no-projects">
        <p>No public projects found on GitHub.</p>
        <p style={{ fontSize: '14px', marginTop: '8px' }}>Add some public repositories or update the config to see them here!</p>
      </div>
    );
  }

  return (
    <div className="project-grid">
      {repos.map((repo) => (
        <ProjectCard key={repo.id} repo={repo} />
      ))}
    </div>
  );
};
