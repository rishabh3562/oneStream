"use client";

import ConnectWithOAuthButton from "@/components/ConnectWithOAuthButton";
import React, { useState } from "react";

const Try = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [privacyStatus, setPrivacyStatus] = useState("public");
  const [accessToken, setAccessToken] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setVideoFile(file);
    console.log("File selected:", file);
  };

  const authenticateWithGoogle = async (token) => {
    setAccessToken(token);
    console.log("Access Token set:", token);
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    if (!accessToken) {
      console.error("Access token is required. Please authenticate first.");
      return;
    }

    console.log("Upload initiated");

    // Create form data for the upload
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tags", tags);
    formData.append("privacyStatus", privacyStatus);
    formData.append("videoFile", videoFile);
    formData.append("accessToken", accessToken);

    // console.log("Form data prepared:", {
    //   title,
    //   description,
    //   tags,
    //   privacyStatus,
    //   videoFile,
    //   accessToken,
    // });

    try {
      const response = await fetch("/api/youtube/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Video uploaded successfully:", result);
      } else {
        console.error("Upload failed:", result);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleAccessTokenRetrieval = () => {
    // After user gets redirected back with access token in URL fragment
    const urlParams = new URLSearchParams(window.location.hash.substring(1));
    const token = urlParams.get("access_token");
    if (token) {
      setAccessToken(token);
      console.log("Access Token:", token);
    }
  };

  React.useEffect(() => {
    console.log("Component mounted");
    handleAccessTokenRetrieval();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Upload Video to YouTube</h1>
      {!accessToken ? (
        <ConnectWithOAuthButton setYoutubeAuth={authenticateWithGoogle} />
      ) : (
        <form onSubmit={handleUpload} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title:{" "}
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                console.log("Title changed:", e.target.value);
              }}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description:{" "}
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                console.log("Description changed:", e.target.value);
              }}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tags (comma-separated):{" "}
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => {
                setTags(e.target.value);
                console.log("Tags changed:", e.target.value);
              }}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Privacy:{" "}
            </label>
            <select
              value={privacyStatus}
              onChange={(e) => {
                setPrivacyStatus(e.target.value);
                console.log("Privacy status changed:", e.target.value);
              }}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="unlisted">Unlisted</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Upload Video:{" "}
            </label>
            <input
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md"
          >
            Upload
          </button>
        </form>
      )}
    </div>
  );
};

export default Try;
