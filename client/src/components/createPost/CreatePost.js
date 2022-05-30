import './createPost.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { createOrUpdatePost } from '../../util/utils';
import { FaGithub } from 'react-icons/fa';

export function CreatePost() {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [published, setPublished] = useState(true);
  const [errors, setErrors] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios
        .post('/posts/postId', {
          id,
        })
        .then((res) => {
          setTitle(res.data.title);
          setText(res.data.text);
          setPublished(res.data.published);
        });
    }
  }, []);

  return (
    <div>
      <div className="nav-bar">
        <Link to={'/home'}>
          <h1>The Blog</h1>
        </Link>
      </div>
      <div className="create-post-container">
        <h2>Create a new post</h2>
        Title:
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        Text:
        <textarea
          onChange={(e) => setText(e.target.value)}
          value={text}
          rows={10}
        />
        <div className="radio-form">
          <div className="radio-input">
            <input
              type="radio"
              onChange={() => setPublished(true)}
              name="published"
              id="unpublished"
            />
            <label htmlFor="unpublished">Publish</label>
          </div>
          <div className="radio-input">
            <input
              type="radio"
              onChange={() => setPublished(false)}
              name="published"
              id="published"
            />
            <label htmlFor="published">Don' t publish</label>
          </div>
        </div>
        <button
          onClick={() =>
            createOrUpdatePost(id, title, text, published, setErrors, navigate)
          }
        >
          Add Post
        </button>
        {errors.length > 0 ? (
          <div>
            {errors.map((error, index) => {
              return <p key={index}>{error.msg}</p>;
            })}
          </div>
        ) : (
          ''
        )}{' '}
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
