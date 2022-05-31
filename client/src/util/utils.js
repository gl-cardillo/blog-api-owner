import axios from 'axios';

export const getPostAndComments = (id, setPost, setComments) => {
  if (id) {
    axios
      .post('/posts/postId', {
        id,
      })
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .post('/comments', {
        id,
      })
      .then((res) => {
        setComments(res.data.comments);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};


export const deleteComment = (id, setRender, render) => {
  axios
    .delete('/comments/deleteComment', {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('user')).token
        }`,
      },
      data: {
        id,
      },
    })
    .then(() => {
      setRender(!render);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deletePost = (id, img, navigate) => {
  axios
    .delete('/posts/deletePost', {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('user')).token
        }`,
      },

      data: {
        id,
        img
      },
    })
    .then(() => {
      navigate('/home');
    })
    .catch((err) => {
      console.log(err);
    });
  axios
    .delete('/comments/deleteCommentsPost', {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('user')).token
        }`,
      },
      data: {
        id,
        img
      },
    })
    .then(() => {
      navigate('/home');
    })
    .catch((err) => {
      console.log(err);
    });
};

export const publish = (id, setRender, render) => {
  axios
    .put(
      '/posts/publishPost',
      {
        id,
      },
      {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('user')).token
          }`,
        },
      }
    )
    .then(() => {
      setRender(!render);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const unpublish = (id, setRender, render) => {
  axios
    .put(
      '/posts/unpublishPost',
      {
        id,
      },
      {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('user')).token
          }`,
        },
      }
    )
    .then(() => {
      setRender(!render);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addComment = (id, text, setErrors, setRender, render, setText) => {
  axios
    .post('/comments/createComment', {
      text,
      username: JSON.parse(localStorage.getItem('user')).user.username,
      postId: id,
    })
    .then((res) => {
      if (res.data.errors) {
        setErrors(res.data.errors);
      }
      setRender(!render);
      setText('');
    })
    .catch((err) => {
      console.log(err);
    });
};

export const editPost = (id, navigate) => {
  navigate(`/create-post/${id}`, { replace: true });
};
