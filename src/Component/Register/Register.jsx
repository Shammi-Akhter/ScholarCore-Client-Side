import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { useNavigate } from 'react-router';         // ✅ use react‑router‑dom
import toast, { Toaster } from 'react-hot-toast';
import { auth } from '../../firebase.init';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    photoURL: '',
  });

  const navigate = useNavigate();

  /* ─────────────────────────
     tiny helper: grab JWT
     ───────────────────────── */
  const getJWT = async (email, uid) => {
    try {
      const res = await fetch('https://scholarcore.vercel.app/jwt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, uid }),
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem('scholarToken', data.token);
      } else {
        toast.error('Failed to get token');
      }
    } catch (err) {
      
      toast.error('Token error');
    }
  };

  /* ─────────────────────────
     NEW helper: save user doc
     ───────────────────────── */
  const saveUserInDB = async ({ email, displayName, photoURL, uid }) => {
    try {
      const res = await fetch('https://scholarcore.vercel.app/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, displayName, photoURL, uid }),
      });
      const data = await res.json();
      if (data.insertedId || data.message === 'User already exists') {
        // ok – no toast to avoid double success spam
      } else {
        toast.error('Couldn’t save user in DB');
      }
    } catch (err) {
      
      toast.error('DB save error');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  
    if (name === 'password') {
      const errors = [];
      if (value.length < 6) errors.push("At least 6 characters.");
      if (!/[A-Z]/.test(value)) errors.push("1 uppercase letter.");
      if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value)) errors.push("1 special character.");
      setPasswordError(errors.join(' '));
    }
  };
  

  /* ─────────────────────────
     Register click handler
     ───────────────────────── */
     const handleRegister = async (e) => {
      e.preventDefault();
      const { name, email, password, photoURL } = formData;
    
      // ✅ Password validations
      const errors = [];
      if (password.length < 6) errors.push("Password must be at least 6 characters.");
      if (!/[A-Z]/.test(password)) errors.push("Password must include a capital letter.");
      if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) errors.push("Password must include a special character.");
    
      if (errors.length > 0) {
        errors.forEach((err) => toast.error(err));
        return; // 🔁 prevent submission
      }
    
      try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(user, { displayName: name, photoURL });
    
        await saveUserInDB({
          email: user.email,
          displayName: name,
          photoURL,
          uid: user.uid,
        });
    
        await getJWT(user.email, user.uid);
    
        toast.success("Registration successful!");
        navigate("/");
      } catch (err) {
        toast.error(err.message);
      }
    };
    

  /* ─────────────────────────
     UI
     ───────────────────────── */
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-8">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            Create A New Account
          </h2>
          <p className="text-sm text-gray-500 mt-1">Sign up to get started!</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your full name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Image URL
            </label>
            <input
              type="text"
              name="photoURL"
              value={formData.photoURL}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://your-image-url.com"
            />
          </div>

          {/* Password */}
          {/* Password */}
<div>
  <label className="block text-gray-700 font-medium mb-1">
    Password
  </label>
  <div className="relative">
    <input
      type={showPassword ? 'text' : 'password'}
      name="password"
      required
      value={formData.password}
      onChange={handleChange}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
      placeholder="Create a password"
    />
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
    >
      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
    </button>
  </div>
  {passwordError && (
    <p className="text-sm text-red-500 mt-1">{passwordError}</p>
  )}
</div>


          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-amber-200 text-gray-900 font-semibold py-2 rounded-lg hover:bg-amber-300 transition"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
