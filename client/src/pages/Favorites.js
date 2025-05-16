import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import BlogList from '../components/BlogList';
import { AuthContext } from '../context/AuthContext';

const Favorites = () => {
  const { user } = useContext(AuthContext);
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user || !user.token) {
        setError('Please log in to view your favorites');
        return;
      }
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/users/favorites`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        console.log('Favorites Response:', response.data);
        setBlogs(response.data);
      } catch (error) {
        console.error('Error Fetching Favorites:', error.response?.data || error.message);
        setError(error.response?.data?.message || 'Failed to load favorites');
      }
    };
    if (user) fetchFavorites();
  }, [user]);

  const handleLikeBlog = (blogId, updatedBlog) => {
    console.log('Updating blog with ID:', blogId, 'to:', updatedBlog);
    setBlogs(
      blogs.map((blog) =>
        blog._id === blogId ? updatedBlog : blog
      )
    );
  };

  const handleFavoriteBlog = (blogId, updatedFavorites) => {
    console.log('Updating favorites for blog ID:', blogId);
    setBlogs(updatedFavorites); // Update local blogs state
  };

  return (
    <div>
      <h1 className="mb-4">My Favorites</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <BlogList
        blogs={blogs}
        showActions={false}
        handleLikeBlog={handleLikeBlog}
        handleFavoriteBlog={handleFavoriteBlog}
      />
    </div>
  );
};

export default Favorites;