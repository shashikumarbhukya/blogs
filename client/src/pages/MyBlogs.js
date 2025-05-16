import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import BlogForm from '../components/BlogForm';
import BlogList from '../components/BlogList';
import { AuthContext } from '../context/AuthContext';

const MyBlogs = () => {
  const { user } = useContext(AuthContext);
  const [blogs, setBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      if (!user || !user.token) {
        setError('Please log in to view your blogs');
        return;
      }
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/blogs/myblogs`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        console.log('MyBlogs Response:', response.data);
        setBlogs(response.data);
      } catch (error) {
        console.error('Error Fetching Blogs:', error.response?.data || error.message);
        setError(error.response?.data?.message || 'Failed to load your blogs');
      }
    };
    if (user) fetchBlogs();
  }, [user]);

  const addBlog = async (blog) => {
    if (!user || !user.token) {
      setError('Please log in to add a blog');
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/blogs`,
        blog,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      console.log('Add Blog Response:', response.data);
      setBlogs([...blogs, response.data]);
    } catch (error) {
      console.error('Error adding blog:', error.response?.data || error.message);
      setError(error.response?.data?.message || 'Failed to add blog');
    }
  };

  const updateBlog = async (blog) => {
    if (!user || !user.token) {
      setError('Please log in to update a blog');
      return;
    }
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/blogs/${blog._id}`,
        blog,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      console.log('Update Blog Response:', response.data);
      setBlogs(blogs.map((b) => (b._id === blog._id ? response.data : b)));
      setEditingBlog(null);
    } catch (error) {
      console.error('Error updating blog:', error.response?.data || error.message);
      setError(error.response?.data?.message || 'Failed to update blog');
    }
  };

  const deleteBlog = async (id) => {
    if (!user || !user.token) {
      setError('Please log in to delete a blog');
      return;
    }
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/blogs/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setBlogs(blogs.filter((blog) => blog._id !== id));
    } catch (error) {
      console.error('Error deleting blog:', error.response?.data || error.message);
      setError(error.response?.data?.message || 'Failed to delete blog');
    }
  };

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
    // No state update needed, handled by AuthContext
  };

  const startEditing = (blog) => {
    setEditingBlog(blog);
  };

  return (
    <div>
      <h1 className="mb-4">My Blogs</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <BlogForm addBlog={addBlog} updateBlog={updateBlog} editingBlog={editingBlog} />
      <BlogList
        blogs={blogs}
        deleteBlog={deleteBlog}
        startEditing={startEditing}
        showActions={true}
        handleLikeBlog={handleLikeBlog}
        handleFavoriteBlog={handleFavoriteBlog}
      />
    </div>
  );
};

export default MyBlogs;