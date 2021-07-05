import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import PostDetail from "./PostDetail";
import Posts from "./Posts";
import Profile from "./Profile";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./style.css";

function App() {
  const [currentUser, setCurrentUser] = useState();
  const [userId, setUserId] = useState();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const userId = JSON.parse(window.localStorage.getItem("userId"));
    setUserId(userId);
  }, [isLogin]);

  useEffect(() => {
    if (userId) {
      axios
        .get(`https://60dff0ba6b689e001788c858.mockapi.io/users/${userId}`)
        .then((res) => {
          setIsLogin(true)
          setCurrentUser(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userId]);

  const handleLogout = () => {
    window.localStorage.removeItem("userId");
    setIsLogin(false)
    setCurrentUser(null);
    toast.success(`Log out sucessfully`);
  };

  const handleLogin = (data) => {
    axios.post('https://60dff0ba6b689e001788c858.mockapi.io/tokens', {
      email: data.email,
      password: data.password
    }).then(res => {
      setIsLogin(true)
      window.localStorage.setItem('userId', res.data.userId);
      toast.success(`Log in sucessfully`);
    }).catch(error => {
      toast.error('Login fail');
      console.log(error)
    })
  }

  return (
    <Router>
      <ToastContainer position="top-center" hideProgressBar />
      <div>
        <div className="nav-bar">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/posts">Posts</Link>
            </li>
            <li>
              {!isLogin ? (
                <Link to="/login">Login</Link>
              ) : (
                <button onClick={() => handleLogout()}>Logout</button>
              )}
            </li>
          </ul>
        </div>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/login">
            <Login onLogin={handleLogin} />
          </Route>
          <Route path="/profile">
            <Profile currentUser={currentUser} />
          </Route>
          <Route path="/posts">
            <Posts />
          </Route>
          <Route path="/postDetail/:id">
            <PostDetail />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
