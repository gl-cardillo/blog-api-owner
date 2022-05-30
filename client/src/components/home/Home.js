import './home.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';

export function Home({ setIsAuth }) {
  const [postsPublished, setPostsPublished] = useState([]);
  const [postsUnpublished, setPostsUnpublished] = useState([]);

  useEffect(() => {
    axios.get('/posts/published').then((res) => {
      setPostsPublished(res.data);
    });
    axios.get('/posts/unpublished').then((res) => {
      setPostsUnpublished(res.data);
    });
  }, []);

  const logOut = () => {
    setIsAuth(false);
    localStorage.removeItem('user');
  };

  return (
    <div>
      <div className="nav-bar">
        <h1>The Blog</h1>{' '}
        <div className="nav-bar-option">
          <Link to={'/create-post'}>
            <h2>Create a post</h2>
          </Link>
          <BiLogOut style={{ fontSize: '25px' }} onClick={logOut} />
        </div>
      </div>
      <div className="posts-container">
        <div className="posts-sections-title">
          <h3>Post published</h3>
          <div className="posts-sections">
            {postsPublished.map((post, index) => {
              return (
                <div key={index} className="post-container-home">
                  <Link to={`/post/${post._id}`}>
                    <h4>{post.title}</h4>
                  </Link>
                  {post.published ? <p>Published</p> : <p>Unpublished</p>}
                  <p>Created at: {post.date_formatted}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="posts-sections-title">
          <h3>Post unpublished</h3>
          <div className="posts-sections">
            {postsUnpublished.map((post, index) => {
              return (
                <div key={index} className="post-container-home">
                  <Link to={`/post/${post._id}`}>
                    <h4>{post.title}</h4>
                  </Link>
                  {post.published ? <p>Published</p> : <p>Unpublished</p>}
                  <p>Created at: {post.date_formatted}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <footer>
        <a
          href="https://github.com/gl-cardillo"
          target="_blank"
          rel="noreferrer"
        >
          <p>
            <FaGithub style={{ fontSize: '25px' }} /> Made by Luca Cardillo
          </p>
        </a>
      </footer>
    </div>
  );
}
