"use client"
// pages/video-portal.js
// pages/video-portal.js
// pages/video-portal.js
import React, { useState } from 'react';
import ConnectWithOAuthButton from '@/components/ConnectWithOAuthButton';
import axios from 'axios';

const VideoPortal = () => {
  const [file, setFile] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

// pages/video-portal.js
const handleYoutubeUpload = async () => {
  if (!file ||!accessToken) {
    alert('Please upload a video and connect with OAuth first');
    return;
  }

  try {
    const formData = new FormData();
    formData.append('file', file); // Append the file to the form data

    const res = await axios.post('/api/proxy', formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log('Video uploaded to YouTube:', res.data);
    alert('Video uploaded to YouTube successfully');
  } catch (error) {
    console.error('Error uploading to YouTube:', error);
    alert('Error uploading video to YouTube');
  }
};

  

  const setYoutubeAuth = (accessToken) => {
    setAccessToken(accessToken);
  };

  return (
    <div>
      <h1>Video Portal</h1>
      <div>
        <input type="file" accept="video/*" onChange={handleFileChange} />
        <button onClick={handleYoutubeUpload}>Upload to YouTube</button>
        <ConnectWithOAuthButton setYoutubeAuth={setYoutubeAuth} />
      </div>
    </div>
  );
};

export default VideoPortal;


// // pages/video-portal.js
// "use client";

// import React, { useState } from 'react';
// import { uploadFileToAppwrite } from '@/helpers/workers/appwriteHelper';
// import { uploadFileToS3, listFilesFromS3, fetchFileFromS3, deleteFileFromS3 } from '@/helpers/workers/awsHelper';
// import ConnectWithOAuthButton from '@/components/ConnectWithOAuthButton';
// import {google} from 'googleapis'
// const VideoPortal = () => {
//   const [file, setFile] = useState(null);
//   const [youtubeAuth, setYoutubeAuth] = useState(null);

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const handleAppwriteUpload = async () => {
//     if (file) {
//       try {
//         const res = await uploadFileToAppwrite(file);
//         console.log("Appwrite upload response", res);
//         alert('Video uploaded to Appwrite successfully');
//       } catch (error) {
//         console.error(error);
//         alert('Error uploading video to Appwrite');
//       }
//     }
//   };

//   const handleS3Upload = async () => {
//     if (file) {
//       try {
//         const res = await uploadFileToS3(file);
//         console.log("S3 upload response", res);
//         alert('Video uploaded to S3 successfully');
//       } catch (error) {
//         console.error(error);
//         alert('Error uploading video to S3');
//       }
//     }
//   };

//   const handleYoutubeUpload = async () => {
//     if (!file) {
//       alert('Please upload a video first');
//       return;
//     }

//     try {
//       const auth = youtubeAuth;
//       const youtube = google.youtube({ version: 'v3', auth });
//       const res = await youtube.videos.insert({
//         part: 'snippet,status',
//         requestBody: {
//           snippet: {
//             title: 'Test Video',
//             description: 'This is a test video',
//           },
//           status: {
//             privacyStatus: 'public',
//           },
//         },
//         media: {
//           body: file,
//         },
//       });
//       console.log('Video uploaded to YouTube:', res.data);
//     } catch (error) {
//       console.error('Error uploading to YouTube:', error);
//     }
//   };

//   const authenticateWithYouTube = async () => {
//     const OAuth2 = google.auth.OAuth2;
//     const oauth2Client = new OAuth2(
//       process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID, // Replace with your client ID
//       process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET, // Replace with your client secret
//      process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URL // Replace with your redirect URI
//     );

//     const authUrl = oauth2Client.generateAuthUrl({
//       access_type: 'offline',
//       scope: 'https://www.googleapis.com/auth/youtube.upload',
//     });

//     // Redirect the user to the authorization URL
//     window.location.href = authUrl;
//   };

//   return (
//     <div>
//       <h1>Video Portal</h1>
//       <div>
//         <h2>1. Upload Video to Appwrite</h2>
//         <input type="file" accept="video/*" onChange={handleFileChange} />
//         <button onClick={handleAppwriteUpload}>Upload to Appwrite</button>
//       </div>
//       <div>
//         <h2>1. Upload Video to S3</h2>
//         <input type="file" accept="video/*" onChange={handleFileChange} />
//         <button onClick={handleS3Upload}>Upload to S3</button>
//       </div>
//       <div>
//         <h2>3. Upload to YouTube</h2>
//         <button onClick={authenticateWithYouTube}>Authenticate with YouTube</button>
//         <button onClick={handleYoutubeUpload}>Upload to YouTube</button>
//         <ConnectWithOAuthButton setYoutubeAuth={setYoutubeAuth} />
//       </div>
//     </div>
//   );
// };

// export default VideoPortal;
