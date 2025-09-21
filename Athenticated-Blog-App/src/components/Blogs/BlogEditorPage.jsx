import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Spinner from '../Spinner';

const POSTS_KEY = 'fake_posts_db';

function getPostsFromStorage() {
  const posts = localStorage.getItem(POSTS_KEY);
  return posts ? JSON.parse(posts) : [];
}

function savePostsToStorage(posts) {
  localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
}

export default function BlogEditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load post if editing
  useEffect(() => {
    if (id) {
      setLoading(true);
      setTimeout(() => {
        const posts = getPostsFromStorage();
        const post = posts.find(p => p.id === Number(id));
        if (!post) {
          setError('Post not found');
          setLoading(false);
          return;
        }
        setTitle(post.title);
        setContent(post.content);
        setLoading(false);
      }, 1000);
    }
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (!title.trim() || !content.trim()) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const posts = getPostsFromStorage();
      if (id) {
        // Update existing
        const updatedPosts = posts.map(p => (p.id === Number(id) ? { ...p, title, content } : p));
        savePostsToStorage(updatedPosts);
      } else {
        // Create new
        const newPost = { id: Date.now(), title, content };
        posts.push(newPost);
        savePostsToStorage(posts);
      }
      setLoading(false);
      navigate('/dashboard');
    }, 1500);
  }

  if (loading) return <Spinner />;

  return (
    <div style={styles.container}>
      <Link to="/dashboard" style={styles.backLink}>&larr; Back to Dashboard</Link>
      <h2>{id ? 'Edit Post' : 'New Post'}</h2>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          style={styles.input}
        />
        <textarea
          placeholder="Post Content"
          value={content}
          onChange={e => setContent(e.target.value)}
          rows={10}
          style={styles.textarea}
        />
        <button type="submit" style={styles.button}>{id ? 'Update Post' : 'Create Post'}</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 700,
    margin: '40px auto',
    padding: 20,
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
  },
  backLink: {
    display: 'inline-block',
    marginBottom: 15,
    color: '#3498db',
    textDecoration: 'none',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
    borderRadius: 4,
    border: '1px solid #ccc',
  },
  textarea: {
    padding: 12,
    fontSize: 16,
    borderRadius: 4,
    border: '1px solid #ccc',
    marginBottom: 15,
    resize: 'vertical',
  },
  button: {
    padding: 14,
    fontSize: 16,
    backgroundColor: '#2ecc71',
    color: 'white',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginBottom: 15,
  }
};
