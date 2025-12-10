import React, { useState } from 'react';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { toast, Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';
import { auth } from '../../firebase.init';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';

const googleProvider = new GoogleAuthProvider();

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });


  const getJWT = async (email) => {
    try {
      const res = await fetch('https://scholarcore.vercel.app/jwt', {
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center px-4 py-12">
      <Toaster />
      <Card className="w-full max-w-lg shadow-2xl border-0">
        <CardHeader className="space-y-1 text-center pb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-[#FEE685] to-[#ffd93d] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <LogIn className="w-8 h-8 text-black" />
          </div>
          <CardTitle className="text-3xl font-bold">Welcome Back</CardTitle>
          <CardDescription className="text-base">
            Sign in to access your scholarship dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="pr-10 h-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#FEE685] text-black hover:bg-[#FEE685]/90 font-semibold h-11 shadow-md hover:shadow-lg transition-all"
            >
              Sign In
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Or continue with</span>
            </div>
          </div>


          <Button
            onClick={handleGoogleLogin}
            variant="outline"
            className="w-full h-11 shadow-sm hover:shadow-md transition-all"
          >
            <svg
              className="w-5 h-5 mr-2"
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
            Sign in with Google
          </Button>

          <p className="text-center text-sm text-gray-600 pt-4">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="text-black font-semibold hover:underline">
              Create account
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
