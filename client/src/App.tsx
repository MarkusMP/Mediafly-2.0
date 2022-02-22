import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import Following from "./pages/Following/Following";
import ProfileUpdate from "./pages/ProfileUpdate/ProfileUpdate";
import Follower from "./pages/Followers/Followers";
import Home from "./pages/Home/Home";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/myprofile/" element={<Profile />} />
          <Route path="/myprofile/update" element={<ProfileUpdate />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/profile/:username/update" element={<ProfileUpdate />} />
          <Route path="/profile/:username/followers" element={<Follower />} />
          <Route path="/myprofile/followers/" element={<Follower />} />
          <Route path="/profile/:username/following" element={<Following />} />
          <Route path="/myprofile/following/" element={<Following />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
