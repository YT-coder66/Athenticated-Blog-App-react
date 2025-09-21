
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import Spinner from '../components/Spinner';

const POSTS_KEY = 'fake_posts_db';

function getPostsFromStorage() {
  const posts = localStorage.getItem(POSTS_KEY);
  return posts ? JSON.parse(posts) : [];
}

function savePostsToStorage(posts) {
  localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
}

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Simulate fetch
    setTimeout(() => {
      setPosts(getPostsFromStorage());
      setLoading(false);
    }, 1500);
  }, []);

  function handleDelete(id) {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    const filtered = posts.filter(p => p.id !== id);
    savePostsToStorage(filtered);
    setPosts(filtered);
  }

  if (loading) return <Spinner />;

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Welcome, {user.username}</h1>
        <button onClick={logout} style={styles.logoutButton}>Logout</button>
      </header>
      <Link to="/new" style={styles.newPostButton}>+ New Post</Link>

      {posts.length === 0 ? (
        <p>No posts yet. Create your first one!</p>
      ) : (
        posts.map(post => (
          <div key={post.id} style={styles.postCard}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <div>
              <Link to={`/edit/${post.id}`} style={styles.editButton}>Edit</Link>
              <button onClick={() => handleDelete(post.id)} style={styles.deleteButton}>Delete</button>
            </div>
          </div>
        ))
      )}
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
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    border: 'none',
    padding: '8px 14px',
    color: 'white',
    borderRadius: 4,
    cursor: 'pointer',
    fontSize: 14,
  },
  newPostButton: {
    display: 'inline-block',
    margin: '20px 0',
    backgroundColor: '#3498db',
    color: 'white',
    padding: '10px 18px',
    borderRadius: 4,
    textDecoration: 'none',
  },
  postCard: {
    border: '1px solid #ddd',
    borderRadius: 6,
    padding: 15,
    marginBottom: 15,
  },
  editButton: {
    marginRight: 10,
    backgroundColor: '#f39c12',
    color: 'white',
    border: 'none',
    padding: '6px 12px',
    borderRadius: 4,
    cursor: 'pointer',
    textDecoration: 'none',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '6px 12px',
    borderRadius: 4,
    cursor: 'pointer',
  }
};
