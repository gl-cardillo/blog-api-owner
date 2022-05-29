import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { createOrUpdatePost } from '../util/utils';

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
      <Link to={'/home'}>
        <h1>The Blog</h1>
      </Link>
      <h2>Create a new post</h2>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <textarea onChange={(e) => setText(e.target.value)} value={text} />
      <input
        type="radio"
        onChange={() => setPublished(true)}
        name="published"
        checked
      />
      <label htmlFor="published">Publish</label>
      <input
        type="radio"
        onChange={() => setPublished(false)}
        name="published"
      />
      <label htmlFor="published">Don' t publish</label>
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
  );
}
