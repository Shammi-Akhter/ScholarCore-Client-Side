import React, { useState } from 'react';
import { Eye, EyeOff, UserPlus } from 'lucide-react';
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { useNavigate } from 'react-router';
import toast, { Toaster } from 'react-hot-toast';
import { auth } from '../../firebase.init';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';

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
        toast.error("Couldn't save user in DB");
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


  const handleRegister = async (e) => {
    e.preventDefault();
    const { name, email, password, photoURL } = formData;

    const errors = [];
    if (password.length < 6) errors.push("Password must be at least 6 characters.");
    if (!/[A-Z]/.test(password)) errors.push("Password must include a capital letter.");
    if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) errors.push("Password must include a special character.");

    if (errors.length > 0) {
      errors.forEach((err) => toast.error(err));
      return;
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center px-4 py-12">
      <Toaster position="top-center" reverseOrder={false} />
      <Card className="w-full max-w-lg shadow-2xl border-0">
        <CardHeader className="space-y-1 text-center pb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-[#FEE685] to-[#ffd93d] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <UserPlus className="w-8 h-8 text-black" />
          </div>
          <CardTitle className="text-3xl font-bold">Create Account</CardTitle>
          <CardDescription className="text-base">
            Join ScholarCore to discover scholarship opportunities
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
              <Input
                id="name"
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
              <Input
                id="email"
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="photoURL" className="text-sm font-medium">Profile Image URL (Optional)</Label>
              <Input
                id="photoURL"
                type="text"
                name="photoURL"
                value={formData.photoURL}
                onChange={handleChange}
                placeholder="https://your-image-url.com"
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
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
              {passwordError && (
                <p className="text-sm text-red-500 mt-1">{passwordError}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Must contain at least 6 characters, 1 uppercase letter, and 1 special character
              </p>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#FEE685] text-black hover:bg-[#FEE685]/90 font-semibold h-11 shadow-md hover:shadow-lg transition-all"
            >
              Create Account
            </Button>
          </form>

          <p className="text-center text-sm text-gray-600 pt-4">
            Already have an account?{' '}
            <a href="/login" className="text-black font-semibold hover:underline">
              Sign in
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
