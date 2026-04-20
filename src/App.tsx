import { useGitHubData } from './hooks/useGitHubData';
import { Header } from './components/Header';
import { ProjectList } from './components/ProjectList';
import './styles/App.css';

function App() {
  const { user, repos, loading, error } = useGitHubData();

  if (loading) return <div className="loading">Loading projects...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!user) return null;

  return (
    <div className="container">
      <Header user={user} />
      <ProjectList repos={repos} />
    </div>
  );
}

export default App;
