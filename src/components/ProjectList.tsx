import { GitHubRepo } from '../services/github';
import { ProjectCard } from './ProjectCard';

interface ProjectListProps {
  repos: GitHubRepo[];
}

export const ProjectList = ({ repos }: ProjectListProps) => {
  return (
    <div className="project-grid">
      {repos.map((repo) => (
        <ProjectCard key={repo.id} repo={repo} />
      ))}
    </div>
  );
};
