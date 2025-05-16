import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogList from '../components/BlogList';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/blogs`);
        console.log('Home Blogs Response:', response.data);
        setBlogs(response.data);
      } catch (error) {
        console.error('Error Fetching Blogs:', error.response?.data || error.message);
        setError('Failed to load blogs');
      }
    };
    fetchBlogs();
  }, []);

  const handleLikeBlog = (blogId, updatedBlog) => {
    console.log('Updating blog with ID:', blogId, 'to:', updatedBlog);
    setBlogs(
      blogs.map((blog) =>
        blog._id === blogId ? updatedBlog : blog
      )
    );
  };

  const handleFavoriteBlog = (blogId, updatedFavorites) => {
    console.log('Favorites updated:', updatedFavorites);
    // No state update needed for Home, handled by AuthContext
  };

  return (
    <div>
      <h1 className="mb-4">All Blogs</h1>
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

export default Home;