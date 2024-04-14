"use client";
import { useRouter } from 'next/navigation'; // Import useRouter from next/router
import { signIn } from 'next-auth/react'; // Import signUp from next-auth/react
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Link from 'next/link';

export default function SignupPage() {
  const router = useRouter(); // Use useRouter hook from next/router

  const [user, setUser] = useState({
    email: '',
    password: '',
    username: '',
    type: 'creator',
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Call the signUp function with credentials provider
      const result = await signIn('credentials', {
        email: user.email,
        password: user.password,
        username: user.username,
        redirect:false,
        
        // Add any additional data required for signup
      });

      if (result.error) {
        // Handle signup error
        console.error('Signup error:', result.error);
      } else {
        // Signup successful, navigate to login page
        router.push('/login');
      }
    } catch (error) {
      // Handle other errors
      console.error('Error during signup:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const { email, password, username } = user;
    if (email && password && username) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? 'Processing' : 'Signup'}</h1>
      <hr />
      <form onSubmit={handleSignup}>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="example@example.com"
            value={user.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="password"
            value={user.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="username">Username</Label>
          <Input
            type="text"
            id="username"
            name="username"
            placeholder="username"
            value={user.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <RadioGroup
          defaultValue="creator"
          onChange={(value) =>
            setUser((prevUser) => ({ ...prevUser, type: value }))
          }
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="default" id="r1" />
            <Label htmlFor="r1">Default</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="creator" id="r2" />
            <Label htmlFor="r2">Creator</Label>
          </div>
        </RadioGroup>
        <Button type="submit" disabled={buttonDisabled} className="mb-4">
          {loading ? 'Signing up...' : 'Signup'}
        </Button>
      </form>
      <Link href="/login">Visit login page</Link>
    </div>
  );
}
