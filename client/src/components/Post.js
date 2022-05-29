import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  getPostAndComments,
  deletePost,
  publish,
  unpublish,
  addComment,
  editPost,
  deleteComment
} from '../util/utils';

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
      <div>
        <Link to={'/home'}>
          <h1>The Blog</h1>
        </Link>
      </div>
      {post !== '' ? (
        <div>
          <p>{post.title}</p>
          <p>{post.text}</p>
          <p>{post.published}</p>
          <p>{post.date_formatted}</p>
          {post.published ? (
            <button onClick={() => unpublish(id, setRender, render)}>
              Unpublish
            </button>
          ) : (
            <button onClick={() => publish(id, setRender, render)}>
              Publish
            </button>
          )}
          <button onClick={() => deletePost(id, navigate)}>Delete post</button>
          <button onClick={() => editPost(id, navigate)}>Edit post</button>
        </div>
      ) : (
        'Post not found :('
      )}
      {comments.length > 0 ? (
        <div>
          {comments.map((comment, index) => {
            return (
              <div key={index}>
                <p>text: {comment.text}</p>
                <p>username:{comment.username}</p>
                <p>created at:{comment.date_formatted}</p>
                <button onClick={() => deleteComment(comment.id, setRender, render)}>Delete comment</button>
              </div>
            );
          })}
        </div>
      ) : (
        'no comments at the moment'
      )}
      <textarea onChange={(e) => setText(e.target.value)} value={text} />
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
  );
}
