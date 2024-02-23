"use client"; // Marking the component as a Client Component

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Importing next/navigation instead of next/router
import axios from "axios";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function SignupPage() {
  const navigation = useRouter(); // Using useNavigation hook

  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
    type: "creator",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      navigation.navigate("/login"); // Using navigate method for navigation
    } catch (error) {
      toast.error(error.message);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing" : "Signup"}</h1>
      <hr />
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          name="email"
          placeholder="example@example.com"
          value={user.email}
          onChange={handleInputChange}
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
      <Button onClick={onSignup} disabled={buttonDisabled} className="mb-4">
        {loading ? "Signing up..." : "Signup"}
      </Button>
      <Link href="/login">Visit login page</Link>
    </div>
  );
}
