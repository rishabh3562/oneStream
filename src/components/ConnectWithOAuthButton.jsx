// components/ConnectWithOAuthButton.js
"use client";
import React, { useEffect } from "react";
import { gapi } from "gapi-script";

const ConnectWithOAuthButton = ({ setYoutubeAuth }) => {
  useEffect(() => {
    const handleClientLoad = async () => {
      const auth2 = await gapi.load("auth2", initClient);
      // console.log("gapi loaded", auth2);
    };

    const initClient = async () => {
      const res = await gapi.auth2.init({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        scope: process.env.NEXT_PUBLIC_YOUTUBE_SCOPE_CONNECT_BUTTON,
      });
      // console.log("res", res);
    };

    handleClientLoad();
  }, []);

  const handleConnect = async () => {
    const upload = await gapi.auth2
      .getAuthInstance()
      .signIn()
      .then((googleUser) => {
        const { access_token } = googleUser.getAuthResponse();
        // console.log("googleUser", googleUser);
        // console.log(`Bearer ${access_token}`);
        setYoutubeAuth(access_token);
      })
      .catch((error) => {
        console.error("Error signing in:", error);
      });
  };

  return (
    <div>
      <button onClick={handleConnect}>Connect with OAuth 2.0</button>
    </div>
  );
};

export default ConnectWithOAuthButton;
