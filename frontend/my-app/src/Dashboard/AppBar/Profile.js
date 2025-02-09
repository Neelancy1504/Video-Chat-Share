"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Eye, EyeOff, LogOut } from "lucide-react"
import "./profile.css"

export default function Profile() {
  const [showPassword, setShowPassword] = useState(false)
  const [user] = useState({
    username: "john_doe",
    email: "john.doe@example.com",
    password: "********",
    bio: "Tech enthusiast & Full-Stack Developer 🚀",
    profilePic:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL7fqXlGHlPfVCGM6rmEUT0sAs80WIxGEjlSYiWIPHdKKwjAtt_ecipkYKaNUJ4fuuj1Y",
  })

  return (
    <div className="profile-container">
      <div className="background-effects">
        <div className="blur-circle-1" />
        <div className="blur-circle-2" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="profile-card-wrapper"
      >
        <div className="profile-card">
          <div className="card-content">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
              className="profile-header"
            >
              <img src={user.profilePic || "/placeholder.svg"} alt={user.username} className="avatar" />
              <h2 className="username">{user.username}</h2>
              <p className="bio">{user.bio}</p>
            </motion.div>

            <div className="form-group">
              <label className="form-label">Email</label>
              <div className="input-wrapper">
                <input type="email" value={user.email} disabled className="form-input" />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  value={showPassword ? "mypassword123" : user.password}
                  disabled
                  className="form-input"
                />
                <button onClick={() => setShowPassword(!showPassword)} className="password-toggle">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <button className="logout-button" onClick={() => console.log("Logout clicked")}>
                <LogOut />
                Logout
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

