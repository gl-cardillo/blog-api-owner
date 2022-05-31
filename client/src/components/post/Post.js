import './post.css';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaGithub } from 'react-icons/fa';
import {
  getPostAndComments,
  deletePost,
  publish,
  unpublish,
  addComment,
  editPost,
  deleteComment,
} from '../../util/utils';

export function Post() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState('');
  const [comments, setComments] = useState([]);
  const [render, setRender] = useState(false);
  const [errors, setErrors] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    getPostAndComments(id, setPost, setComments);
  }, [render, id]);

  return (
    <div>
      <div className="nav-bar">
        <Link to={'/home'}>
          <h1>The Blog</h1>
        </Link>
        <Link to={'/create-post'}>
          <h2>Create a post</h2>
        </Link>
      </div>
      <div className="post-container">
        {post !== '' ? (
          <div className="post">
            <h3>{post.title}</h3>
            <div className="edit-post">
              {post.published ? (
                <button onClick={() => unpublish(id, setRender, render)}>
                  Unpublish
                </button>
              ) : (
                <button onClick={() => publish(id, setRender, render)}>
                  Publish
                </button>
              )}
              <button onClick={() => deletePost(id, post.img, navigate)}>
                Delete post
              </button>
              <button onClick={() => editPost(id, navigate)}>Edit post</button>
            </div>{' '}
            <img src={post.img !== '' ? post.img : ''} alt="" />
            <p>{post.text}</p>
            <div className="time">
              <p>Created at: {post.date_formatted}</p>
              {post.date_update !== null ? (
                <p>Updated at: {post.date_update_formatted}</p>
              ) : (
                ''
              )}
            </div>
          </div>
        ) : (
          'Post not found :('
        )}

        {comments.length > 0 ? (
          <div className="comments-container">
            <h3> Comments:</h3>
            {comments.map((comment, index) => {
              return (
                <div key={index} className="comment-container">
                  <p className="comment-text">{comment.text}</p>
                  <div className="comment-details">
                    <p>-{comment.username}</p>
                    <p>{comment.date_formatted}</p>
                    <button
                      onClick={() =>
                        deleteComment(comment.id, setRender, render)
                      }
                    >
                      Delete comment
                    </button>
                  </div>{' '}
                </div>
              );
            })}
          </div>
        ) : (
          'no comments at the moment'
        )}

        <div className="comment-form-container">
          <textarea
            onChange={(e) => setText(e.target.value)}
            value={text}
            rows={5}
          />
          <button
            onClick={() =>
              addComment(id, text, setErrors, setRender, render, setText)
            }
          >
            Add comment
          </button>
          {errors.length > 0 ? (
            <div>
              {errors.map((error, index) => {
                return <p key={index}>{error.msg}</p>;
              })}
            </div>
          ) : (
            ''
          )}
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
