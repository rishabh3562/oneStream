"use client"
import * as React from "react";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import getAppwrite from "@/helpers/getAppwrite"
import { handleSignUp } from "@/helpers/authHelper";
import { Account, Client, Databases, ID } from 'appwrite';
import { useRouter } from "next/navigation";

export function SignupForm({ className, ...props }) {

  const [isLoading, setIsLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [usertype, setUsertype] = React.useState("creator"); // Default value
  const {account,databases,ID}=intialClient();
  
  const router=useRouter();


  async function onSubmit(event) {
    event.preventDefault();
    
    console.log("loading");

    // Logging form data
    console.log("Email:", email);
    console.log("Username:", username);
    console.log("Password:", password);
    console.log("User Type:", usertype);

    // Storing form data in local storage
    localStorage.setItem("userEmail", email);

    localStorage.setItem("userUsername", username);
    localStorage.setItem("userType", usertype);
    try{

        const test1=await handleSignUp({email,password,username,usertype});
        console.log("test1",test1)
        if(test1){
            router.push('/DashBoard')
            console.log("?DashBoard")
        }
    }
    catch(error){
        console.log("auth helper wala nai chala",error)
    }
   

    // Resetting form fields
    setEmail("");
    setPassword("");
    setUsername("");
    setUsertype("creator"); // Reset user type to default
  }

  return (
    <div className={cn("grid gap-6 ", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-6">
          <div className="grid gap-2 ">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/* Additional fields */}
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="username">
              Username
            </Label>
            <Input
              id="username"
              placeholder="Username"
              type="text"
              autoCapitalize="none"
              autoComplete="username"
              autoCorrect="off"
              disabled={isLoading}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="Password"
              type="password"
              autoComplete="current-password"
              disabled={isLoading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {/* Radio group for user type */}
          <RadioGroup
            defaultValue="creator"
            className="flex flex-row gap-4 justify-start items-center"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="creator"
                id="creator"
                checked={usertype === "creator"}
                onClick={() => setUsertype("creator")}
              />
              <Label htmlFor="creator">Creator</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="editor"
                id="editor"
                checked={usertype === "editor"}
                onClick={() => setUsertype("editor")}
              />
              <Label htmlFor="editor">Editor</Label>
            </div>
          </RadioGroup>

          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        GitHub
      </Button>
    </div>
  );
}
