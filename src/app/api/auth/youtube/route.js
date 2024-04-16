// pages/api/auth/youtube.js
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

const CLIENT_ID = 'your-client-id';
const CLIENT_SECRET = 'your-client-secret';
const REDIRECT_URI = 'http://localhost:3000/api/auth/callback/youtube'; // Your redirect URI

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

export default async function handler(req, res) {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: [
        
      'https://www.googleapis.com/auth/youtube.upload', // Scope for uploading videos
      'https://www.googleapis.com/auth/youtube.force-ssl', // Scope for managing YouTube account
    ],
  });

  res.redirect(authUrl);
}
