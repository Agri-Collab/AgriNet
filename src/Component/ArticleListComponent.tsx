import React, { useEffect, useState } from 'react';

interface Article {
  id: number;
  title: string;
  content: string;
  userId: number;
  createdAt: string;
}

interface ArticleListProps {
  refreshFlag: boolean;
  searchQuery: string;
}

// Helper for "x minutes/hours/days ago"
const timeAgo = (dateString: string) => {
  const now = new Date();
  const posted = new Date(dateString);
  const diff = now.getTime() - posted.getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days !== 1 ? 's' : ''} ago`;
};

const ArticleListComponent: React.FC<ArticleListProps> = ({ refreshFlag, searchQuery }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const res = await fetch('https://localhost:5001/api/articles');
        if (!res.ok) throw new Error('Failed to fetch articles');
        const data: Article[] = await res.json();
        setArticles(data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [refreshFlag]);

  const filteredArticles = articles.filter(a =>
    a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleExpand = (id: number) => {
    setExpandedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  const truncate = (text: string, max = 200) => {
    if (text.length <= max) return text;
    return text.slice(0, max);
  };

  if (loading) return <p style={styles.centerText}>Loading articles...</p>;
  if (error) return <p style={{ ...styles.centerText, color: 'red' }}>Error: {error}</p>;
  if (filteredArticles.length === 0) return <p style={styles.centerText}>No articles found.</p>;

  return (
    <div style={styles.container}>
      {filteredArticles.map(a => {
        const isExpanded = expandedIds.has(a.id);
        const shouldTruncate = a.content.length > 200;
        return (
          <div
            key={a.id}
            style={styles.articleCard}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#f5f5f5')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#fff')}
          >
            <div style={styles.header}>
              <div style={styles.title}>{a.title}</div>
              <div style={styles.time}>{timeAgo(a.createdAt)}</div>
            </div>
            <p style={styles.content}>
              {isExpanded || !shouldTruncate ? a.content : truncate(a.content) + '...'}
              {shouldTruncate && (
                <span style={styles.readMore} onClick={() => toggleExpand(a.id)}>
                  {isExpanded ? ' Read Less' : ' Read More'}
                </span>
              )}
            </p>
          </div>
        );
      })}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: { width: '100%', maxWidth: '800px', margin: '0 auto', padding: '20px' },
  centerText: { textAlign: 'center', marginTop: 40, fontStyle: 'italic', color: '#555' },
  articleCard: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 6,
    marginBottom: 20,
    border: '1px solid #e2e8f0',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    transition: 'background-color 0.2s, box-shadow 0.2s, transform 0.2s',
    cursor: 'pointer',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  title: { fontSize: '1.2rem', fontWeight: 600, color: '#333' }, 
  time: { fontSize: '0.85rem', color: '#777' },
  content: { fontSize: '1rem', color: '#222', lineHeight: 1.5, whiteSpace: 'pre-wrap' }, 
  readMore: { color: '#007bff', cursor: 'pointer', fontWeight: 500, marginLeft: 4 },
};

export default ArticleListComponent;
