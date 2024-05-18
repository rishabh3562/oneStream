'use client';
import * as React from "react";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import getAppwrite from "@/helpers/init/getAppwrite";
import { handleSignIn } from "@/helpers/workers/authHelper";
import { useRouter } from "next/navigation";

export function LoginForm({ className, ...props }) {
    const {account} = getAppwrite();
  const [isLoading, setIsLoading] = React.useState(false);
  const [emailOrUsername, setEmailOrUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();

 const getSessionAndRedirect=async ()=>{
    const session= await account.get();
    console.log("session in login form",session)
if(session){
   router.push("/dash");
} 
}
getSessionAndRedirect();
  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const result = await handleSignIn({ emailOrUsername, password });
      console.log("Login result:", result);
      if (result) {
        router.push('/DashBoard');
      }
    } catch (error) {
      alert(`Login unsuccessful: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label className="sr-only" htmlFor="emailOrUsername">
              Email or Username
            </Label>
            <Input
              id="emailOrUsername"
              placeholder="Email or Username"
              type="text"
              autoCapitalize="none"
              autoComplete="username"
              autoCorrect="off"
              disabled={isLoading}
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
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
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In
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
