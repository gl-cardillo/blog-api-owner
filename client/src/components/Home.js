import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('/posts').then((res) => {
      setPosts(res.data);
    });
  }, []);

  return (
    <div>
      <div className="top-bar">
        <h1>The Blog</h1>
        <Link to={'/create-post'}>
          <p>Create a post</p>
        </Link>
      </div>
      <div className="post-container">
        {posts.map((post, index) => {
          return (
            <div key={index}>
              <Link to={`/post/${post._id}`}>
                <p>title: {post.title}</p>
              </Link>
              {post.published ? <p>Published</p> : <p>Unpublished</p>}
              <p>Created at: {post.date_formatted}</p>
              {post.date_update ? (
                <p>Updated at: {post.date_update_formatted}</p>
              ) : (
                ''
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
