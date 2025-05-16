import React, { useState, useEffect } from 'react';

const BlogForm = ({ addBlog, updateBlog, editingBlog }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (editingBlog) {
      setTitle(editingBlog.title);
      setContent(editingBlog.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [editingBlog]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) return;
    if (editingBlog) {
      updateBlog({ ...editingBlog, title, content });
    } else {
      addBlog({ title, content });
    }
    setTitle('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Title</label>
        <input
          type="text"
          id="title"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter blog title"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="content" className="form-label">Content</label>
        <textarea
          id="content"
          className="form-control"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter blog content"
          rows="5"
        ></textarea>
      </div>
      <button type="submit" className="btn btn-primary">
        {editingBlog ? 'Update Blog' : 'Add Blog'}
      </button>
    </form>
  );
};

export default BlogForm;