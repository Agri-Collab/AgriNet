import React, { useState } from 'react';
import ArticleComponent from '../Component/ArticleComponent';
import ArticleListComponent from '../Component/ArticleListComponent';

const ArticlePage = () => {
  const [refreshArticles, setRefreshArticles] = useState(false);

  const handleArticlePosted = () => {
    setRefreshArticles((prev) => !prev);
  };

  return (
    <div style={styles.page}>
      <div style={styles.left}>
        <h2>📝 Post New Article</h2>
        <ArticleComponent onArticlePosted={handleArticlePosted} />
      </div>

      <div style={styles.right}>
        <h2>📰 Latest Articles</h2>
        <ArticleListComponent refreshFlag={refreshArticles} />
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    display: 'flex',
    height: '100vh',
    padding: 20,
    gap: 40,
    boxSizing: 'border-box',
  },
  left: {
    width: '30%',
    padding: 20,
    borderRight: '1px solid #ccc',
  },
  right: {
    flex: 1,
    padding: 20,
    overflowY: 'auto',
  },
};

export default ArticlePage;
