import { useState } from 'react';
import type { GitHubRepo } from '../services/github';
import { githubService } from '../services/github';
import { CONFIG } from '../config';
import { ReadmeModal } from './ReadmeModal';

interface ProjectCardProps {
  repo: GitHubRepo;
}

export const ProjectCard = ({ repo }: ProjectCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [readmeContent, setReadmeContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleOpenModal = async (e: React.MouseEvent) => {
    // Prevent opening modal if clicking on links
    if ((e.target as HTMLElement).tagName === 'A') return;
    
    setIsModalOpen(true);
    if (!readmeContent) {
      setLoading(true);
      try {
        const content = await githubService.getReadme(CONFIG.githubUsername, repo.name);
        setReadmeContent(content);
      } catch (err) {
        setReadmeContent('Could not load README for this repository.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <div className="project-card" onClick={handleOpenModal} style={{ cursor: 'pointer' }}>
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
      <ReadmeModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={repo.name}
        content={readmeContent}
        loading={loading}
      />
    </>
  );
};
