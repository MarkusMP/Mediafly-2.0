import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import Follower from "./pages/Followers/Follower";
import Following from "./pages/Following/Following";
import ProfileUpdate from "./pages/ProfileUpdate/ProfileUpdate";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/myprofile/" element={<Profile />} />
          <Route path="/myprofile/update" element={<ProfileUpdate />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/profile/:username/update" element={<ProfileUpdate />} />
          <Route path="/profile/followers/:username" element={<Follower />} />
          <Route path="/profile/followers/" element={<Follower />} />
          <Route path="/profile/following/:username" element={<Following />} />
          <Route path="/profile/following/" element={<Following />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
