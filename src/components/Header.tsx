import type { GitHubUser } from '../services/github';
import { CONFIG } from '../config';

interface HeaderProps {
  user: GitHubUser;
}

export const Header = ({ user }: HeaderProps) => {
  return (
    <header>
      <img src={user.avatar_url} alt={user.name || ''} className="avatar" />
      <h1>{CONFIG.name}</h1>
      <p className="bio">{user.bio || CONFIG.bio}</p>
      <div className="social-links">
        {CONFIG.socialLinks.map((link) => (
          <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer">
            {link.label}
          </a>
        ))}
      </div>
    </header>
  );
};
