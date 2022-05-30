import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { Login } from './components/login/Login';
import { Home } from './components/home/Home';
import { Post } from './components/post/Post';
import { CreatePost } from './components/createPost/CreatePost';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login setIsAuth={setIsAuth} />} />
        <Route element={<ProtectedRoute isAuth={isAuth} />}>
          <Route path="/home" element={<Home setIsAuth={setIsAuth} />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/create-post/:id" element={<CreatePost />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
