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

const ArticleListComponent: React.FC<ArticleListProps> = ({ refreshFlag, searchQuery }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) return <p style={styles.centerText}>Loading articles...</p>;
  if (error) return <p style={{ ...styles.centerText, color: 'red' }}>Error: {error}</p>;
  if (filteredArticles.length === 0) return <p style={styles.centerText}>No articles found.</p>;

  return (
    <div>
      {filteredArticles.map(a => (
        <div key={a.id} style={styles.articleCard}>
          <h3 style={styles.title}>{a.title}</h3>
          <p style={styles.content}>{a.content}</p>
          <small style={styles.meta}>
            Created on: {new Date(a.createdAt).toLocaleDateString()} | User ID: {a.userId}
          </small>
        </div>
      ))}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  articleCard: { backgroundColor: '#f4f4f4', padding: 16, borderRadius: 8, marginBottom: 20, border: '1px solid #ccc' },
  title: { marginBottom: 8, color: '#007bff' },
  content: { marginBottom: 12, color: '#555', whiteSpace: 'pre-wrap' },
  meta: { fontSize: '0.8rem', color: '#888' },
  centerText: { textAlign: 'center', marginTop: 40, fontStyle: 'italic' },
};

export default ArticleListComponent;
