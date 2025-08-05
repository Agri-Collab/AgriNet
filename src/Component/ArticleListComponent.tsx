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
}

const ArticleListComponent: React.FC<ArticleListProps> = ({ refreshFlag }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch('https://localhost:5001/api/articles');
        if (!res.ok) throw new Error('Failed to fetch articles');
        const data: Article[] = await res.json();
        setArticles(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [refreshFlag]);

  const toggleExpand = (id: number) => {
    setExpandedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  if (loading) return <p style={styles.centerText}>Loading articles...</p>;
  if (error) return <p style={{ ...styles.centerText, color: 'red' }}>Error: {error}</p>;
  if (articles.length === 0) return <p style={styles.centerText}>No articles found.</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📰 Latest Articles</h2>
      {articles.map((article) => {
        const isExpanded = expandedIds.has(article.id);
        const displayedContent = isExpanded
          ? article.content
          : article.content.length > 100
          ? article.content.slice(0, 100) + '...'
          : article.content;

        return (
          <div key={article.id} style={styles.articleCard}>
            <h3
              style={styles.title}
              onClick={() => toggleExpand(article.id)}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleExpand(article.id);
                }
              }}
              role="button"
              aria-expanded={isExpanded}
              aria-controls={`article-content-${article.id}`}
            >
              {article.title}
            </h3>
            <p id={`article-content-${article.id}`} style={styles.content}>
              {displayedContent}
            </p>
            <small style={styles.meta}>
              Created on: {new Date(article.createdAt).toLocaleDateString()} | User ID: {article.userId}
            </small>
          </div>
        );
      })}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: 800,
    margin: '0 auto',
    padding: 20,
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
  },
  heading: {
    textAlign: 'center',
    marginBottom: 20,
  },
  articleCard: {
    backgroundColor: '#f4f4f4',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
    border: '1px solid #ccc',
  },
  title: {
    marginBottom: 8,
    color: '#007bff',
    cursor: 'pointer',
    userSelect: 'none',
  },
  content: {
    marginBottom: 12,
    color: '#555',
    whiteSpace: 'pre-wrap',
  },
  meta: {
    fontSize: '0.8rem',
    color: '#888',
  },
  centerText: {
    textAlign: 'center',
    marginTop: 40,
    fontStyle: 'italic',
  },
};

export default ArticleListComponent;
