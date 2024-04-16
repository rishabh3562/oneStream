// components/ConnectWithOAuthButton.js
"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {toast} from 'react-hot-toast'
import {
  gapi,
  loadAuth2,
  loadAuth2WithProps,
  loadClientAuth2,
} from "gapi-script";
// if you want to use the gapi client itself

let gapiClient = loadClientAuth2(
  gapi,
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,

  "https://www.googleapis.com/auth/youtube"
);

function ConnectWithOAuthButton() {
console.log("test");
const windowGapiInit= () => {
      
      window.gapi.auth2.init({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        redirect_uri: "http://localhost:3000/api/auth/callback/youtube",
        scope:
          "email profile https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email openid https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.upload", // Add required scopes
      });
    }
  gapiClient.then(() => {
    console.log(gapiClient);
  });
  const router = useRouter();

  useEffect(() => {
    const result=window.gapi.load("auth2",windowGapiInit);
    console.log("window gapi loaded ",result)
  }, []);

  const handleConnect = () => {
    const auth2 = window.gapi.auth2.getAuthInstance();
    console.log("auth2 :",auth2);
    console.log("window.gap.auth2",window.gapi.auth2);
    
    auth2.signIn().then((googleUser) => {
        const { access_token } = googleUser.getAuthResponse();
        console.log("Access Token:", access_token);
        console.log("google.getAuthResponse",googleUser.getAuthResponse());
        console.log("google.getAuthInstance",googleUser.getAuthInstance());

console.log("google user in the auth2 function ",googleUser);
        // Fetch user info
        const profile = googleUser.getBasicProfile();
        console.log("User Info:");
        console.log("ID:", profile.getId());
        console.log("Name:", profile.getName());
        console.log("Email:", profile.getEmail());
console.log("access_token",access_token)
toast.success(`${profile.getEmail() } logged in`);

        // Redirect to OAuth callback URL
        // router.push(`/api/auth/callback/youtube?access_token=${access_token}`);
      })
      .catch((error) => {
        console.error("Error signing in:", error);
        toast.error(error.message);
      });
  };

  return (
    <>
      <button onClick={handleConnect}>Connect with OAuth 2.0</button>
    </>
  );
}

export default ConnectWithOAuthButton;
