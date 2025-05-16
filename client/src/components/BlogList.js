import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const BlogList = ({
  blogs = [],
  deleteBlog,
  startEditing,
  showActions = true,
  handleLikeBlog,
  handleFavoriteBlog,
}) => {
  const { user, updateFavorites } = useContext(AuthContext);
  const [error, setError] = useState(null);

  const handleLike = async (blogId) => {
    if (!user || !user.token) {
      setError('Please log in to like a blog');
      return;
    }
    try {
      setError(null);
      console.log('Sending POST to:', `${process.env.REACT_APP_API_URL}/blogs/${blogId}/like`);
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/blogs/${blogId}/like`,
        {},
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      handleLikeBlog(blogId, response.data);
    } catch (error) {
      console.error('Error liking blog:', error.response?.data || error.message);
      setError(error.response?.data?.message || 'Failed to like blog');
    }
  };

  const handleFavorite = async (blogId) => {
    if (!user || !user.token) {
      setError('Please log in to favorite a blog');
      return;
    }
    try {
      setError(null);
      console.log('Sending POST to:', `${process.env.REACT_APP_API_URL}/users/favorites/${blogId}`);
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/favorites/${blogId}`,
        {},
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      updateFavorites(response.data); // Sync user.favorites
      handleFavoriteBlog(blogId, response.data);
    } catch (error) {
      console.error('Error favoriting blog:', error.response?.data || error.message);
      setError(error.response?.data?.message || 'Failed to favorite blog');
    }
  };

  console.log('BlogList Blogs:', blogs);
  console.log('Current User:', user);

  return (
    <div>
      {error && <div className="alert alert-danger">{error}</div>}
      {Array.isArray(blogs) && blogs.length > 0 ? (
        blogs.map((blog) => (
          <div key={blog._id} className="card mb-3">
            <div className="card-body">
              <h2 className="card-title">{blog.title}</h2>
              <p className="card-text">{blog.content}</p>
              <p className="card-text">
                <small className="text-muted">
                  By: {blog.author?.username || 'Unknown'}
                </small>
              </p>
              <p className="card-text">
                <small className="text-muted">
                  {blog.likes?.length || 0} Like{blog.likes?.length !== 1 ? 's' : ''}
                </small>
              </p>
              <button
                onClick={() => handleLike(blog._id)}
                disabled={!user || !user.token}
                className={`btn ${user && blog.likes?.some((like) => like._id=== user.id) ? 'btn-outline-danger' : 'btn-outline-primary'} me-2`}
                title={!user ? 'Login to like' : ''}
              >
                <i className={`fa${user && blog.likes?.some((like) => like._id === user.id) ? 's' : 'r'} fa-heart me-1`}></i>
                {user && blog.likes?.some((like) => like._id === user.id) ? 'Unlike' : 'Like'}
              </button>
              <button
                onClick={() => handleFavorite(blog._id)}
                disabled={!user || !user.token}
                className={`btn ${user && user.favorites?.some(id => id=== blog._id) ? 'btn-outline-warning' : 'btn-outline-secondary'} me-2`}
                title={!user ? 'Login to favorite' : ''}
              >
                <i className={`fa${user && user.favorites?.some(id => id === blog._id) ? 's' : 'r'} fa-star me-1`}></i>
                {user && user.favorites?.some(id => id === blog._id) ? 'Unfavorite' : 'Favorite'}
              </button>
              {showActions && user && blog.author?._id === user.id && (
                <>
                  <button
                    onClick={() => startEditing(blog)}
                    className="btn btn-outline-warning me-2"
                  >
                    <i className="fas fa-edit me-1"></i>Edit
                  </button>
                  <button
                    onClick={() => deleteBlog(blog._id)}
                    className="btn btn-outline-danger"
                  >
                    <i className="fas fa-trash me-1"></i>Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="alert alert-info">No blogs available</div>
      )}
    </div>
  );
};

export default BlogList;