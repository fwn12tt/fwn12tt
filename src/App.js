import "./App.css";
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import LogIn from "./containers/logIn";
import SignUp from "./containers/signUp";
import Header from './components/header'
import Register from "./Register";
import Reset from "./Reset";
import Dashboard from "./Dashboard";
import Loading from "./core/common/loading/loading";
import Home from "./containers/home";
import "./core/style/common.css";
import { Toaster } from 'react-hot-toast';

function App() {
  const [user, loading] = useAuthState(auth);
  useEffect(() => {
    if(user) {
    }
  }, [loading, user]);
  if (loading) {
    return <Loading/>;
  }
  return (
    <div className="app">
      <div className="container">
        <Toaster position="top-right"/>
        <Router>
          {user && <Header/>}
          <Routes>
            <Route
              exact
              path="/"
              element={user ? <Home /> : <Navigate replace to={"/login"} />}
            />
            <Route exact path="/login" element={<LogIn />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/reset" element={<Reset />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;