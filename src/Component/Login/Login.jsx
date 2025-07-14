
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { toast, Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';
import { auth } from '../../firebase.init';

const googleProvider = new GoogleAuthProvider();

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  
  const getJWT = async (email) => {
    try {
      const res = await fetch('http://localhost:5000/jwt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem('scholarToken', data.token);
      } else {
        toast.error('JWT token not received');
      }
    } catch (err) {
      console.error('JWT fetch failed:', err);
      toast.error('Token error');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      const user = userCredential.user;

      
      await getJWT(user.email);

      toast.success('Logged in successfully');
      navigate('/');
    } catch (err) {
      toast.error(err.code.replace('auth/', '').split('-').join(' '));
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      
      await getJWT(user.email);

      toast.success('Logged in with Google');
      navigate('/');
    } catch (err) {
      toast.error('Google sign-in failed');
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <Toaster />
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-8">
       
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            Login to Your Account
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Welcome back! Please enter your details.
          </p>
        </div>

      
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-amber-200 hover:bg-amber-300 text-gray-900 font-semibold py-2 rounded-lg  transition"
          >
            Login
          </button>
        </form>

        <div className="my-6 flex items-center">
          <hr className="flex-1 border-gray-300" />
          <span className="px-4 text-xs text-gray-500">OR</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        
        <button
          onClick={handleGoogleLogin}
          className="w-full border border-gray-300 flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-gray-50 transition"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 533.5 544.3"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M533.5 278.4c0-17.7-1.6-35.1-4.6-51.8H272v98h147.9c-6.4 34-25 62.9-53.3 82.3v68h86.2c50.6-46.6 80.7-115.3 80.7-196.5z"
              fill="#4285f4"
            />
            <path
              d="M272 544.3c72.5 0 133.4-24.1 177.9-65.2l-86.2-68c-23.9 16-54.6 25.5-91.7 25.5-70.5 0-130.3-47.6-151.7-111.3h-90v69.8C71 475.8 163.6 544.3 272 544.3z"
              fill="#34a853"
            />
            <path
              d="M120.3 325.3C111.2 299.9 111.2 269.2 120.3 243.8v-69.8h-90C11.7 242.2 0 280.2 0 320s11.7 77.8 30.3 111.9l90-69.8z"
              fill="#fbbc04"
            />
            <path
              d="M272 108.7c39 0 74 13.4 101.5 39.5l76-76C402.8 24.6 347.5 0 272 0 163.6 0 71 68.5 30.3 168.3l90 69.8C141.7 156.3 201.5 108.7 272 108.7z"
              fill="#ea4335"
            />
          </svg>
          <span className="font-medium text-gray-700">
            Sign in with Google
          </span>
        </button>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
